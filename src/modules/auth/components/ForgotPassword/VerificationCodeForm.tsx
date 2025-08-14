import { JSX, useState } from 'react';

import { OTP } from '@/modules/auth/components/ForgotPassword/OTP';
import { Button } from '@/shared/components/Button/Button';

interface VerificationCodeFormProps {
    onSuccess: () => void;
}

export const VerificationCodeForm = ({
    onSuccess,
}: VerificationCodeFormProps): JSX.Element => {
    const [otp, setOtp] = useState<string>('');
    function handleSubmit() {
        console.log(otp);
        onSuccess();
    }

    function resendEmail() {
        console.log('here');
    }

    return (
        <div>
            <OTP value={otp} onChange={setOtp} />
            <Button
                className="px-6 py-3 w-full justify-center mt-[20px]"
                onClick={handleSubmit}
                disabled={otp.length !== 6}
            >
                Continue
            </Button>
            <p className={'text-center mt-[20px]'}>
                Haven’t got the email yet?{' '}
                <strong
                    onClick={resendEmail}
                    className={'cursor-pointer hover:underline'}
                >
                    Resend email
                </strong>
            </p>
        </div>
    );
};
