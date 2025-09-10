'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MAIN_NAVIGATION } from '@/shared/constants/navigation';
import { cn } from '@/shared/lib/cn';

import { HeaderActions } from './HeaderActions';
import { routes } from './RouteStyles';

import CollapsedMenu from 'public/icons/collapsed-menu.svg';
import CollapsedMenuWhine from 'public/icons/collapsed-menu-white.svg';
import LogoBlack from 'public/logo-black.svg';
import LogoColor from 'public/logo-color.svg';
import Logo from 'public/logo-white.svg';
import LogoMobile from 'public/logo-white-mobile.svg';

export const Header = (): JSX.Element => {
	const pathname = usePathname();

	const isNavLight =
		pathname.includes('contractors') || pathname.includes('about');
	const isActive = routes.includes(pathname);

	return (
		<header className="absolute w-full">
			<div className="mx-5 mt-5 flex max-w-[1240px] flex-row items-center justify-center lg:justify-between xl:mx-auto">
				{isActive ? (
					<Logo className="hidden lg:block" />
				) : (
					<LogoColor className="hidden lg:block" />
				)}
				<ul
					className="flex h-[61px] w-full flex-row items-center justify-between gap-6 rounded-[5px] px-6 lg:w-auto lg:justify-start"
					style={{
						background: `${isNavLight ? 'linear-gradient(90deg, rgba(225, 225, 225, 1) 0%, rgba(225, 225, 225, 0.25) 100%)' : 'linear-gradient(90deg, rgba(0, 14, 61, 0.2) 0%, rgba(43, 43, 43, 0.4) 100%)'}`,
						backdropFilter: 'blur(20px)',
					}}
				>
					{isActive ? (
						<LogoMobile className="block lg:hidden" />
					) : (
						<LogoBlack className="block lg:hidden" />
					)}

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
					<div className="block cursor-pointer lg:hidden">
						{isActive ? <CollapsedMenuWhine /> : <CollapsedMenu />}
					</div>
				</ul>
				<HeaderActions />
			</div>
		</header>
	);
};

