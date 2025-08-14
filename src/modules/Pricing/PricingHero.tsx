import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import ArrowRightIcon from '../../../public/icons/arrow-up-right-white-big.svg';

export const PricingHero: React.FC = () => {
    return (
        <section className="bg-[#F1F3F6]  justify-center py-[208px] text-center w-full">
            <div className="max-w-[1240px] mx-auto w-full flex flex-col items-center">
                <h1 className="text-[#242424] font-[500] text-[64px] mb-5 leading-[64px]">
                    Simple pricing for serious <br /> contractors
                </h1>
                <p className="text-[#242424] font-[400] text-[16px] mb-[28px]">
                    Choose a plan that fits your business — no hidden fees.
                </p>
                <Link href="#">
                    <Button
                        type="button"
                        variant="solid"
                        color="primary"
                        icon={<ArrowRightIcon aria-hidden="true" />}
                        iconPosition="right"
                        className="!bg-[#003BFF] !rounded-none !h-[58px] !px-6 !py-3 !w-[209px] justify-between !text-[20px] !font-[400]"
                        aria-label="Get Started"
                    >
                        Get Started
                    </Button>
                </Link>
            </div>
        </section>
    );
};
