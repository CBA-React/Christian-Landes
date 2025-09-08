import React, { JSX, ReactNode } from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import ArrowRightIcon from 'public/icons/arrow-up-right-white-big.svg';

interface BannerProps {
	title: string;
	description: string;
	buttonText: string;
	buttonLink: string;
	buttonIcon?: ReactNode;
}

export const DescriptionBanner = ({
	title,
	description,
	buttonText,
	buttonLink,
	buttonIcon = <ArrowRightIcon aria-hidden="true" />,
}: BannerProps): JSX.Element => {
	return (
		<article
			className={
				'light-background h-[522px] w-full bg-[#F1F3F6] lg:h-[700px]'
			}
		>
			<section className="flex h-[522px] flex-col items-center justify-center px-4 text-center md:h-full md:px-6 lg:px-0">
				<h1 className="mt-[50px] max-w-[755px] text-[48px] leading-[48px] md:mt-0 md:leading-[64px] lg:text-[64px]">
					{title}
				</h1>
				<p className="mt-[12px] mb-[22px] max-w-[449px] leading-[150%] md:mt-[20px] md:mb-[28px]">
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
							className="!h-[58px] w-full justify-between !rounded-none !bg-[#003BFF] !px-6 !py-3 !text-[20px] !font-[400] md:!w-[209px] lg:!w-[209px]"
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

