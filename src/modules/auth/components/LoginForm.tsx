'use client';

import { JSX, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { EyeClose } from '@/modules/auth/components/ForgotPassword/EyeClose';
import { EyeOpen } from '@/modules/auth/components/ForgotPassword/EyeOpen';
import { Button } from '@/shared/components/Button/Button';
import { decodeJwt } from '@/shared/lib/decodeJwt';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { AuthApi } from '../services/AuthApi';
import { login } from '../slices/authSlice';

import { AuthInput } from './AuthInput';

import ArrowIconWhite from 'public/icons/arrow-up-right-white-big.svg';

interface LoginFormValues {
	email: string;
	password: string;
}

export const LoginForm = (): JSX.Element => {
	const [serverError, setServerError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<LoginFormValues>();
	const router = useRouter();
	const dispatch = useDispatch();

	const onSubmit = async (data: LoginFormValues): Promise<void> => {
		setServerError(null);
		try {
			const res = await AuthApi.login(data);

			localStorage.setItem('access_token', res.access_token);
			localStorage.setItem('refresh_token', res.refresh_token);

			document.cookie = `token=${res.access_token}; path=/; SameSite=Lax`;

			dispatch(login({ token: res.access_token, email: data.email }));

			const payload = decodeJwt(res.access_token);
			if (payload?.role === 3) {
				router.push('/admin');
			} else {
				router.push('/');
			}
		} catch (err: unknown) {
			const msg = getErrorMessage(err, 'Invalid email or password');
			setServerError(msg);
			setError('email', { type: 'server', message: '' });
			setError('password', { type: 'server', message: '' });
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mt-5 mb-5 flex flex-col space-y-5 md:mt-6"
		>
			{serverError && (
				<div className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
					{serverError}
				</div>
			)}

			<AuthInput
				label="Email"
				type="email"
				placeholder="Enter your email"
				register={register('email', { required: 'Email is required' })}
				error={errors.email}
			/>

			<div>
				<div className="flex flex-col gap-[6px] pb-3">
					<label htmlFor="password">Password</label>
					<div className="relative">
						<input
							{...register('password')}
							type={showPassword ? 'text' : 'password'}
							className="w-full border border-[#24242480] p-2 placeholder:text-[#24242480] focus:outline-none sm:block"
							placeholder="Enter your password"
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
				<Link
					className="text-[14px] font-semibold text-[#242424]"
					href="/forgot-password"
				>
					Forgot your password?
				</Link>
			</div>

			<Button
				className="font-chalet-1960 flex flex-row justify-center !gap-4 py-3"
				icon={<ArrowIconWhite />}
				iconPosition="right"
				type="submit"
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Logging in…' : 'Log In'}
			</Button>
		</form>
	);
};
