import React, { JSX } from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import ArrowRightIcon from 'public/icons/arrow-up-right-white-big.svg';
import CursiveArrowRightIcon from 'public/icons/cursive-arrow-right.svg';

const points = [
	'Verified professionals in your area',
	'Real-time bidding = competitive prices',
	'No middlemen — direct communication',
	'Upload photos & track everything online',
	'Secure payments via Stripe',
];

export const WhyUs = (): JSX.Element => {
	return (
		<div className="mx-auto mt-[60px] max-w-[1240px] px-4 sm:px-6 lg:mt-[120px] lg:px-0">
			<article className="flex min-h-[620px] flex-col overflow-hidden rounded-[10px] lg:flex-row">
				<section className="flex w-full flex-col justify-between bg-[#CFEDD9] px-6 py-8 lg:w-1/2 lg:p-12">
					<div>
						<p>Why Us?</p>
						<h1 className="mt-3 text-[32px] leading-[38px] lg:text-[48px] lg:leading-[48px]">
							Why clients love ConnectBuildHub
						</h1>
					</div>
					<ul className="space-y-2 pt-3 text-[16px] lg:ml-4 lg:space-y-4 lg:pt-0 lg:text-[24px]">
						{points.map((point, index) => (
							<li
								key={index}
								className="flex items-baseline gap-2 leading-[20px] lg:items-center lg:leading-[38px]"
							>
								<CursiveArrowRightIcon className="h-[18px] w-[18px] flex-shrink-0 pt-1 lg:h-[24px] lg:w-[24px] lg:pt-0" />
								{point}
							</li>
						))}
					</ul>
					<Link href="#">
						<Button
							type="button"
							variant="solid"
							color="primary"
							icon={<ArrowRightIcon aria-hidden="true" />}
							iconPosition="right"
							className="mt-4 !h-[58px] !w-full justify-between !rounded-none !bg-[#003BFF] !px-6 !py-3 !text-[20px] !font-[400] md:mt-3 lg:mt-0 lg:!w-[209px]"
							aria-label="Post a Job"
						>
							Post a Job
						</Button>
					</Link>
				</section>
				<section
					className="min-h-[250px] w-full bg-cover bg-center lg:min-h-[647px] lg:w-1/2"
					style={{ backgroundImage: "url('/images/whyUs.webp')" }}
				></section>
			</article>
		</div>
	);
};

