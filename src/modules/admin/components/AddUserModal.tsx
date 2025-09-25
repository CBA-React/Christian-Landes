'use client';

import { JSX, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { UsersApi } from '@/modules/admin/services/UsersApi';
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
}: {
	open: boolean;
	onClose: () => void;
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
			await UsersApi.addUser({ ...data, role });
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

					<div className="mt-2 flex flex-row gap-3 sm:flex-col">
						<button
							type="button"
							className="inline-flex h-10 w-full items-center justify-center rounded-full border border-[#242424] px-4 text-sm"
							title="Connect with Google"
							onClick={() =>
								setValue('google_id', 'stub-google-id', {
									shouldDirty: true,
								})
							}
						>
							Connect{' '}
							<span className="ml-1 hidden sm:block">
								with Google
							</span>
							<div className="ml-2">
								<svg
									width="21"
									height="20"
									viewBox="0 0 21 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clip-path="url(#clip0_0_8210)">
										<path
											d="M7.46721 0.658267C5.4689 1.3515 3.74556 2.66728 2.55032 4.41233C1.35508 6.15739 0.750946 8.23974 0.826651 10.3535C0.902355 12.4673 1.65391 14.5011 2.97092 16.1562C4.28794 17.8113 6.10099 19.0004 8.14377 19.5489C9.7999 19.9762 11.535 19.995 13.2 19.6036C14.7083 19.2648 16.1028 18.5401 17.2469 17.5005C18.4376 16.3854 19.302 14.9668 19.7469 13.3973C20.2305 11.6906 20.3166 9.89566 19.9985 8.15045H10.6985V12.0083H16.0844C15.9768 12.6236 15.7461 13.2108 15.4062 13.7349C15.0663 14.2589 14.6242 14.7091 14.1063 15.0583C13.4486 15.4933 12.7072 15.786 11.9297 15.9176C11.1499 16.0626 10.3501 16.0626 9.57033 15.9176C8.78 15.7542 8.03236 15.428 7.37502 14.9598C6.319 14.2123 5.52608 13.1503 5.1094 11.9255C4.68567 10.6776 4.68567 9.32484 5.1094 8.07702C5.406 7.20235 5.89632 6.40598 6.54377 5.74733C7.2847 4.97975 8.22273 4.43108 9.25495 4.16151C10.2872 3.89195 11.3737 3.91191 12.3953 4.2192C13.1934 4.46419 13.9232 4.89223 14.5266 5.4692C15.1339 4.86504 15.7401 4.25931 16.3453 3.65202C16.6578 3.32545 16.9985 3.01452 17.3063 2.68014C16.3853 1.82307 15.3042 1.15617 14.125 0.717642C11.9777 -0.0620611 9.62811 -0.0830148 7.46721 0.658267Z"
											fill="#242424"
										/>
										<path
											d="M7.46563 0.659027C9.62635 -0.0827593 11.9759 -0.0623571 14.1234 0.716839C15.3028 1.15834 16.3834 1.82846 17.3031 2.68871C16.9906 3.02309 16.6609 3.33559 16.3422 3.66059C15.7359 4.2658 15.1302 4.86892 14.525 5.46996C13.9216 4.89299 13.1918 4.46495 12.3937 4.21996C11.3725 3.91159 10.286 3.89048 9.25347 4.15894C8.22097 4.4274 7.28236 4.97506 6.54062 5.74184C5.89318 6.40049 5.40285 7.19686 5.10625 8.07153L1.86719 5.56371C3.02658 3.26459 5.03398 1.50594 7.46563 0.659027Z"
											fill="#242424"
										/>
										<path
											d="M1.01015 8.04688C1.18425 7.18405 1.47328 6.34848 1.86953 5.5625L5.10859 8.07656C4.68486 9.32438 4.68486 10.6772 5.10859 11.925C4.02942 12.7583 2.94974 13.5958 1.86953 14.4375C0.877575 12.463 0.575047 10.2133 1.01015 8.04688Z"
											fill="#242424"
										/>
										<path
											d="M10.6999 8.14844H19.9999C20.318 9.89365 20.232 11.6885 19.7484 13.3953C19.3034 14.9648 18.4391 16.3834 17.2484 17.4984C16.203 16.6828 15.153 15.8734 14.1077 15.0578C14.626 14.7082 15.0683 14.2576 15.4082 13.733C15.7481 13.2084 15.9786 12.6205 16.0859 12.0047H10.6999C10.6984 10.7203 10.6999 9.43437 10.6999 8.14844Z"
											fill="#242424"
										/>
										<path
											d="M1.86719 14.4383C2.9474 13.6049 4.02708 12.7674 5.10625 11.9258C5.52376 13.1511 6.31782 14.2131 7.375 14.9602C8.03439 15.4262 8.78364 15.7497 9.575 15.9102C10.3548 16.0551 11.1546 16.0551 11.9344 15.9102C12.7119 15.7785 13.4533 15.4858 14.1109 15.0508C15.1562 15.8664 16.2063 16.6758 17.2516 17.4914C16.1076 18.5316 14.7132 19.2568 13.2047 19.5961C11.5397 19.9875 9.80457 19.9687 8.14844 19.5414C6.8386 19.1917 5.61512 18.5751 4.55469 17.7305C3.43228 16.8394 2.51556 15.7164 1.86719 14.4383Z"
											fill="#242424"
										/>
									</g>
									<defs>
										<clipPath id="clip0_0_8210">
											<rect
												width="20"
												height="20"
												fill="white"
												transform="translate(0.5)"
											/>
										</clipPath>
									</defs>
								</svg>
							</div>
						</button>
						<button
							type="button"
							className="inline-flex h-10 w-full items-center justify-center rounded-full border border-[#242424] px-4 text-sm"
							title="Connect with Facebook"
							onClick={() =>
								setValue('facebook_id', 'stub-facebook-id', {
									shouldDirty: true,
								})
							}
						>
							Connect
							<span className="ml-1 hidden sm:block">
								with Facebook
							</span>
							<div className="ml-2">
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clip-path="url(#clip0_0_8219)">
										<path
											d="M10 0C15.5228 0 20 4.47719 20 10C20 14.9913 16.3431 19.1287 11.5625 19.8789V12.8906H13.8926L14.3359 10H11.5625V8.12402C11.5626 7.38276 11.903 6.65902 12.9688 6.57129C13.04 6.56543 13.1146 6.5625 13.1924 6.5625H14.4531V4.10156C14.4531 4.10156 14.0059 4.025 13.4033 3.96777C13.042 3.93346 12.6249 3.90626 12.2148 3.90625C10.0019 3.90625 8.53105 5.20552 8.44141 7.56543C8.43852 7.64147 8.4375 7.71864 8.4375 7.79688V10H5.89844V12.8906H8.4375V19.8789C3.65688 19.1287 4.65813e-07 14.9912 0 10C0 4.47719 4.47719 0 10 0Z"
											fill="#242424"
										/>
									</g>
									<defs>
										<clipPath id="clip0_0_8219">
											<rect
												width="20"
												height="20"
												fill="white"
											/>
										</clipPath>
									</defs>
								</svg>
							</div>
						</button>
					</div>

					{error && (
						<div className="mt-3 rounded-md bg-rose-50 p-2 text-sm text-rose-700">
							{error}
						</div>
					)}

					<div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
						<button
							type="button"
							onClick={onClose}
							className="h-10 rounded-full bg-[#F1F3F6] px-6 text-sm"
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
