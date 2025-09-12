'use client';

import { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/shared/hooks/useStore';
import { Button } from '../Button/Button';

import ArrowIconBlack from 'public/icons/arrow-up-right-black.svg';
import ArrowIconWhite from 'public/icons/arrow-up-right-white.svg';
import UserIcon from 'public/icons/user.svg';

export const HeaderActions = (): JSX.Element | null => {
	const router = useRouter();

	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const token = useAppSelector((s) => s.auth.token);

	if (!mounted) return null;

	return (
		<div className="hidden items-center gap-3 lg:flex">
			<Button
				className="font-chalet-1960"
				icon={<ArrowIconWhite />}
				iconPosition="right"
				color="dark"
				variant="solid"
				onClick={() => router.push('/contact-us')}
			>
				Contact Us
			</Button>

			{token ? (
				<Link href="/profile" aria-label="User Profile" className="p-2">
					<UserIcon className="h-4 w-4 transition hover:opacity-80" />
				</Link>
			) : (
				<Button
					className="font-chalet-1960"
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
