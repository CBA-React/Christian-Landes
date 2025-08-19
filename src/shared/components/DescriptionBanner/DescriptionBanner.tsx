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
			className="light-background w-full bg-[#F1F3F6]"
			style={{ height }}
		>
			<section className="flex h-full flex-col items-center justify-center px-4 text-center md:px-6 lg:px-0">
				<h1 className="max-w-[755px] text-[48px] leading-[64px] lg:text-[64px]">
					{title}
				</h1>
				<p className="mt-[20px] mb-[28px] max-w-[453px] leading-[150%]">
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
