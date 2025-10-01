'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SubmitErrorHandler, useForm } from 'react-hook-form';

import { Input } from '@/shared/components/Input/Input';
import { useFileUpload } from '@/shared/hooks/useFileUpload';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import type { UploadedFile } from '@/shared/types/upload';

type ApiProfile = {
	id: number;
	full_name: string | null;
	email: string;
	phone: string | null;
	location: string | null;
	about?: string | null;
	logo: { id?: number; url?: string } | null;
};

type ProfileForm = {
	full_name: string;
	email: string;
	phone: string;
	location: string;
};

type PasswordForm = {
	current_password: string;
	new_password: string;
	confirm_password: string;
};

export default function Settings(): JSX.Element {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const {
		data: profile,
		isLoading: loadingProfile,
		refetch,
	} = useQuery({
		queryKey: ['admin-profile'],
		queryFn: async (): Promise<ApiProfile> => {
			const { data } =
				await axiosInstance.get<ApiProfile>('admin/profile');
			return data;
		},
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: {
			errors,
			isDirty: profileDirty,
			isSubmitting: savingProfile,
		},
	} = useForm<ProfileForm>({
		mode: 'onChange',
		defaultValues: { full_name: '', email: '', phone: '', location: '' },
	});

	useEffect(() => {
		if (!profile) return;
		reset({
			full_name: profile.full_name ?? '',
			email: profile.email ?? '',
			phone: profile.phone ?? '',
			location: profile.location ?? '',
		});
	}, [profile, reset]);

	useEffect(() => {
		if (profileDirty) setErrorMsg(null);
	}, [profileDirty, setErrorMsg]);

	const [avatar, setAvatar] = useState<UploadedFile | null>(null);
	const previewOrCurrent = useMemo(() => {
		if (avatar?.url) return avatar.url;
		if (profile?.logo?.url) return profile.logo.url;
		return '/images/Profile/mock-avatar.jpg';
	}, [avatar, profile]);

	const {
		uploadFile,
		previewUrl,
		isUploading,
		uploadedFile,
		reset: resetUpload,
	} = useFileUpload({
		onSuccess: (file) => setAvatar(file),
		validateFile: true,
	});

	const updateProfileMutation = useMutation({
		mutationFn: async (payload: Partial<ApiProfile>) => {
			await axiosInstance.post('admin/profile/update', payload);
		},
		onSuccess: () => {
			resetUpload();
			setAvatar(null);
			refetch();
		},
		onError: (err) => {
			setErrorMsg(getErrorMessage(err, 'Failed to save profile'));
		},
	});

	const onInvalidProfile: SubmitErrorHandler<ProfileForm> = (errs) => {
		const firstErr = Object.values(errs)[0];
		setErrorMsg(
			firstErr?.message ?? 'Please correct the highlighted fields',
		);
	};

	const onSubmitProfile = async (values: ProfileForm): Promise<void> => {
		if (!profile) return;
		const body: Partial<ApiProfile> = {
			id: profile.id,
			full_name: values.full_name.trim(),
			email: values.email.trim(),
			phone: values.phone.trim(),
			location: values.location.trim(),
			...(uploadedFile ? { logo: uploadedFile } : {}),
		};
		await updateProfileMutation.mutateAsync(body);
	};

	const {
		register: regPwd,
		handleSubmit: handlePwd,
		reset: resetPwd,
		watch: watchPwd,
		formState: { isSubmitting: savingPwd },
	} = useForm<PasswordForm>({ mode: 'onChange' });

	const [showCur, setShowCur] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConf, setShowConf] = useState(false);
	const newPwd = watchPwd('new_password');
	const confPwd = watchPwd('confirm_password');

	const changePasswordMutation = useMutation({
		mutationFn: async (payload: PasswordForm) => {
			await axiosInstance.post('auth/recoveryPasswordChangePassword', {
				email: profile?.email,
				new_password: payload.new_password,
				confirm_password: payload.confirm_password,
			});
		},
		onSuccess: () => resetPwd(),
		onError: (err) => {
			setErrorMsg(getErrorMessage(err, 'Failed to change password'));
		},
	});

	const onInvalidPassword: SubmitErrorHandler<PasswordForm> = (errs) => {
		const firstErr = Object.values(errs)[0];
		setErrorMsg(firstErr?.message ?? 'Please fix password fields');
	};

	const onSubmitPassword = async (values: PasswordForm): Promise<void> => {
		await changePasswordMutation.mutateAsync(values);
	};

	return (
		<div className="space-y-5">
			<section className="rounded-[16px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
				<h2 className="font-chalet-1960 mb-4 text-[18px] font-medium tracking-wide sm:text-[20px]">
					PROFILE MANAGEMENT
				</h2>

				<form
					onSubmit={handleSubmit(onSubmitProfile, onInvalidProfile)}
					className="grid gap-5"
				>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-[auto,1fr]">
						{/* Avatar */}
						<div className="flex items-center gap-4 sm:gap-6">
							<img
								src={previewUrl ?? previewOrCurrent}
								alt="Avatar"
								className="h-[80px] w-[80px] rounded-lg object-cover ring-1 ring-black/10 sm:h-[100px] sm:w-[100px]"
							/>
							<div className="flex flex-col gap-2">
								<label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50">
									<input
										type="file"
										accept="image/*"
										className="hidden"
										onChange={(e) => {
											const f = e.target.files?.[0];
											if (f) uploadFile(f, 'logo');
										}}
									/>
									<span className="select-none">
										Upload new photo
									</span>
								</label>
								{(isUploading || uploadedFile) && (
									<span className="text-xs text-neutral-500">
										{isUploading
											? 'Uploading…'
											: 'Image ready to save'}
									</span>
								)}
							</div>
						</div>

						{/* Inputs grid */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<Input
								label="Name"
								placeholder="Mark Stevens"
								register={register('full_name', {
									required: 'Required',
									minLength: {
										value: 2,
										message: 'Too short',
									},
									maxLength: { value: 60, message: 'Max 60' },
								})}
								error={errors.full_name}
							/>
							<Input
								label="Phone"
								placeholder="(555) 123–4567"
								register={register('phone', {
									pattern: {
										value: /^[+()0-9-\s]*$/,
										message: 'Invalid phone number',
									},
									maxLength: {
										value: 20,
										message: 'Max 20 characters',
									},
								})}
								error={errors.phone}
							/>
							<Input
								label="Email"
								type="email"
								placeholder="contractor@example.com"
								register={register('email', {
									required: 'Required',
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: 'Invalid email',
									},
									maxLength: {
										value: 254,
										message: 'Max 254',
									},
								})}
								error={errors.email}
							/>
							<Input
								label="Location"
								placeholder="San Francisco Bay Area"
								register={register('location', {
									maxLength: {
										value: 100,
										message: 'Max 100',
									},
								})}
								error={errors.location as any}
							/>
						</div>
					</div>

					{errorMsg && (
						<div className="rounded-md bg-rose-50 p-2 text-sm text-rose-700">
							{errorMsg}
						</div>
					)}

					<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
						<button
							type="button"
							onClick={() => {
								reset();
								setAvatar(null);
								resetUpload();
							}}
							className="h-10 rounded-full border border-neutral-300 px-6 text-sm"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={
								savingProfile ||
								(!profileDirty && !uploadedFile)
							}
							className="h-10 rounded-full bg-[#003BFF] px-6 text-sm font-medium text-white disabled:opacity-50"
						>
							{savingProfile ? 'Saving…' : 'Save'}
						</button>
					</div>
				</form>
			</section>
			<section className="rounded-[16px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
				<h2 className="font-chalet-1960 mb-4 text-[18px] font-medium tracking-wide sm:text-[20px]">
					ACCOUNT SECURITY
				</h2>

				<form
					className="grid gap-4"
					onSubmit={handlePwd(onSubmitPassword, onInvalidPassword)}
				>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{/* Current password */}
						<div className="col-span-2">
							<label className="mb-[6px] block">
								Current Password
							</label>
							<div className="relative">
								<input
									type={showCur ? 'text' : 'password'}
									placeholder="••••••••"
									className="w-full rounded border border-[#24242480] px-4 py-2.5 placeholder:text-[#24242480] focus:outline-none"
									{...regPwd('current_password', {
										required: true,
									})}
								/>
								<button
									type="button"
									onClick={() => setShowCur((v) => !v)}
									className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500"
									title="Show password"
								>
									👁
								</button>
							</div>
						</div>
						<div>
							<label className="mb-[6px] block">
								New Password
							</label>
							<div className="relative">
								<input
									type={showNew ? 'text' : 'password'}
									placeholder="Create a strong password (min. 8 characters)"
									className="w-full rounded border border-[#24242480] px-4 py-2.5 placeholder:text-[#24242480] focus:outline-none"
									{...regPwd('new_password', {
										minLength: 8,
										required: true,
									})}
								/>
								<button
									type="button"
									onClick={() => setShowNew((v) => !v)}
									className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500"
								>
									👁
								</button>
							</div>
						</div>

						<div>
							<label className="mb-[6px] block">
								Confirm Password
							</label>
							<div className="relative">
								<input
									type={showConf ? 'text' : 'password'}
									placeholder="Confirm Password"
									className="w-full rounded border border-[#24242480] px-4 py-2.5 placeholder:text-[#24242480] focus:outline-none"
									{...regPwd('confirm_password', {
										validate: (v) =>
											v === newPwd ||
											'Passwords do not match',
										required: true,
									})}
								/>
								<button
									type="button"
									onClick={() => setShowConf((v) => !v)}
									className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500"
								>
									👁
								</button>
							</div>
						</div>
					</div>
					<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
						<button
							type="button"
							onClick={() => resetPwd()}
							className="h-10 rounded-full border border-neutral-300 px-6 text-sm"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={
								savingPwd ||
								!newPwd ||
								!confPwd ||
								newPwd.length < 8 ||
								newPwd !== confPwd
							}
							className="h-10 rounded-full bg-[#003BFF] px-6 text-sm font-medium text-white disabled:opacity-50"
						>
							{savingPwd ? 'Saving…' : 'Save'}
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}
