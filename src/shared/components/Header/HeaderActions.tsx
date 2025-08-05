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
        <div className="flex items-center gap-3">
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
                    <UserIcon className="w-6 h-6 hover:opacity-80 transition" />
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
