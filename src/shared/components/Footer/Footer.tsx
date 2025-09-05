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
		<footer className="w-full bg-[#003BFF] pt-[40px] text-white lg:pt-[100px]">
			<div className="mx-auto max-w-[1240px] pb-20">
				<section className="mx-auto flex flex-col items-center justify-between lg:flex-row lg:items-start">
					<article className="flex w-[350px] flex-col gap-[27px]">
						<div className={'flex justify-center lg:justify-start'}>
							<LogoWhite />
						</div>
						<div className="flex items-center justify-center space-x-3 lg:justify-start">
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
					<section className="grid grid-cols-1 gap-4 px-3 pt-6 md:flex md:flex-wrap md:justify-center md:gap-20 md:px-6 lg:px-0 lg:pt-0">
						<div className="grid grid-cols-2 gap-20 md:contents">
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
										<Link
											className="text-base"
											href="/terms-service"
										>
											Terms of Service
										</Link>
									</li>
									<li>
										<Link
											className="text-base"
											href="/privacy-policy"
										>
											Privacy Policy
										</Link>
									</li>
								</ul>
							</article>
						</div>
						<article className="mt-4 md:mt-0">
							<h4 className="mb-3 text-2xl">Contacts</h4>
							<p className="mb-1 text-base">
								info@theloremiipsum
							</p>
							<p className="text-base">(718) 309-3000</p>
						</article>
					</section>
				</section>
			</div>
			<div className="flex h-[45px] w-full items-center bg-[#242424]">
				<p className="mx-auto w-full max-w-[1240px]">
					Copyright ©2025
				</p>
			</div>
		</footer>
	);
};
