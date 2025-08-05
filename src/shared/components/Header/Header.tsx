import { JSX } from 'react';
import Link from 'next/link';

import { MAIN_NAVIGATION } from '@/shared/constants/navigation';

import { HeaderActions } from './HeaderActions';

import Logo from 'public/logo.svg';

export const Header = (): JSX.Element => {
    return (
        <header className="w-full absolute">
            <div className="mx-auto max-w-[1240px] flex flex-row mt-5 items-center justify-between">
                <Logo />
                <ul
                    className="flex flex-row px-6 items-center gap-6 rounded-[5px] h-[61px]"
                    style={{
                        background:
                            'linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.175) 100%)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    {MAIN_NAVIGATION.map((item) => (
                        <li className="max-h-[21px]" key={item.route}>
                            <Link
                                className="font-medium text-[16px] leading-[100%] align-top"
                                href={item.route}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <HeaderActions />
            </div>
        </header>
    );
};
