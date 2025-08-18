import React, { JSX, ReactNode } from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import ArrowRightIcon from 'public/icons/arrow-up-right-white-big.svg';

interface BannerProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    height?: string;
    buttonIcon?: ReactNode;
}

export const DescriptionBanner = ({
    title,
    description,
    buttonText,
    buttonLink,
    height = '700px',
    buttonIcon = <ArrowRightIcon aria-hidden="true" />,
}: BannerProps): JSX.Element => {
    return (
        <article
            className="bg-[#F1F3F6] w-full light-background"
            style={{ height }}
        >
            <section className="flex flex-col items-center justify-center h-full text-center px-4 md:px-6 lg:px-0">
                <h1 className="text-[48px] lg:text-[64px] max-w-[755px] leading-[64px]">
                    {title}
                </h1>
                <p className="mt-[20px] max-w-[453px] leading-[150%] mb-[28px]">
                    {description}
                </p>

                <div className="w-full md:w-auto lg:w-auto">
                    <Link href={buttonLink}>
                        <Button
                            type="button"
                            variant="solid"
                            color="primary"
                            icon={buttonIcon}
                            iconPosition="right"
                            className="!bg-[#003BFF] !rounded-none !h-[58px] !px-6 !py-3 w-full md:!w-[209px] lg:!w-[209px] justify-between !text-[20px] !font-[400]"
                            aria-label={buttonText}
                        >
                            {buttonText}
                        </Button>
                    </Link>
                </div>
            </section>
        </article>
    );
};
