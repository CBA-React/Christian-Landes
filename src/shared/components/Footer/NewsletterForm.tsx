'use client';

import { JSX, useState } from 'react';

export const NewsletterForm = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [error, setError] = useState('');

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-6 mt-[53px] relative"
        >
            <h3 className="text-2xl font-medium">Sign up for our newsletter</h3>
            <div className="relative w-full">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-4.5 rounded-full w-full text-black bg-white h-[57px] focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="h-[45px] w-[101px] grid place-items-center absolute right-[6px] leading-none top-[50%] -translate-y-1/2 transform text-white font-semibold text-base bg-[#003BFF] rounded-full border-none transition"
                >
                    <p>{status === 'loading' ? 'Sending...' : 'Submit'}</p>
                </button>
            </div>
            {error && (
                <p className="text-white absolute bottom-[-30px]">{error}</p>
            )}
            {status === 'success' && (
                <p className="text-white absolute bottom-[-30px]">
                    Thanks for subscribing!
                </p>
            )}
            {status === 'error' && (
                <p className="text-white absolute bottom-[-30px]">
                    Something went wrong. Please try again.
                </p>
            )}
        </form>
    );
};
