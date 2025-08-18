import { JSX } from 'react';
import Link from 'next/link';

import { MAIN_NAVIGATION } from '@/shared/constants/navigation';

import { NewsletterForm } from './NewsletterForm';

import FacebookLogo from 'public/icons/facebook-logo.svg';
import InstgramLogo from 'public/icons/instagram-logo.svg';
import TwitterLogo from 'public/icons/twitter-logo.svg';
import LogoWhite from 'public/logo-white-footer.svg';

export const Footer = (): JSX.Element => {
    return (
        <footer className="w-full bg-[#003BFF] text-white pt-[40px] lg:pt-[100px]">
            <div className="max-w-[1240px] pb-20 mx-auto">
                <section className="mx-auto flex justify-between flex-col lg:flex-row items-center lg:items-start">
                    <article className="w-[350px] flex flex-col gap-[27px]">
                        <div className={'flex justify-center lg:justify-start'}>
                            <LogoWhite />
                        </div>
                        <div className="flex space-x-3 items-center justify-center lg:justify-start">
                            <p className="text-base">Follow our socials</p>
                            <div className="h-[21px] w-[1px] bg-[#FFFFFF40]"></div>
                            <div className="flex items-center space-x-4">
                                <Link href="#">
                                    <InstgramLogo />
                                </Link>
                                <Link href="#">
                                    <FacebookLogo />
                                </Link>
                                <Link href="#">
                                    <TwitterLogo />
                                </Link>
                            </div>
                        </div>
                        <NewsletterForm />
                    </article>
                    <section className="flex gap-20 pt-6 px-3 md:px-6 lg:px-0 lg:pt-0 flex-wrap justify-center">
                        <article>
                            <h4 className="mb-3 text-2xl">Website</h4>
                            <ul className="space-y-1">
                                {MAIN_NAVIGATION.map((item) => (
                                    <li key={item.route}>
                                        <Link
                                            className="text-base"
                                            href={item.route}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </article>
                        <article>
                            <h4 className="mb-3 text-2xl">Privacy</h4>
                            <ul className="space-y-1">
                                <li>
                                    <Link className="text-base" href="#">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-base" href="#">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </article>
                        <article>
                            <h4 className="mb-3 text-2xl">Contacts</h4>
                            <p className="text-base mb-1">
                                info@theloremiipsum
                            </p>
                            <p className="text-base">(718) 309-3000</p>
                        </article>
                    </section>
                </section>
            </div>
            <div className="w-full flex items-center bg-[#242424] h-[45px]">
                <p className="max-w-[1240px] mx-auto w-full">
                    Copyright ©2025
                </p>
            </div>
        </footer>
    );
};
