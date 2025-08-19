import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import ArrowRightIcon from '../../../public/icons/arrow-up-right-white-big.svg';

export const PricingHero: React.FC = () => {
	return (
		<section className="w-full justify-center bg-[#F1F3F6] py-[208px] text-center">
			<div className="mx-auto flex w-full max-w-[1240px] flex-col items-center">
				<h1 className="mb-5 text-[64px] leading-[64px] font-[500] text-[#242424]">
					Simple pricing for serious <br /> contractors
				</h1>
				<p className="mb-[28px] text-[16px] font-[400] text-[#242424]">
					Choose a plan that fits your business — no hidden fees.
				</p>
				<Link href="#">
					<Button
						type="button"
						variant="solid"
						color="primary"
						icon={<ArrowRightIcon aria-hidden="true" />}
						iconPosition="right"
						className="!h-[58px] !w-[209px] justify-between !rounded-none !bg-[#003BFF] !px-6 !py-3 !text-[20px] !font-[400]"
						aria-label="Get Started"
					>
						Get Started
					</Button>
				</Link>
			</div>
		</section>
	);
};
