'use client';

import { JSX, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { MAIN_NAVIGATION } from '@/shared/constants/navigation';

import { HeaderActions } from './HeaderActions';
import { MobileHeader } from './MobileHeader';
import { routes } from './RouteStyles';

import CollapsedMenu from 'public/icons/collapsed-menu.svg';
import CollapsedMenuWhine from 'public/icons/collapsed-menu-white.svg';
import Cross from 'public/icons/cross.svg';
import LogoBlackMobile from 'public/logo-black-mobile.svg';
import LogoColor from 'public/logo-color.svg';
import LogoColorMobile from 'public/logo-color-mobile.svg';
import Logo from 'public/logo-white.svg';
import LogoMobile from 'public/logo-white-mobile.svg';

export const Header = (): JSX.Element => {
	const pathname = usePathname();

	const isActive = routes.includes(pathname);

	const [isModal, setIsModal] = useState(false);

	return (
		<header className="absolute w-full">
			<div className="relative z-9999 mx-5 mt-5 flex max-w-[1240px] flex-row items-center justify-center lg:justify-between xl:mx-auto">
				<Link href="/" className="hidden lg:block">
					{isActive ? <Logo /> : <LogoColor />}
				</Link>

				<ul
					className="flex h-[61px] w-full flex-row items-center justify-between gap-6 rounded-[5px] px-6 lg:w-auto lg:justify-start"
					style={{
						background: `${isModal ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.175) 100%)' : !isActive ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.175) 100%)' : 'linear-gradient(90deg, rgba(0, 14, 61, 0.2) 0%, rgba(43, 43, 43, 0.4) 100%)'}`,
						backdropFilter: 'blur(20px)',
					}}
				>
					<Link href="/" className="block lg:hidden">
						{isModal ? (
							<LogoBlackMobile />
						) : isActive ? (
							<LogoMobile />
						) : (
							<LogoColorMobile />
						)}
					</Link>

					{MAIN_NAVIGATION.map((item) => (
						<li
							className="hidden h-[61px] items-center lg:flex"
							key={item.route}
						>
							<Link
								className={cn(
									'text-[16px] leading-[100%] font-medium',
									isActive ? 'text-white' : 'text-[#242424]',
								)}
								href={item.route}
							>
								{item.name}
							</Link>
						</li>
					))}
					<div
						onClick={() => setIsModal(!isModal)}
						className="block cursor-pointer p-2 lg:hidden"
					>
						{isModal ? (
							<Cross />
						) : isActive ? (
							<CollapsedMenuWhine />
						) : (
							<CollapsedMenu />
						)}
					</div>
				</ul>
				<HeaderActions isActive={isActive} />
			</div>
			{isModal && <MobileHeader isOpen={isModal} onClose={setIsModal} />}
		</header>
	);
};
