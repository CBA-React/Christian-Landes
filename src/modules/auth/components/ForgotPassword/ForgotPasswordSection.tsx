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
	const [serverError, setServerError] = useState<string | null>(null);

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
				return (
					<VerificationCodeForm
						setServerError={setServerError}
						serverError={serverError}
						email={email}
						onSuccess={() => setStep(3)}
					/>
				);
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
		<div className="mx-5 mt-[110px] mb-[56px] flex w-full max-w-[1240px] justify-end md:mt-[161px] md:mb-[122px] xl:mx-auto">
			<section className="h-fit w-full max-w-[335px] rounded-[20px] bg-[#ffffffbf] px-6 py-10 backdrop-blur-[20px] md:max-w-[578px] md:p-16">
				<article className="flex flex-col gap-4">
					<h1 className="font-chalet-1960 text-[48px] leading-[58px] font-medium text-[#242424] md:text-[84px] md:leading-[100%]">
						{getTitle(step)}
					</h1>
					{!serverError && (
						<p className="text-base text-[#242424] md:text-xl">
							{getDescription(step, email)}
						</p>
					)}
				</article>
				<article className="mt-6">{renderStepForm(step)}</article>
			</section>
		</div>
	);
};
