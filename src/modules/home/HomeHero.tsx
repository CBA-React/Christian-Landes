import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import ArrowRightIcon from 'public/icons/arrow-up-right-white-big.svg';

export const HomeHero: React.FC = () => {
    return (
        <section
            className="flex flex-col justify-between h-[890px] bg-cover"
            style={{
                backgroundImage: "url('/icons/home-hero.svg')",
            }}
            aria-label="Hero section with call to action"
        >
            <div className="max-w-[1240px] m-auto w-full flex-1 flex items-center">
                <div className="flex flex-col gap-3 items-start text-white">
                    <h1 className="text-[72px] font-[500] tracking-[-1px] leading-none">
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
                        className="!bg-[#003BFF] !rounded-none !h-[58px] !px-6 !py-3 !w-[272px] justify-between !text-[20px] !font-[400]"
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
                        className="!bg-[#242424] !rounded-none !h-[58px] !px-6 !py-3 !w-[272px] justify-between !text-[20px] !font-[400]"
                        aria-label="Join as Contractor"
                    >
                        Join as Contractor
                    </Button>
                </Link>
            </div>
        </section>
    );
};
