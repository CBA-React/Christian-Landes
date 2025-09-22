'use client';

import { JSX, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ApiUser, UsersApi } from '@/modules/admin/services/UsersApi';
import { Input } from '@/shared/components/Input/Input';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

const MAX = {
	full_name: 60,
	email: 254,
	location: 100,
	phone: 20,
	password: 72,
};

type RoleNum = 1 | 2 | 3;
const ROLES = { HOMEOWNER: 1, CONTRACTOR: 2, ADMIN: 3 } as const;

type FormValues = {
	full_name: string;
	email: string;
	phone?: string;
	location?: string;
	password: string;
	google_id?: string;
	facebook_id?: string;
	apple_id?: string;
	windows_id?: string;
};

export function AddUserModal({
	open,
	onClose,
	onCreated,
}: {
	open: boolean;
	onClose: () => void;
	onCreated: (u: ApiUser) => void;
}): JSX.Element | null {
	const [role, setRole] = useState<RoleNum | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
		setValue,
	} = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: {
			full_name: '',
			email: '',
			phone: '',
			location: '',
			password: '',
			google_id: '',
			facebook_id: '',
			apple_id: '',
			windows_id: '',
		},
	});

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return (): void => {
			document.body.style.overflow = prev;
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		return (): void => window.removeEventListener('keydown', onKey);
	}, [open, onClose]);

	const onSubmit = async (data: FormValues): Promise<void> => {
		if (!role) return;
		setSubmitting(true);
		setError(null);
		try {
			const created = await UsersApi.addUser({ ...data, role });
			onCreated(created);
			onClose();
			reset();
			setRole(null);
		} catch (err: unknown) {
			const msg = getErrorMessage(err, 'Invalid email or password');
			setError(msg);
		} finally {
			setSubmitting(false);
		}
	};

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center"
			aria-modal="true"
			role="dialog"
		>
			<div
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
				aria-hidden="true"
			/>
			<div className="relative w-full max-w-[600px] rounded-[20px] bg-white p-5 shadow-xl ring-1 ring-black/10 sm:p-10">
				<div className="mb-[2px] flex items-start justify-between sm:mb-[6px]">
					<h3 className="font-chalet-1960 text-[28px] leading-[48px] font-medium sm:text-[40px]">
						Add new user
					</h3>
					<button
						onClick={onClose}
						className="absolute top-[32px] right-[32px] cursor-pointer rounded-full p-1 px-2.5 text-[#242424] hover:bg-neutral-100"
						aria-label="Close"
					>
						✕
					</button>
				</div>

				<p className="mb-5 text-base text-[#24242480] sm:mb-6">
					Fill in the details below to create a new user account.
				</p>

				<fieldset className="mb-4">
					<legend className="mb-2.5 block text-base font-normal">
						Role
					</legend>
					<div className="flex flex-wrap gap-4">
						{(
							[
								{ label: 'Client', value: ROLES.HOMEOWNER },
								{
									label: 'Contractor',
									value: ROLES.CONTRACTOR,
								},
								{ label: 'Admin', value: ROLES.ADMIN },
							] as { label: string; value: RoleNum }[]
						).map((r) => (
							<label
								key={r.value}
								className="flex cursor-pointer items-center gap-2"
							>
								<input
									type="checkbox"
									className="h-4 w-4 rounded-[20px] border-neutral-300"
									checked={role === r.value}
									onChange={() =>
										setRole(
											role === r.value ? null : r.value,
										)
									}
								/>
								<span className="text-base text-[#25252599]">
									{r.label}
								</span>
							</label>
						))}
					</div>
				</fieldset>

				<form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
					<Input
						label="Name"
						placeholder="Write full name"
						register={register('full_name', {
							required: 'Name is required',
							minLength: { value: 2, message: 'Too short' },
							maxLength: {
								value: MAX.full_name,
								message: `Max ${MAX.full_name} characters`,
							},
							validate: (v) =>
								v.trim().length > 0 ? true : 'Name is required',
						})}
						error={errors.full_name}
					/>

					<Input
						label="Email"
						type="email"
						placeholder="Write email"
						register={register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Invalid email',
							},
							maxLength: {
								value: MAX.email,
								message: `Max ${MAX.email} characters`,
							},
						})}
						error={errors.email}
					/>

					<Input
						label="Location"
						placeholder="City, State or ZIP code"
						register={register('location', {
							maxLength: {
								value: MAX.location,
								message: `Max ${MAX.location} characters`,
							},
						})}
						error={errors.location}
					/>

					<Input
						label="Phone"
						placeholder="Write phone number"
						register={register('phone', {
							pattern: {
								value: /^[+()0-9-\s]*$/,
								message: 'Invalid phone',
							},
							maxLength: {
								value: MAX.phone,
								message: `Max ${MAX.phone} characters`,
							},
						})}
						error={errors.phone}
					/>

					<Input
						label="Password"
						type="password"
						placeholder="Enter password"
						register={register('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Min 6 characters',
							},
							maxLength: {
								value: MAX.password,
								message: `Max ${MAX.password} characters`,
							},
						})}
						error={errors.password}
					/>

					<div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
						<button
							type="button"
							className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 px-4 text-sm"
							title="Connect with Google"
							onClick={() =>
								setValue('google_id', 'stub-google-id', {
									shouldDirty: true,
								})
							}
						>
							Connect <span className="ml-2">G</span>
						</button>
						<button
							type="button"
							className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 px-4 text-sm"
							title="Connect with Facebook"
							onClick={() =>
								setValue('facebook_id', 'stub-facebook-id', {
									shouldDirty: true,
								})
							}
						>
							Connect <span className="ml-2">f</span>
						</button>
					</div>

					{error && (
						<div className="mt-3 rounded-md bg-rose-50 p-2 text-sm text-rose-700">
							{error}
						</div>
					)}

					<div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
						<button
							type="button"
							onClick={onClose}
							className="h-10 rounded-full border border-neutral-300 px-6 text-sm"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={!isValid || !role || submitting}
							className="h-10 rounded-full bg-[#003BFF] px-6 text-sm font-medium text-white disabled:opacity-50"
						>
							{submitting ? 'Adding…' : 'Add User'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
