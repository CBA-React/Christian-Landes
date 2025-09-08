import { JSX } from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import HomeIcon from 'public/icons/house-outline.svg';
import ToolIcon from 'public/icons/tabler_tool.svg';

export default function SignUp(): JSX.Element {
	return (
		<main
			className="flex justify-end bg-cover sm:h-[490px] md:h-[890px]"
			style={{
				backgroundImage: "url('/images/login-hero.png')",
			}}
		>
			<div className="mx-5 mt-[110px] mb-[56px] flex w-full max-w-[1240px] justify-end md:mt-[192px] xl:mx-auto">
				<section className="flex h-max w-full max-w-[578px] flex-col gap-5 rounded-[20px] bg-[#ffffffbf] px-6 py-10 backdrop-blur-[20px] md:p-16">
					<div className="flex flex-col gap-2 text-[#242424] md:gap-4">
						<h1 className="font-chalet-1960 text-[48px] leading-[58px] font-medium text-[#242424] md:text-[84px] md:leading-[100%]">
							Sign Up
						</h1>
						<p className="text-base text-[#242424] md:text-xl">
							Choose your role to get started:
							<br />
							Homeowner – post your project and find trusted
							contractors. Contractor – browse available jobs and
							connect with homeowners.
						</p>
					</div>
					<nav
						className="flex flex-col gap-3 sm:flex-row sm:gap-4"
						aria-label="Choose role"
					>
						<Link
							href="/sign-up/homeowner"
							className="w-full justify-center"
						>
							<Button
								type="button"
								variant="solid"
								color="primary"
								icon={<HomeIcon />}
								iconPosition="left"
								className="font-chalet-1960 !h-[44px] !w-full justify-center !bg-[#003BFF] !px-6 !py-3"
								aria-label="Sign up as Homeowner"
							>
								I’m Homeowner
							</Button>
						</Link>
						<Link
							href="/sign-up/contractor"
							className="w-full justify-center"
						>
							<Button
								type="button"
								variant="outline"
								color="primary"
								icon={<ToolIcon />}
								iconPosition="left"
								className="font-chalet-1960 !h-[44px] !w-full justify-center !border-[#003BFF] !px-6 !py-3 !text-[#003BFF]"
								aria-label="Sign up as Contractor"
							>
								I’m Contractor
							</Button>
						</Link>
					</nav>
				</section>
			</div>
		</main>
	);
}
