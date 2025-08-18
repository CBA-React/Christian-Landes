import { JSX } from 'react';
import Link from 'next/link';

import { MAIN_NAVIGATION } from '@/shared/constants/navigation';

import { HeaderActions } from './HeaderActions';

import CollapsedMenuIcon from 'public/icons/collapsed-menu.svg';
import LogoBlack from 'public/logo-black.svg';
import Logo from 'public/logo-white.svg';

export const Header = (): JSX.Element => {
    return (
        <header className="w-full absolute">
            <div className="mx-auto max-w-[1240px] flex flex-row mt-5 items-center lg:justify-between justify-center">
                <Logo className={'hidden lg:block'} />
                <ul
                    className="flex flex-row px-6 items-center gap-6 rounded-[5px] h-[61px]"
                    style={{
                        background:
                            'linear-gradient(90deg, rgba(0, 14, 61, 0.2) 0%, rgba(43, 43, 43, 0.4) 100%)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <LogoBlack className="block lg:hidden" />
                    {MAIN_NAVIGATION.map((item) => (
                        <li
                            className="max-h-[21px] hidden lg:block"
                            key={item.route}
                        >
                            <Link
                                className="font-medium text-white text-[16px] leading-[100%] align-top"
                                href={item.route}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <div className="block lg:hidden cursor-pointer">
                        <CollapsedMenuIcon />
                    </div>
                </ul>
                <HeaderActions />
            </div>
        </header>
    );
};
