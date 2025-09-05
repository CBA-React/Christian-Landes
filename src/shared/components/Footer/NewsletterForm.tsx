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
			className="relative mt-[10px] flex w-full flex-col gap-[10px] md:mt-3 md:gap-6 lg:mt-[53px]"
		>
			<h3 className="text-center text-[22px] font-medium md:text-2xl lg:text-left">
				Sign up for our newsletter
			</h3>
			<div className="relative w-full">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email"
					required
					className="h-[57px] w-full flex-1 rounded-full bg-white px-6 py-4.5 text-black focus:outline-none"
				/>
				<button
					type="submit"
					disabled={status === 'loading'}
					className="absolute top-[50%] right-[6px] grid h-[45px] w-[101px] -translate-y-1/2 transform place-items-center rounded-full border-none bg-[#003BFF] text-base leading-none font-semibold text-white transition"
				>
					<p>{status === 'loading' ? 'Sending...' : 'Submit'}</p>
				</button>
			</div>
			{error && (
				<p className="absolute bottom-[-30px] text-white">{error}</p>
			)}
			{status === 'success' && (
				<p className="absolute bottom-[-30px] text-white">
					Thanks for subscribing!
				</p>
			)}
			{status === 'error' && (
				<p className="absolute bottom-[-30px] text-white">
					Something went wrong. Please try again.
				</p>
			)}
		</form>
	);
};

