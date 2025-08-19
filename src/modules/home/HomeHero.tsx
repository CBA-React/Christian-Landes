import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import ArrowRightIcon from 'public/icons/arrow-up-right-white-big.svg';

export const HomeHero: React.FC = () => {
	return (
		<section
			className="flex h-[890px] flex-col justify-between bg-cover"
			style={{
				backgroundImage: "url('/icons/home-hero.svg')",
			}}
			aria-label="Hero section with call to action"
		>
			<div className="m-auto flex w-full max-w-[1240px] flex-1 items-center">
				<div className="flex flex-col items-start gap-3 text-white">
					<h1 className="text-[72px] leading-none font-[500] tracking-[-1px]">
						Find a contractor.
						<br />
						Fast. Local.
						<br />
						No calls.
					</h1>
					<p className="text-[24px] font-[400]">
						Post a request, get offers from local pros,
						<br />
						<strong>choose the best one.</strong>
					</p>
				</div>
			</div>
			<div className="flex justify-center">
				<Link href="#">
					<Button
						type="button"
						variant="solid"
						color="primary"
						icon={<ArrowRightIcon aria-hidden="true" />}
						iconPosition="right"
						className="!h-[58px] !w-[272px] justify-between !rounded-none !bg-[#003BFF] !px-6 !py-3 !text-[20px] !font-[400]"
						aria-label="Post a Project"
					>
						Post a Project
					</Button>
				</Link>
				<Link href="#">
					<Button
						type="button"
						variant="solid"
						color="dark"
						icon={<ArrowRightIcon aria-hidden="true" />}
						iconPosition="right"
						className="!h-[58px] !w-[272px] justify-between !rounded-none !bg-[#242424] !px-6 !py-3 !text-[20px] !font-[400]"
						aria-label="Join as Contractor"
					>
						Join as Contractor
					</Button>
				</Link>
			</div>
		</section>
	);
};
