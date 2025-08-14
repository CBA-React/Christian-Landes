import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { login } from '../store';

interface LoginFormValues {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const dispatch = useDispatch();

    const onSubmit = (data: LoginFormValues) => {
        // Замість фейкового токена буде реальний з API
        const fakeToken = 'example-token';
        sessionStorage.setItem('token', fakeToken);
        dispatch(login({ token: fakeToken, email: data.email }));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label>Email</label>
                <input
                    type="email"
                    className="w-full border p-2"
                    {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    className="w-full border p-2"
                    {...register('password', {
                        required: 'Password is required',
                    })}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Log In
            </button>
        </form>
    );
};
