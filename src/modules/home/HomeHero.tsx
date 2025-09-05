import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import ArrowRightIcon from 'public/icons/arrow-up-right-white-big.svg';

export const HomeHero: React.FC = () => {
	return (
		<section
			className="bg-size-[200% auto] flex h-[659px] flex-col gap-[16] bg-[left_560px_bottom_156px] px-[20px] md:h-[800px] md:justify-between md:gap-[0] md:bg-cover md:bg-[left_0px_bottom_0px] md:px-0"
			style={{
				backgroundImage: "url('/icons/home-hero.svg')",
			}}
			aria-label="Hero section with call to action"
		>
			<div className="mt-[120px] flex w-full max-w-[1240px] md:m-auto md:mt-[30px] md:flex-1 md:items-center">
				<div className="flex flex-col items-start gap-[10] text-white md:gap-[3]">
					<h1 className="text-[67px] leading-[69px] font-[400] tracking-[-1px] md:text-[72px] md:leading-none md:font-[500]">
						Find a contractor.
						<br />
						Fast. Local.
						<br />
						No calls.
					</h1>
					<p className="text-[20px] font-[400] md:w-[460px] md:text-[24px]">
						Post a request, get offers from local pros,{' '}
						<strong>choose the best one.</strong>
					</p>
				</div>
			</div>
			<div className="absolute top-[490px] left-0 h-[170px] w-[375px] bg-[#415969] md:hidden"></div>
			<div className="z-2 flex flex-col justify-center gap-[6] md:flex-row md:gap-[0]">
				<Link href="#">
					<Button
						type="button"
						variant="solid"
						color="primary"
						icon={<ArrowRightIcon aria-hidden="true" />}
						iconPosition="right"
						className="!h-[58px] w-[100%] justify-between !rounded-none !bg-[#003BFF] !px-6 !py-3 !text-[20px] !font-[400] md:w-[272px]"
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
						className="!h-[58px] w-[100%] justify-between !rounded-none !bg-[#242424] !px-6 !py-3 !text-[20px] !font-[400] md:w-[272px]"
						aria-label="Join as Contractor"
					>
						Join as Contractor
					</Button>
				</Link>
			</div>
		</section>
	);
};

