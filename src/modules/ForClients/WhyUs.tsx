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
		<div className="mx-auto mt-[120px] max-w-[1240px] px-4 sm:px-6 lg:px-0">
			<article className="flex min-h-[620px] flex-col overflow-hidden rounded-[10px] lg:flex-row">
				<section className="flex w-full flex-col justify-between bg-[#CFEDD9] p-12 lg:w-1/2">
					<div>
						<p>Why Us?</p>
						<h1 className="mt-3 text-[32px] leading-[48px] lg:text-[48px]">
							Why Us? Why clients love ConnectBuildHub
						</h1>
					</div>
					<ul className="space-y-4 pt-3 text-[16px] md:pt-3 lg:pt-0 lg:text-[24px]">
						{points.map((point, index) => (
							<li key={index} className="flex items-center gap-2">
								<CursiveArrowRightIcon className="h-[14px] w-auto lg:h-[18px]" />

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
							className="mt-3 !h-[58px] !w-full justify-between !rounded-none !bg-[#003BFF] !px-6 !py-3 !text-[20px] !font-[400] md:mt-3 lg:mt-0 lg:!w-[209px]"
							aria-label="Post a Job"
						>
							Post a Job
						</Button>
					</Link>
				</section>

				<section
					className="min-h-[500px] w-full bg-cover bg-center lg:w-1/2"
					style={{ backgroundImage: "url('/images/whyUs.png')" }}
				></section>
			</article>
		</div>
	);
};
