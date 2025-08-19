'use client';

import { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ForgotPasswordForm } from '@/modules/auth/components/ForgotPassword/ForgotPasswordForm';
import { ResetPasswordForm } from '@/modules/auth/components/ForgotPassword/ResetPasswordForm';
import {
	getDescription,
	getTitle,
} from '@/modules/auth/components/ForgotPassword/utils';
import { VerificationCodeForm } from '@/modules/auth/components/ForgotPassword/VerificationCodeForm';
import { Button } from '@/shared/components/Button/Button';

export const ForgotPasswordSection = (): JSX.Element => {
	const router = useRouter();

	const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
	const [email, setEmail] = useState<string>('');

	function renderStepForm(step: number): JSX.Element {
		switch (step) {
			case 1:
				return (
					<ForgotPasswordForm
						onSuccess={(email: string) => {
							setEmail(email);
							setStep(2);
						}}
					/>
				);
			case 2:
				return <VerificationCodeForm onSuccess={() => setStep(3)} />;
			case 3:
				return <ResetPasswordForm onSuccess={() => setStep(4)} />;
			case 4:
				return (
					<Button
						className="w-full justify-center px-6 py-3"
						onClick={() => router.push('/login')}
					>
						Back to Sign In
					</Button>
				);
			default:
				return <div></div>;
		}
	}
	return (
		<div className="mx-auto mt-[161px] mb-[122px] flex w-full max-w-[1240px] justify-end px-4">
			<section className="h-fit w-full max-w-[578px] rounded-[20px] bg-[#FFFFFFD9] p-16 backdrop-blur-[20px]">
				<article className="flex flex-col gap-4">
					<h1 className="text-[84px] leading-[84px] font-medium text-[#242424]">
						{getTitle(step)}
					</h1>
					<p className="text-[20px]">{getDescription(step, email)}</p>
				</article>
				<article className="mt-6">{renderStepForm(step)}</article>
			</section>
		</div>
	);
};
