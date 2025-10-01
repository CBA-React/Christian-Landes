'use client';

import { JSX, useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { UsersApi } from '@/modules/admin/services/UsersApi';
import { EyeClose } from '@/modules/auth/components/ForgotPassword/EyeClose';
import { EyeOpen } from '@/modules/auth/components/ForgotPassword/EyeOpen';
import { Input } from '@/shared/components/Input/Input';
import { addUserSchema } from '@/shared/constants/authSchema';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

type RoleNum = 1 | 2 | 3;
const ROLES = { HOMEOWNER: 1, CONTRACTOR: 2, ADMIN: 3 } as const;

type AddUserFormValues = z.infer<typeof addUserSchema>;

export function AddUserModal({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}): JSX.Element | null {
	const [role, setRole] = useState<RoleNum | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const roleRef = useRef<RoleNum | null>(null);

	useEffect(() => {
		roleRef.current = role;
	}, [role]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
		getValues,
	} = useForm<AddUserFormValues>({
		mode: 'onChange',
		resolver: zodResolver(addUserSchema),
		defaultValues: {
			full_name: '',
			email: '',
			phone: '',
			location: '',
			password: '',
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
	const onSubmit = async (data: AddUserFormValues): Promise<void> => {
		if (!role) {
			toast.error('Select a role first');
			return;
		}
		setSubmitting(true);
		setError(null);
		try {
			await UsersApi.addUser({ ...data, role });
			toast.success('User added');
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
	const gCreateBtnRef = useRef<HTMLDivElement>(null);
	const gsiInitDoneRef = useRef(false);
	const gsiButtonRenderedRef = useRef(false);

	useEffect(() => {
		if (!open) {
			gsiButtonRenderedRef.current = false;
			return;
		}
		const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
		if (!clientId) {
			console.error('Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID');
			return;
		}

		const isFirefox =
			typeof navigator !== 'undefined' &&
			/firefox/i.test(navigator.userAgent);

		const tryInitAndRender = (): boolean => {
			if (!window.google?.accounts?.id) return false;

			if (!gsiInitDoneRef.current) {
				window.google.accounts.id.initialize({
					client_id: clientId,
					ux_mode: 'popup',
					auto_select: false,
					cancel_on_tap_outside: true,
					use_fedcm_for_prompt: !isFirefox,
					callback: async ({
						credential,
					}: {
						credential?: string;
					}) => {
						if (!credential) {
							toast.error('No Google credential');
							return;
						}
						const roleCurrent = roleRef.current;
						if (!roleCurrent) {
							toast.error('Select a role first');
							return;
						}
						setSubmitting(true);
						setError(null);
						try {
							const { sub } = jwtDecode<{ sub: string }>(
								credential,
							);
							await UsersApi.addUserViaGoogle({
								google_id: sub,
								role: roleCurrent,
							});
							toast.success('User created via Google');
							onClose();
							reset();
							setRole(null);
						} catch (e) {
							setError(
								getErrorMessage(
									e,
									'Failed to create user via Google',
								),
							);
						} finally {
							setSubmitting(false);
						}
					},
				});
				window.google.accounts.id.disableAutoSelect?.();
				gsiInitDoneRef.current = true;
			}

			if (
				gCreateBtnRef.current &&
				window.google.accounts.id.renderButton &&
				!gsiButtonRenderedRef.current
			) {
				window.google.accounts.id.renderButton(gCreateBtnRef.current, {
					theme: 'filled_blue',
					size: 'large',
					text: 'continue_with',
					shape: 'pill',
					width: 260,
				});
				gsiButtonRenderedRef.current = true;
			}

			return true;
		};

		if (!tryInitAndRender()) {
			const t = setInterval(() => {
				if (tryInitAndRender()) clearInterval(t);
			}, 50);
			return () => clearInterval(t);
		}
	}, [open, reset, onClose]);

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex w-full items-start justify-center overflow-y-auto max-[640px]:top-[84px] sm:p-6"
			aria-modal="true"
			role="dialog"
		>
			<div
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
				aria-hidden="true"
			/>
			<div className="relative max-h-[calc(100svh-2rem)] w-full overflow-y-auto bg-[#F3F4F8] p-5 shadow-xl ring-1 ring-black/10 max-[640px]:pb-8 sm:max-h-[calc(100svh-3rem)] sm:max-w-[600px] sm:rounded-[20px] sm:bg-white sm:p-10">
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
						register={register('full_name')}
						error={errors.full_name}
					/>
					<Input
						label="Email"
						type="email"
						placeholder="Write email"
						register={register('email')}
						error={errors.email}
					/>
					<Input
						label="Location"
						placeholder="City, State or ZIP code"
						register={register('location')}
						error={errors.location}
					/>
					<Input
						label="Phone"
						placeholder="Write phone number"
						register={register('phone')}
						error={errors.phone}
					/>
					<div className="flex flex-col gap-[10px]">
						<label htmlFor="password">Password</label>
						<div className="relative">
							<input
								{...register('password')}
								type={showPassword ? 'text' : 'password'}
								className="w-full border border-[#24242480] p-2 placeholder:text-[#24242480] focus:outline-none sm:block"
								placeholder="Create a strong password"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute top-[50%] right-[18px] -translate-y-1/2"
							>
								{showPassword ? <EyeOpen /> : <EyeClose />}
							</button>
						</div>
						{errors.password && (
							<p className="mt-1 text-sm text-red-600">
								{errors.password.message}
							</p>
						)}
					</div>
					{error && (
						<div className="mt-3 rounded-md bg-rose-50 p-2 text-sm text-rose-700">
							{error}
						</div>
					)}

					<div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
						<button
							type="button"
							onClick={onClose}
							className="h-10 rounded-full bg-[#F1F3F6] px-6 text-sm"
						>
							Cancel
						</button>

						<div className="flex flex-col gap-2 sm:flex-row">
							<button
								type="submit"
								disabled={!isValid || !role || submitting}
								className="h-10 rounded-full bg-[#003BFF] px-6 text-sm font-medium text-white disabled:opacity-50"
							>
								{submitting ? 'Adding…' : 'Add User'}
							</button>

							<div className="relative flex flex-col items-center">
								<div ref={gCreateBtnRef} />
								{!role && (
									<div
										className="pointer-events-auto absolute inset-0 cursor-not-allowed rounded-lg bg-transparent"
										title="Select a role first"
										onMouseDown={(e) => e.preventDefault()}
										onClick={(e) => e.preventDefault()}
									/>
								)}
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
