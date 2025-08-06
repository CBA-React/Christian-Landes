import { JSX } from 'react';
import Link from 'next/link';

import AppleLogin from 'public/icons/apple-login.svg';
import FacebookLogin from 'public/icons/facebook-login.svg';
import GoogleLogin from 'public/icons/google-login.svg';
import MicrosoftLogin from 'public/icons/microsoft-login.svg';

export const LoginSection = (): JSX.Element => {
    return (
        <div className="max-w-[1240px] mb-[122px] px-4 mx-auto w-full flex justify-end mt-[161px]">
            <section className="p-16 rounded-[20px] max-w-[578px] w-full bg-[#FFFFFFD9] backdrop-blur-[20px]">
                <article className="flex flex-col gap-4">
                    <h1 className="font-medium text-[84px] text-[#242424]">
                        Log In
                    </h1>
                    <p className="text-xl text-[#242424]">
                        Welcome back! Please enter your detail
                    </p>
                </article>
                <article className="flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                        <div className="h-[1px] w-full bg-[#24242433]"></div>
                        <p className="text-sm text-[#242424]">Or</p>
                        <div className="h-[1px] w-full bg-[#24242433]"></div>
                    </div>
                    <div className="flex flex-row gap-7 items-center justify-center">
                        <Link href="#">
                            <GoogleLogin />
                        </Link>
                        <Link href="#">
                            <FacebookLogin />
                        </Link>
                        <Link href="#">
                            <AppleLogin />
                        </Link>
                        <Link href="#">
                            <MicrosoftLogin />
                        </Link>
                    </div>
                    <p className="text-sm text-[#242424] text-center">
                        Don’t have an account?{' '}
                        <Link className="font-semibold" href="/sign-up">
                            Sign Up
                        </Link>
                    </p>
                </article>
            </section>
        </div>
    );
};
