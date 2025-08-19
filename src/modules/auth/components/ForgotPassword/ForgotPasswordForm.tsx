import { JSX } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/Button/Button';

const forgotPasswordSchema = z.object({
	email: z.string().min(1, 'Email is required'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
	onSuccess: (email: string) => void;
}

export const ForgotPasswordForm = ({
	onSuccess,
}: ForgotPasswordFormProps): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	const onSubmit = async (data: ForgotPasswordFormValues) => {
		console.log('Forgot password data:', data);
		onSuccess(data.email);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor="">Email</label>
			<input
				{...register('email')}
				type="text"
				className="mt-[10px] w-full border border-[#24242480] p-[6px] placeholder:text-[#242424]"
				placeholder={'Enter your email'}
			/>
			{errors.email && (
				<p className="mt-1 text-sm text-red-600">
					{errors.email.message}
				</p>
			)}
			<div className="mt-[20px] flex w-full flex-col gap-4">
				<Button
					className="justify-center px-6 py-3"
					type={'submit'}
					disabled={isSubmitting}
				>
					Continue
				</Button>
				<Button
					className="justify-center px-6 py-3"
					color={'light'}
					variant={'ghost'}
				>
					Back to Sign In
				</Button>
			</div>
		</form>
	);
};
