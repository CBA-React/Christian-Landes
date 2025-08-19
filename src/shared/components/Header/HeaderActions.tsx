'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '../Button/Button';

import ArrowIconBlack from 'public/icons/arrow-up-right-black.svg';
import ArrowIconWhite from 'public/icons/arrow-up-right-white.svg';
import UserIcon from 'public/icons/user.svg';

export const HeaderActions = (): JSX.Element => {
	const router = useRouter();

	// const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const isLoggedIn = false;

	return (
		<div className="hidden items-center gap-3 lg:flex">
			<Button
				icon={<ArrowIconWhite />}
				iconPosition="right"
				color="dark"
				variant="solid"
				onClick={() => router.push('/contact-us')}
			>
				Contact Us
			</Button>

			{isLoggedIn ? (
				<Link href="/profile" aria-label="User Profile">
					<UserIcon className="h-6 w-6 transition hover:opacity-80" />
				</Link>
			) : (
				<Button
					icon={<ArrowIconBlack />}
					iconPosition="right"
					color="light"
					variant="solid"
					onClick={() => router.push('/login')}
				>
					Login
				</Button>
			)}
		</div>
	);
};
