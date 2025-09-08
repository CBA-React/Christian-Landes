import { JSX } from 'react';

import { SignUp } from '@/modules/auth/components/SignUp/SignUp';

export default function Homeowner(): JSX.Element {
	return (
		<main
			className="flex h-[100%] justify-end bg-cover"
			style={{
				backgroundImage: "url('/images/sign-up-hero.png')",
			}}
		>
			<div className="mx-5 mt-[110px] mb-[56px] flex w-full max-w-[1240px] justify-end md:mt-[161px] md:mb-[122px] xl:mx-auto">
				<section className="h-fit w-full max-w-[578px] rounded-[20px] bg-[#ffffffbf] px-6 py-10 backdrop-blur-[20px] md:p-16">
					<article className="flex flex-col gap-4">
						<h1 className="font-chalet-1960 text-[48px] leading-[58px] font-medium text-[#242424] md:text-[84px] md:leading-[100%]">
							Sign Up
						</h1>
						<p className="text-base text-[#242424] md:text-xl">
							Create an account to post projects and find
							contractors
						</p>
					</article>
					<article className="mt-5 md:mt-6">
						<SignUp />
					</article>
				</section>
			</div>
		</main>
	);
}
