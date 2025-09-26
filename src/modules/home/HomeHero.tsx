'use client';
import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';
import { useAppSelector } from '@/shared/hooks/useStore';

import ArrowRightIcon from 'public/icons/arrow-up-right-white-big.svg';

export const HomeHero: React.FC = () => {
	const token = useAppSelector((s) => s.auth.token);
	const isAuthenticated = !!token;

	const targetUrl = isAuthenticated ? '/profile' : '/login';

	return (
		<section
			className="bg-size-[200% auto] flex h-[659px] flex-col gap-4 overflow-hidden bg-no-repeat md:h-[800px] md:justify-between md:gap-[0] md:bg-cover md:!bg-[position:0]"
			style={{
				backgroundImage: "url('/images/home-hero.png')",
				backgroundPositionX: '90%',
				backgroundPositionY: '200%',
			}}
			aria-label="Hero section with call to action"
		>
			<div className="mt-[109px] flex w-full max-w-[1240px] px-5 md:items-center lg:mt-[237px] xl:m-auto xl:p-0">
				<div className="flex flex-col items-start gap-3 text-white">
					<h1 className="font-chalet-1960 text-[67px] leading-[69px] font-[400] tracking-[-1px] md:text-[72px] md:leading-none md:font-[500]">
						Find a contractor.
						<br />
						Fast. Local.
						<br />
						No calls.
					</h1>
					<p className="w-full text-[20px] font-[400] md:w-[460px] md:text-[24px]">
						Post a request, get offers from local{' '}
						<br className="sm:hidden" /> pros,{' '}
						<label className="font-semibold">
							choose the best one.
						</label>
					</p>
				</div>
			</div>
			<div className="absolute top-[490px] left-0 h-[170px] w-full bg-[#415969] md:hidden"></div>
			<div className="z-2 mx-5 flex flex-col justify-center gap-[6] md:flex-row md:gap-[0] xl:mx-auto">
				<Link href={targetUrl}>
					<Button
						type="button"
						variant="solid"
						color="primary"
						icon={<ArrowRightIcon aria-hidden="true" />}
						iconPosition="right"
						className="!h-[58px] w-[100%] justify-between !rounded-none !bg-[#003BFF] !px-6 !py-4 !text-[20px] !font-[400] md:w-[272px]"
						aria-label="Post a Project"
					>
						Post a Project
					</Button>
				</Link>
				<Link href={targetUrl}>
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
