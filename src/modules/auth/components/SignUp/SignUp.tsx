'use client';

import { JSX, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { EyeClose } from '@/modules/auth/components/ForgotPassword/EyeClose';
import { EyeOpen } from '@/modules/auth/components/ForgotPassword/EyeOpen';
import { AuthApi } from '@/modules/auth/services/AuthApi';
import { RegisterPayload } from '@/modules/auth/type';
import { Button } from '@/shared/components/Button/Button';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { ROLE_BY_PATH } from '../../constats';

import ArrowIcon from 'public/icons/arrow-up-right-white-big.svg';
import FacebookLogin from 'public/icons/facebook-login.svg';
import GoogleLogin from 'public/icons/google-login.svg';

const phoneRegex = /^(?:(?:\+)?[0-9\s\-().]{7,})$/;

const registrationSchema = z
	.object({
		fullName: z.string().min(2, 'Full name must be at least 2 characters'),
		email: z
			.string()
			.regex(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				'Please enter a valid email',
			),
		phoneNumber: z
			.string()
			.regex(phoneRegex, 'Please enter a valid phone number'),
		location: z
			.string()
			.min(2, 'Please enter your city, state, or ZIP code'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string().min(8, 'Confirm password is required'),
		termsAccepted: z.boolean().refine((v) => v, {
			message:
				'You must agree to the Terms of Service and Privacy Policy',
		}),
	})
	.refine((d) => d.password === d.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const SignUp = (): JSX.Element => {
	const [serverError, setServerError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegistrationFormValues>({
		resolver: zodResolver(registrationSchema),
	});

	const pathname = usePathname();
	const router = useRouter();

	const onSubmit = async (data: RegistrationFormValues): Promise<void> => {
		setServerError(null);

		const seg = pathname.split('/').filter(Boolean).pop() ?? '';
		const role = ROLE_BY_PATH[seg];

		if (!role) {
			setServerError('Unknown sign-up type');
			return;
		}

		const payload: RegisterPayload = {
			full_name: data.fullName,
			email: data.email,
			phone: data.phoneNumber,
			location: data.location,
			password: data.password,
			role,
		};

		try {
			await AuthApi.register(payload);
			router.push('/login');
		} catch (err: unknown) {
			setServerError(getErrorMessage(err, 'Registration failed'));
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-5"
			>
				{serverError && (
					<div className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
						{serverError}
					</div>
				)}
				<div className="flex flex-col gap-[10px]">
					<label htmlFor="fullName">Full Name</label>
					<input
						{...register('fullName')}
						type="text"
						className="w-full border border-[#24242480] p-2 placeholder:text-[#24242480] focus:outline-none"
						placeholder="Enter your full name"
					/>
					{errors.fullName && (
						<p className="mt-1 text-sm text-red-600">
							{errors.fullName.message}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-[10px]">
					<label htmlFor="email">Email</label>
					<input
						{...register('email')}
						type="email"
						className="w-full border border-[#24242480] p-2 placeholder:text-[#24242480] focus:outline-none"
						placeholder="Enter your email address"
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-red-600">
							{errors.email.message}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-[10px]">
					<label htmlFor="phoneNumber">Phone Number</label>
					<input
						{...register('phoneNumber')}
						type="text"
						className="w-full border border-[#24242480] p-2 placeholder:text-[#24242480] focus:outline-none"
						placeholder="Enter your phone number"
					/>
					{errors.phoneNumber && (
						<p className="mt-1 text-sm text-red-600">
							{errors.phoneNumber.message}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-[10px]">
					<label htmlFor="location">
						Location (city, state, or ZIP)
					</label>
					<input
						{...register('location')}
						type="text"
						className="w-full border border-[#24242480] p-2 placeholder:text-[#24242480] focus:outline-none"
						placeholder="City, State or ZIP code"
					/>
					{errors.location && (
						<p className="mt-1 text-sm text-red-600">
							{errors.location.message}
						</p>
					)}
				</div>
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
				<div className="flex items-center gap-3">
					<input
						type="checkbox"
						id="termsAccepted"
						{...register('termsAccepted')}
						className="flex max-h-5 min-h-5 max-w-5 min-w-5 cursor-pointer appearance-none rounded border border-gray-400 checked:border-blue-600 checked:bg-blue-600 checked:before:relative checked:before:top-[0px] checked:before:left-[4px] checked:before:text-[13px] checked:before:text-white checked:before:content-['✔']"
					/>
					<label htmlFor="termsAccepted">
						I agree to the{' '}
						<a href="/terms-service" className="font-semibold">
							Terms of Service
						</a>{' '}
						and{' '}
						<a href="/privacy-policy" className="font-semibold">
							Privacy Policy
						</a>
					</label>
				</div>
				{errors.termsAccepted && (
					<p className="text-sm text-red-600">
						{errors.termsAccepted.message}
					</p>
				)}

				<div className="mt-4 flex flex-col gap-4">
					<Button
						icon={<ArrowIcon className="mt-[-2px] ml-2" />}
						iconPosition="right"
						type="submit"
						disabled={isSubmitting}
						className="font-chalet-1960 !w-full justify-center !bg-[#003BFF] !px-6 !py-3"
					>
						Create Account
					</Button>
				</div>
			</form>
			<article className="mt-[20px] flex flex-col gap-5">
				<div className="flex items-center gap-5">
					<div className="h-[1px] w-full bg-[#24242433]"></div>
					<p className="text-sm text-[#242424]">Or</p>
					<div className="h-[1px] w-full bg-[#24242433]"></div>
				</div>
				<div className="flex flex-row items-center justify-center gap-7">
					<Link href="#">
						<GoogleLogin />
					</Link>
					<Link href="#">
						<FacebookLogin />
					</Link>
				</div>
				<p className="text-center text-sm text-[#242424]">
					Don’t have an account?{' '}
					<Link className="font-semibold" href="/login">
						Log In
					</Link>
				</p>
			</article>
		</>
	);
};
