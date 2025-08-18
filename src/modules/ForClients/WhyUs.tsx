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
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-0 mt-[120px]">
            <article className="flex flex-col lg:flex-row min-h-[620px] rounded-[10px] overflow-hidden">
                <section className="w-full lg:w-1/2 bg-[#CFEDD9] p-12 flex flex-col justify-between">
                    <div>
                        <p>Why Us?</p>
                        <h1 className="text-[32px] lg:text-[48px] leading-[48px] mt-3">
                            Why Us? Why clients love ConnectBuildHub
                        </h1>
                    </div>
                    <ul className="text-[16px] lg:text-[24px] space-y-4 pt-3 md:pt-3 lg:pt-0">
                        {points.map((point, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <CursiveArrowRightIcon className="h-[14px] lg:h-[18px] w-auto" />

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
                            className="!bg-[#003BFF] !rounded-none !h-[58px] !px-6 !py-3 !w-full lg:!w-[209px] justify-between !text-[20px] !font-[400] mt-3 md:mt-3 lg:mt-0"
                            aria-label="Post a Job"
                        >
                            Post a Job
                        </Button>
                    </Link>
                </section>

                <section
                    className="w-full lg:w-1/2 bg-cover bg-center min-h-[500px]"
                    style={{ backgroundImage: "url('/images/whyUs.png')" }}
                ></section>
            </article>
        </div>
    );
};
