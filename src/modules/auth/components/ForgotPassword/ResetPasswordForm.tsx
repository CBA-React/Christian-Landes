'use client';

import { JSX, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { EyeClose } from '@/modules/auth/components/ForgotPassword/EyeClose';
import { EyeOpen } from '@/modules/auth/components/ForgotPassword/EyeOpen';
import { AuthApi } from '@/modules/auth/services/AuthApi';
import { Button } from '@/shared/components/Button/Button';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

const resetPasswordSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string().min(8, 'Confirm password is required'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
	onSuccess: () => void;
	email: string;
	serverError: string | null;
	setServerError: (val: string | null) => void;
}

export const ResetPasswordForm = ({
	onSuccess,
	email,
	serverError,
	setServerError,
}: ResetPasswordFormProps): JSX.Element => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
	});

	async function onSubmit(data: ResetPasswordFormValues): Promise<void> {
		setServerError(null);
		try {
			await AuthApi.recoveryPasswordChangePassword({
				email,
				new_password: data.password,
				confirm_password: data.confirmPassword,
			});
			onSuccess();
		} catch (err) {
			setServerError(getErrorMessage(err, 'Failed to update password'));
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
			{serverError && (
				<div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
					{serverError}
				</div>
			)}

			<div className="flex flex-col gap-[10px]">
				<label htmlFor="password">Password</label>
				<div className="relative">
					<input
						{...register('password')}
						type={showPassword ? 'text' : 'password'}
						className="w-full border border-[#24242480] p-2 placeholder:text-[#24242480] focus:outline-none sm:block"
						placeholder="Create a strong password (min. 8 characters)"
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

			<div className="flex flex-col gap-[10px]">
				<label htmlFor="confirmPassword">Confirm Password</label>
				<div className="relative">
					<input
						{...register('confirmPassword')}
						type={showConfirmPassword ? 'text' : 'password'}
						className="w-full border border-[#24242480] p-2 placeholder:text-[#24242480] focus:outline-none"
						placeholder="Confirm your password"
					/>
					<button
						type="button"
						onClick={() =>
							setShowConfirmPassword(!showConfirmPassword)
						}
						className="absolute top-[50%] right-[18px] -translate-y-1/2"
					>
						{showConfirmPassword ? <EyeOpen /> : <EyeClose />}
					</button>
				</div>
				{errors.confirmPassword && (
					<p className="mt-1 text-sm text-red-600">
						{errors.confirmPassword.message}
					</p>
				)}
			</div>

			<div className="flex flex-col gap-4">
				<Button
					type="submit"
					disabled={
						isSubmitting ||
						Boolean(errors.password) ||
						Boolean(errors.confirmPassword)
					}
					className="font-chalet-1960 justify-center px-6 py-3"
				>
					{isSubmitting ? 'Updating…' : 'Update Password'}
				</Button>
			</div>
		</form>
	);
};
