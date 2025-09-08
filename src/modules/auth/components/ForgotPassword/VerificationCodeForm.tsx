'use client';

import { JSX, useEffect, useState } from 'react';

import { OTP } from '@/modules/auth/components/ForgotPassword/OTP';
import { AuthApi } from '@/modules/auth/services/AuthApi';
import { Button } from '@/shared/components/Button/Button';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

interface VerificationCodeFormProps {
	onSuccess: () => void;
	email: string;
}

export const VerificationCodeForm = ({
	onSuccess,
	email,
}: VerificationCodeFormProps): JSX.Element => {
	const [otp, setOtp] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				await AuthApi.recoveryPassword(email);
				console.log('Recovery email sent on mount');
			} catch (err: unknown) {
				setServerError(
					getErrorMessage(err, 'Failed to send recovery email'),
				);
			} finally {
				setLoading(false);
			}
		})();
	}, [email]);

	async function handleSubmit() {
		console.log('OTP entered:', otp);
		onSuccess();
	}

	async function resendEmail() {
		try {
			setLoading(true);
			setServerError(null);
			await AuthApi.recoveryPassword(email);
			console.log('Recovery email resent!');
		} catch (err: unknown) {
			setServerError(getErrorMessage(err, 'Failed to resend email'));
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			{serverError && (
				<div className="mb-2 rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
					{serverError}
				</div>
			)}

			<OTP value={otp} onChange={setOtp} />

			<Button
				className="mt-[20px] w-full justify-center px-6 py-3"
				onClick={handleSubmit}
				disabled={otp.length !== 6 || loading}
			>
				Continue
			</Button>

			<p className="mt-[20px] text-center">
				Haven’t got the email yet?{' '}
				<strong
					onClick={resendEmail}
					className={`cursor-pointer hover:underline ${loading ? 'opacity-50' : ''}`}
				>
					{loading ? 'Sending...' : 'Resend email'}
				</strong>
			</p>
		</div>
	);
};
