'use client';

import { JSX, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { EyeClose } from '@/modules/auth/components/ForgotPassword/EyeClose';
import { EyeOpen } from '@/modules/auth/components/ForgotPassword/EyeOpen';
import { Button } from '@/shared/components/Button/Button';

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
		termsAccepted: z.boolean().refine((val) => val, {
			message:
				'You must agree to the Terms of Service and Privacy Policy',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const SignUp = (): JSX.Element => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegistrationFormValues>({
		resolver: zodResolver(registrationSchema),
	});

	function onSubmit(data: RegistrationFormValues) {
		console.log(data);
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<div className="flex flex-col">
					<label htmlFor="fullName">Full Name</label>
					<input
						{...register('fullName')}
						type="text"
						className="mt-[6px] w-full border border-[#24242480] p-[6px] placeholder:text-[#242424]"
						placeholder="Enter your full name"
					/>
					{errors.fullName && (
						<p className="mt-1 text-sm text-red-600">
							{errors.fullName.message}
						</p>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="email">Email</label>
					<input
						{...register('email')}
						type="email"
						className="mt-[6px] w-full border border-[#24242480] p-[6px] placeholder:text-[#242424]"
						placeholder="Enter your email address"
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-red-600">
							{errors.email.message}
						</p>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="phoneNumber">Phone Number</label>
					<input
						{...register('phoneNumber')}
						type="text"
						className="mt-[6px] w-full border border-[#24242480] p-[6px] placeholder:text-[#242424]"
						placeholder="Enter your phone number"
					/>
					{errors.phoneNumber && (
						<p className="mt-1 text-sm text-red-600">
							{errors.phoneNumber.message}
						</p>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="location">
						Location (city, state, or ZIP)
					</label>
					<input
						{...register('location')}
						type="text"
						className="mt-[6px] w-full border border-[#24242480] p-[6px] placeholder:text-[#242424]"
						placeholder="City, State or ZIP code"
					/>
					{errors.location && (
						<p className="mt-1 text-sm text-red-600">
							{errors.location.message}
						</p>
					)}
				</div>
				<div className="relative flex flex-col">
					<label htmlFor="password">Password</label>
					<input
						{...register('password')}
						type={showPassword ? 'text' : 'password'}
						className="mt-[6px] w-full border border-[#24242480] p-[6px] pr-10 placeholder:text-[#242424]"
						placeholder="Create a strong password (min. 8 characters)"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute top-[70%] right-2 -translate-y-1/2"
					>
						{showPassword ? <EyeOpen /> : <EyeClose />}
					</button>
					{errors.password && (
						<p className="mt-1 text-sm text-red-600">
							{errors.password.message}
						</p>
					)}
				</div>
				<div className="relative flex flex-col">
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						{...register('confirmPassword')}
						type={showConfirmPassword ? 'text' : 'password'}
						className="mt-[6px] w-full border border-[#24242480] p-[6px] pr-10 placeholder:text-[#242424]"
						placeholder="Confirm your password"
					/>
					<button
						type="button"
						onClick={() =>
							setShowConfirmPassword(!showConfirmPassword)
						}
						className="absolute top-[70%] right-2 -translate-y-1/2"
					>
						{showConfirmPassword ? <EyeOpen /> : <EyeClose />}
					</button>
					{errors.confirmPassword && (
						<p className="mt-1 text-sm text-red-600">
							{errors.confirmPassword.message}
						</p>
					)}
				</div>
				<div className="mt-2 flex items-start gap-2">
					<input
						type="checkbox"
						{...register('termsAccepted')}
						id="termsAccepted"
						className="mt-1 bg-transparent"
					/>
					<label htmlFor="termsAccepted" className="text-sm">
						I agree to the{' '}
						<a href="/terms" className="font-semibold">
							Terms of Service
						</a>{' '}
						and{' '}
						<a href="/privacy" className="font-semibold">
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
						icon={<ArrowIcon className={'mt-[-2px] ml-2'} />}
						iconPosition="right"
						type="submit"
						disabled={isSubmitting}
						className="!w-full justify-center !bg-[#003BFF] !px-6 !py-3"
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
