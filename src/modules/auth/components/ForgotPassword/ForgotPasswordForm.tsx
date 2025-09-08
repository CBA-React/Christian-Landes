import { JSX } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/Button/Button';
import { AuthInput } from '../AuthInput';

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

	const router = useRouter();

	const onSubmit = async (data: ForgotPasswordFormValues): Promise<void> => {
		console.log('Forgot password data:', data);
		onSuccess(data.email);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<AuthInput
				label="Email"
				type="email"
				placeholder="Enter your email"
				register={register('email', { required: 'Email is required' })}
				error={errors.email}
			/>
			<div className="mt-[20px] flex w-full flex-col gap-3">
				<Button
					className="font-chalet-1960 justify-center px-6 py-3 text-[16px] font-medium"
					type="submit"
					disabled={isSubmitting}
				>
					Continue
				</Button>
				<Button
					className="font-chalet-1960 justify-center bg-[#DBDBDB] px-6 py-3 text-[16px] font-medium"
					color="light"
					variant="ghost"
					type="button"
					onClick={() => router.push('/login')}
				>
					Back to Sign In
				</Button>
			</div>
		</form>
	);
};
