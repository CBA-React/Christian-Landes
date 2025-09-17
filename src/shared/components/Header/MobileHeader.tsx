'use client';

import { Dispatch, JSX, SetStateAction, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { MAIN_NAVIGATION } from '@/shared/constants/navigation';
import { useAppSelector } from '@/shared/hooks/useStore';
import { Button } from '../Button/Button';

import ArrowIconBlack from 'public/icons/arrow-up-right-black.svg';
import ArrowIconWhite from 'public/icons/arrow-up-right-white.svg';

interface MobileHeaderProps {
	isOpen: boolean;
	onClose: Dispatch<SetStateAction<boolean>>;
}

export const MobileHeader = ({
	isOpen,
	onClose,
}: MobileHeaderProps): JSX.Element | null => {
	const router = useRouter();

	const isLoggedIn = useAppSelector((state) => state.auth.token);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return (): void => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="fixed top-0 left-0 z-[999] h-full w-full bg-[#F1F3F6]">
			<div className="mt-[109px] flex h-[calc(100%_-_109px)] flex-col justify-between px-5 pb-5">
				<ul className="flex flex-col gap-3">
					{MAIN_NAVIGATION.map((item) => (
						<li
							onClick={() => onClose(!isOpen)}
							className="flex items-center"
							key={item.route}
						>
							<Link
								className="font-chalet-1960 text-[28px] leading-[34px] font-medium"
								href={item.route}
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
				<div className="flex w-full flex-col gap-3">
					<Button
						className="font-chalet-1960 justify-center py-2 text-center text-base"
						icon={<ArrowIconWhite />}
						iconPosition="right"
						color="dark"
						variant="solid"
						onClick={() => {
							router.push('/contact-us');
							onClose(!isOpen);
						}}
					>
						Contact Us
					</Button>

					{!!isLoggedIn ? (
						<Button
							className="font-chalet-1960 justify-center bg-[#FFFFFF] py-2 text-base"
							icon={<ArrowIconBlack />}
							iconPosition="right"
							color="light"
							variant="solid"
							onClick={() => {
								router.push('/profile');
								onClose(!isOpen);
							}}
						>
							Profile
						</Button>
					) : (
						<Button
							className="font-chalet-1960 justify-center bg-[#FFFFFF] py-2 text-base"
							icon={<ArrowIconBlack />}
							iconPosition="right"
							color="light"
							variant="solid"
							onClick={() => {
								router.push('/login');
								onClose(!isOpen);
							}}
						>
							Login
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};
