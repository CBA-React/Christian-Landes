import { JSX } from 'react';

export function getTitle(step: number): JSX.Element {
	switch (step) {
		case 1:
			return (
				<>
					Forgot <br /> Password?
				</>
			);
		case 2:
			return (
				<>
					Verification <br /> Code
				</>
			);
		case 3:
			return (
				<>
					Reset <br /> Password
				</>
			);
		case 4:
			return <>Updated!</>;
		default:
			return <></>;
	}
}

export function getDescription(step: number, email: string): JSX.Element {
	switch (step) {
		case 1:
			return (
				<>
					Enter the email address associated with your account and we
					will send you a link to reset your password.
				</>
			);
		case 2:
			return (
				<>
					We sent a reset link to{' '}
					<label className="font-semibold">{email}</label> enter 6
					digit code that mentioned in the email
				</>
			);
		case 3:
			return (
				<>
					Please enter your new password below. Make sure it’s strong
					and something you haven’t used before
				</>
			);
		case 4:
			return (
				<>
					Your password has been updated! You can now sign in with
					your new password
				</>
			);
		default:
			return <></>;
	}
}
