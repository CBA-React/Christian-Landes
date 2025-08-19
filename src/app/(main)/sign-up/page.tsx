import { JSX } from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import HomeIcon from 'public/icons/house-outline.svg';
import ToolIcon from 'public/icons/tabler_tool.svg';

export default function SignUp(): JSX.Element {
	return (
		<main
			className="flex h-[890px] justify-end bg-cover"
			style={{
				backgroundImage: "url('/images/login-hero.png')",
			}}
		>
			<div className="mx-auto mt-[192px] flex w-full max-w-[1240px] justify-end">
				<section className="flex h-max w-[578px] flex-col gap-5 rounded-[20px] bg-[#FFFFFF] p-16">
					<div className="flex flex-col gap-4 text-[#242424]">
						<h1 className="text-[84px] font-[500]">Sign Up</h1>
						<p className="text-[20px] font-[400]">
							Choose your role to get started:
							<br />
							Homeowner – post your project and find trusted
							contractors. Contractor – browse available jobs and
							connect with homeowners.
						</p>
					</div>
					<nav className="mt-6 flex gap-4" aria-label="Choose role">
						<Link
							href="/sign-up/next-step"
							className="w-full justify-center"
						>
							<Button
								type="button"
								variant="solid"
								color="primary"
								icon={<HomeIcon />}
								iconPosition="left"
								className="!h-[44px] !w-full justify-center !bg-[#003BFF] !px-6 !py-3"
								aria-label="Sign up as Homeowner"
							>
								I’m Homeowner
							</Button>
						</Link>
						<Link
							href="/sign-up/next-step"
							className="w-full justify-center"
						>
							<Button
								type="button"
								variant="outline"
								color="primary"
								icon={<ToolIcon />}
								iconPosition="left"
								className="!h-[44px] !w-full justify-center !border-[#003BFF] !px-6 !py-3 !text-[#003BFF]"
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
