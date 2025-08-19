'use client';

import { JSX } from 'react';
import Link from 'next/link';

import { MAIN_NAVIGATION } from '@/shared/constants/navigation';

import { HeaderActions } from './HeaderActions';

import CollapsedMenu from 'public/icons/collapsed-menu.svg';
import CollapsedMenuWhine from 'public/icons/collapsed-menu-white.svg';
import LogoMobile from 'public/logo-white-mobile.svg';
import LogoBlack from 'public/logo-black.svg';
import Logo from 'public/logo-white.svg';
import LogoColor from 'public/logo-color.svg';
import { usePathname } from 'next/navigation';
import { routes } from './RouteStyles';
import { cn } from '@/shared/lib/cn';

export const Header = (): JSX.Element => {
	const pathname = usePathname();

	const isActive = routes.includes(pathname);

	return (
		<header className="absolute w-full">
			<div className="mx-auto mt-5 flex max-w-[1240px] flex-row items-center justify-center px-5 lg:justify-between xl:px-0">
				{isActive ? (
					<Logo className="hidden lg:block" />
				) : (
					<LogoColor className="hidden lg:block" />
				)}
				<ul
					className="flex h-[61px] w-full flex-row items-center justify-between gap-6 rounded-[5px] px-6 lg:w-auto lg:justify-start"
					style={{
						background:
							'linear-gradient(90deg, rgba(0, 14, 61, 0.2) 0%, rgba(43, 43, 43, 0.4) 100%)',
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
							className="hidden max-h-[21px] lg:block"
							key={item.route}
						>
							<Link
								className={cn(
									'align-top text-[16px] leading-[100%] font-medium',
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
