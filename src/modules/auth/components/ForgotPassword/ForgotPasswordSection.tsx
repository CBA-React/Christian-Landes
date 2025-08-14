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
        <div className="max-w-[1240px] mb-[122px] px-4 mx-auto w-full flex justify-end mt-[161px]">
            <section className="p-16 rounded-[20px] max-w-[578px] w-full bg-[#FFFFFFD9] backdrop-blur-[20px] h-fit">
                <article className="flex flex-col gap-4">
                    <h1 className="font-medium text-[84px] text-[#242424] leading-[84px]">
                        {getTitle(step)}
                    </h1>
                    <p className="text-[20px]">{getDescription(step, email)}</p>
                </article>
                <article className="mt-6">{renderStepForm(step)}</article>
            </section>
        </div>
    );
};
