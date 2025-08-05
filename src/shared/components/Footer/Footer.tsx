import { JSX } from 'react';
import Link from 'next/link';

import { MAIN_NAVIGATION } from '@/shared/constants/navigation';

import LogoWhite from 'public/logo-white.svg';

export const Footer = (): JSX.Element => {
    return (
        <footer className="w-full bg-blue-600 text-white pt-[100px]">
            <div className="max-w-[1240px] mx-auto">
                <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
                    <article className="flex flex-col gap-[27px]">
                        <LogoWhite />
                        <div className="flex space-x-3 items-center">
                            <p className="text-base">Follow our socials</p>
                            <div className="h-[21px] w-[1px] bg-[#FFFFFF40]"></div>
                            <div>
                                <Link href="#">
                                    <i className="fab fa-youtube" />
                                </Link>
                                <Link href="#">
                                    <i className="fab fa-twitter" />
                                </Link>
                                <Link href="#">
                                    <i className="fab fa-facebook" />
                                </Link>
                            </div>
                        </div>
                    </article>
                    <article>
                        <h4 className="font-semibold mb-3">Website</h4>
                        <ul className="space-y-2">
                            {MAIN_NAVIGATION.map((item) => (
                                <li key={item.route}>
                                    <Link href={item.route}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </article>
                    <article>
                        <h4 className="font-semibold mb-3">Privacy</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#">Terms of Service</Link>
                            </li>
                            <li>
                                <Link href="#">Privacy Policy</Link>
                            </li>
                        </ul>
                    </article>

                    {/* Contacts */}
                    <article>
                        <h4 className="font-semibold mb-3">Contacts</h4>
                        <p className="text-sm">info@theloremiipsum</p>
                        <p className="text-sm">(718) 309-3000</p>
                    </article>
                </section>
                <section className="max-w-2xl mx-auto px-4 mt-12">
                    <h4 className="text-lg font-semibold mb-4">
                        Sign up for our newsletter
                    </h4>
                    {/* <NewsletterForm /> */}
                </section>

                <p className="text-center text-sm mt-8 border-t border-white/30 pt-4">
                    Copyright ©2025
                </p>
            </div>
        </footer>
    );
};
