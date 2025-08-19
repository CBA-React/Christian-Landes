import { JSX } from 'react';

import { SignUp } from '@/modules/auth/components/SignUp/SignUp';

export default function NextStep(): JSX.Element {
	return (
		<main
			className="flex h-[100%] justify-end bg-cover"
			style={{
				backgroundImage: "url('/images/login-hero.png')",
			}}
		>
			<div className="mx-auto mt-[161px] mb-[122px] flex w-full max-w-[1240px] justify-end px-4">
				<section className="h-fit w-full max-w-[578px] rounded-[20px] bg-[#FFFFFFD9] p-16 backdrop-blur-[20px]">
					<article className="flex flex-col gap-4">
						<h1 className="text-[84px] leading-[84px] font-medium text-[#242424]">
							Sign Up
						</h1>
						<p className="text-[20px]">
							Create an account to post projects and find
							contractors
						</p>
					</article>
					<article className="mt-6">
						<SignUp />
					</article>
				</section>
			</div>
		</main>
	);
}
