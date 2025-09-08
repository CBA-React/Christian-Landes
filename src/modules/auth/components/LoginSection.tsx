import { JSX } from 'react';
import Link from 'next/link';

import { LoginForm } from './LoginForm';

import FacebookLogin from 'public/icons/facebook-login.svg';
import GoogleLogin from 'public/icons/google-login.svg';

export const LoginSection = (): JSX.Element => {
	return (
		<div className="mx-5 mt-[110px] mb-[56px] flex w-full max-w-[1240px] justify-end md:mt-[161px] md:mb-[122px] xl:mx-auto">
			<section className="w-full max-w-[578px] rounded-[20px] bg-[#ffffffbf] px-6 py-10 backdrop-blur-[20px] md:p-16">
				<article className="flex flex-col gap-2 md:gap-4">
					<h1 className="font-chalet-1960 text-[48px] leading-[58px] font-medium text-[#242424] md:text-[84px] md:leading-[100%]">
						Log In
					</h1>
					<p className="text-base text-[#242424] md:text-xl">
						Welcome back!
						<br className="block sm:hidden" /> Please enter your
						detail
					</p>
				</article>
				<LoginForm />
				<article className="flex flex-col gap-5">
					<div className="flex items-center gap-5">
						<div className="h-[1px] w-full bg-[#24242433]"></div>
						<p className="text-sm text-[#242424]">Or</p>
						<div className="h-[1px] w-full bg-[#24242433]"></div>
					</div>
					<div className="flex flex-row items-center justify-center gap-7">
						<Link href="#">
							<GoogleLogin />
						</Link>
						<Link href="#">
							<FacebookLogin />
						</Link>
					</div>
					<p className="text-center text-sm text-[#242424]">
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
