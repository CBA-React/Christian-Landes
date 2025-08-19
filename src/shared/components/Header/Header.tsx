import { JSX } from 'react';
import Link from 'next/link';

import { MAIN_NAVIGATION } from '@/shared/constants/navigation';

import { HeaderActions } from './HeaderActions';

import CollapsedMenuIcon from 'public/icons/collapsed-menu.svg';
import LogoBlack from 'public/logo-black.svg';
import Logo from 'public/logo-white.svg';

export const Header = (): JSX.Element => {
	return (
		<header className="absolute w-full">
			<div className="mx-auto mt-5 flex max-w-[1240px] flex-row items-center justify-center px-4 lg:justify-between xl:px-0">
				<Logo className={'hidden lg:block'} />
				<ul
					className="flex h-[61px] flex-row items-center gap-6 rounded-[5px] px-6"
					style={{
						background:
							'linear-gradient(90deg, rgba(0, 14, 61, 0.2) 0%, rgba(43, 43, 43, 0.4) 100%)',
						backdropFilter: 'blur(20px)',
					}}
				>
					<LogoBlack className="block lg:hidden" />
					{MAIN_NAVIGATION.map((item) => (
						<li
							className="hidden max-h-[21px] lg:block"
							key={item.route}
						>
							<Link
								className="align-top text-[16px] leading-[100%] font-medium text-white"
								href={item.route}
							>
								{item.name}
							</Link>
						</li>
					))}
					<div className="block cursor-pointer lg:hidden">
						<CollapsedMenuIcon />
					</div>
				</ul>
				<HeaderActions />
			</div>
		</header>
	);
};
