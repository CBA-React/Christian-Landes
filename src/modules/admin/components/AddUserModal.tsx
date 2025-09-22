'use client';

import { JSX, useEffect, useState } from 'react';

import { ApiUser, UsersApi } from '@/modules/admin/services/UsersApi';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

type RoleNum = 1 | 2 | 3;
const ROLES = { HOMEOWNER: 1, CONTRACTOR: 2, ADMIN: 3 } as const;

type AddUserPayload = {
	full_name: string;
	email: string;
	phone?: string;
	location?: string;
	password: string;
	google_id?: string;
	facebook_id?: string;
	apple_id?: string;
	windows_id?: string;
	role: RoleNum | null;
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
	const [form, setForm] = useState<AddUserPayload>({
		full_name: '',
		email: '',
		phone: '',
		location: '',
		password: '',
		google_id: '',
		facebook_id: '',
		apple_id: '',
		windows_id: '',
		role: null,
	});
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

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

	const update = <K extends keyof AddUserPayload>(
		k: K,
		v: AddUserPayload[K],
	): void => setForm((s) => ({ ...s, [k]: v }));

	const canSubmit =
		!!form.full_name &&
		!!form.email &&
		!!form.password &&
		form.role !== null &&
		!submitting;

	const submit = async (): Promise<void> => {
		if (!canSubmit) return;
		setSubmitting(true);
		setError(null);
		try {
			const created = await UsersApi.addUser({
				...form,
				role: form.role!,
			});
			onCreated(created);
			onClose();
			setForm({
				full_name: '',
				email: '',
				phone: '',
				location: '',
				password: '',
				google_id: '',
				facebook_id: '',
				apple_id: '',
				windows_id: '',
				role: null,
			});
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
			{/* backdrop */}
			<div
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
				aria-hidden="true"
			/>
			{/* modal */}
			<div className="relative m-4 w-full max-w-[560px] rounded-[20px] bg-white p-5 shadow-xl ring-1 ring-black/10 sm:p-6">
				<div className="mb-4 flex items-start justify-between">
					<h3 className="font-chalet-1960 text-[22px] font-medium sm:text-[24px]">
						Add new user
					</h3>
					<button
						onClick={onClose}
						className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
						aria-label="Close"
					>
						✕
					</button>
				</div>

				<p className="mb-4 text-sm text-neutral-600">
					Fill in the details below to create a new user account.
				</p>

				{/* Role */}
				<fieldset className="mb-4">
					<legend className="mb-2 block text-sm font-medium">
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
									className="h-4 w-4 rounded border-neutral-300"
									checked={form.role === r.value}
									onChange={() =>
										update(
											'role',
											form.role === r.value
												? null
												: r.value,
										)
									}
								/>
								<span className="text-sm">{r.label}</span>
							</label>
						))}
					</div>
				</fieldset>

				{/* Inputs */}
				<div className="grid gap-3">
					<label className="grid gap-1">
						<span className="text-sm">Name</span>
						<input
							className="h-10 rounded-md border border-neutral-300 px-3 text-sm"
							placeholder="Write full name"
							value={form.full_name}
							onChange={(e) =>
								update('full_name', e.target.value)
							}
						/>
					</label>

					<label className="grid gap-1">
						<span className="text-sm">Email</span>
						<input
							type="email"
							className="h-10 rounded-md border border-neutral-300 px-3 text-sm"
							placeholder="Write email"
							value={form.email}
							onChange={(e) => update('email', e.target.value)}
						/>
					</label>

					<label className="grid gap-1">
						<span className="text-sm">Location</span>
						<input
							className="h-10 rounded-md border border-neutral-300 px-3 text-sm"
							placeholder="City, State or ZIP code"
							value={form.location}
							onChange={(e) => update('location', e.target.value)}
						/>
					</label>

					<label className="grid gap-1">
						<span className="text-sm">Phone</span>
						<input
							className="h-10 rounded-md border border-neutral-300 px-3 text-sm"
							placeholder="Write phone number"
							value={form.phone}
							onChange={(e) => update('phone', e.target.value)}
						/>
					</label>

					<label className="grid gap-1">
						<span className="text-sm">Password</span>
						<input
							type="password"
							className="h-10 rounded-md border border-neutral-300 px-3 text-sm"
							placeholder="Enter password"
							value={form.password}
							onChange={(e) => update('password', e.target.value)}
						/>
					</label>
				</div>

				<div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
					<button
						type="button"
						className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 px-4 text-sm"
						title="Connect with Google"
						onClick={() => update('google_id', 'stub-google-id')}
					>
						Connect <span className="ml-2">G</span>
					</button>
					<button
						type="button"
						className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 px-4 text-sm"
						title="Connect with Facebook"
						onClick={() =>
							update('facebook_id', 'stub-facebook-id')
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

				{/* Actions */}
				<div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
					<button
						type="button"
						onClick={onClose}
						className="h-10 rounded-full border border-neutral-300 px-6 text-sm"
					>
						Cancel
					</button>
					<button
						type="button"
						disabled={!canSubmit}
						onClick={submit}
						className="h-10 rounded-full bg-[#003BFF] px-6 text-sm font-medium text-white disabled:opacity-50"
					>
						{submitting ? 'Adding…' : 'Add User'}
					</button>
				</div>
			</div>
		</div>
	);
}
