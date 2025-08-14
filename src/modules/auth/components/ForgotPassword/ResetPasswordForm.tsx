import { JSX, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { EyeClose } from '@/modules/auth/components/ForgotPassword/EyeClose';
import { EyeOpen } from '@/modules/auth/components/ForgotPassword/EyeOpen';
import { Button } from '@/shared/components/Button/Button';

const resetPasswordSchema = z
    .object({
        password: z.string().min(8, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(8, 'Confirm password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
    onSuccess: () => void;
}

export const ResetPasswordForm = ({
    onSuccess,
}: ResetPasswordFormProps): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
    });

    function onSubmit(data: ResetPasswordFormValues) {
        console.log(data);
        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col relative">
                <label htmlFor="password">New Password</label>
                <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="border border-[#24242480] p-[6px] w-full mt-[6px] placeholder:text-[#242424] pr-10"
                    placeholder="Create a strong password (min. 8 characters)"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-[70%] -translate-y-1/2"
                >
                    {showPassword ? <EyeOpen /> : <EyeClose />}
                </button>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col relative">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    {...register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="border border-[#24242480] p-[6px] w-full mt-[6px] placeholder:text-[#242424] pr-10"
                    placeholder="Confirm your password"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-[70%] -translate-y-1/2"
                >
                    {showConfirmPassword ? <EyeOpen /> : <EyeClose />}
                </button>
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <Button
                    type="submit"
                    disabled={
                        isSubmitting ||
                        Boolean(errors.password) ||
                        Boolean(errors.confirmPassword)
                    }
                    className={'justify-center px-6 py-3'}
                >
                    Update Password
                </Button>
            </div>
        </form>
    );
};
