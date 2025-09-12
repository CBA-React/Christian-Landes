'use client';

import {
	Dispatch,
	JSX,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';

import { OTP } from '@/modules/auth/components/ForgotPassword/OTP';
import { AuthApi } from '@/modules/auth/services/AuthApi';
import { Button } from '@/shared/components/Button/Button';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

interface VerificationCodeFormProps {
	onSuccess: () => void;
	email: string;
	serverError: string | null;
	setServerError: Dispatch<SetStateAction<string | null>>;
}

export const VerificationCodeForm = ({
	onSuccess,
	email,
	serverError,
	setServerError,
}: VerificationCodeFormProps): JSX.Element => {
	const [otp, setOtp] = useState<string>('');
	const [loading, setLoading] = useState(false);

	const [cooldown, setCooldown] = useState<number>(0);
	const intervalRef = useRef<number | null>(null);

	useEffect(() => {
		(async (): Promise<void> => {
			try {
				setLoading(true);
				await AuthApi.recoveryPassword(email);
				setCooldown(60);
				console.log('Recovery email sent on mount');
			} catch (err: unknown) {
				setServerError(
					getErrorMessage(err, 'Failed to send recovery email'),
				);
			} finally {
				setLoading(false);
			}
		})();
	}, [email, setServerError]);

	useEffect(() => {
		(async (): Promise<void> => {
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
	}, [email, setServerError]);

	useEffect(() => {
		if (cooldown <= 0) {
			if (intervalRef.current) {
				window.clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			return;
		}

		if (!intervalRef.current) {
			intervalRef.current = window.setInterval(() => {
				setCooldown((s) => (s > 0 ? s - 1 : 0));
			}, 1000);
		}

		return (): void => {
			if (intervalRef.current) {
				window.clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [cooldown]);

	async function handleSubmit(): Promise<void> {
		if (loading) return;
		if (otp.length !== 6) {
			setServerError('Please enter the 6-digit code');
			return;
		}

		try {
			setLoading(true);
			setServerError(null);

			await AuthApi.verifyOtp(email, otp);

			onSuccess();
		} catch (err: unknown) {
			setServerError(getErrorMessage(err, 'Invalid or expired code'));
		} finally {
			setLoading(false);
		}
	}

	async function resendEmail(): Promise<void> {
		if (loading || cooldown > 0) return;

		try {
			setLoading(true);
			setServerError(null);
			await AuthApi.recoveryPassword(email);
			console.log('Recovery email resent!');
			setCooldown(60);
		} catch (err: unknown) {
			setServerError(getErrorMessage(err, 'Failed to resend email'));
		} finally {
			setLoading(false);
		}
	}

	const isResendDisabled = loading || cooldown > 0;

	return (
		<div>
			{serverError && (
				<div className="mb-2 rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
					{serverError}
				</div>
			)}

			<OTP
				value={otp}
				onChange={(v) => {
					setServerError(null);
					setOtp(v);
				}}
			/>

			<Button
				className={`mt-[20px] w-full justify-center bg-[#003BFF] px-6 py-3`}
				onClick={handleSubmit}
				disabled={otp.length !== 6 || loading}
			>
				Continue
			</Button>

			<p className="mt-[20px] text-center">
				Haven’t got the email yet?{' '}
				<strong
					onClick={resendEmail}
					role="button"
					aria-disabled={isResendDisabled}
					className={`cursor-pointer ${isResendDisabled ? 'pointer-events-none opacity-50' : ''}`}
				>
					{loading
						? 'Sending...'
						: cooldown > 0
							? `Resend in ${cooldown}s`
							: 'Resend email'}
				</strong>
			</p>
		</div>
	);
};
