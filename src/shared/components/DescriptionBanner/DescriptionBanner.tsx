import React, { JSX, ReactNode } from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import ArrowRightIcon from 'public/icons/arrow-up-right-white-big.svg';

interface BannerProps {
	title: string | ReactNode;
	description: string;
	buttonText: string;
	buttonLink: string;
	buttonIcon?: ReactNode;
	isButtonShown?: boolean;
	titleStyles?: string;
	sectionStyles?: string;
	descriptionStyles?: string;
}

export const DescriptionBanner = ({
	title,
	description,
	buttonText,
	buttonLink,
	buttonIcon = <ArrowRightIcon aria-hidden="true" />,
	isButtonShown = true,
	titleStyles,
	sectionStyles,
	descriptionStyles,
}: BannerProps): JSX.Element => {
	return (
		<article className={'light-background h-full w-full bg-[#F1F3F6]'}>
			<section
				className={`font-chalet-1960 flex h-full flex-col items-center justify-start px-5 pt-28 text-center sm:justify-center sm:pt-0 md:px-6 lg:px-0 ${sectionStyles}`}
			>
				<h1
					className={`max-w-[811px] ${titleStyles} text-[48px] leading-[48px] font-medium lg:text-[64px] lg:leading-[64px]`}
				>
					{title}
				</h1>
				<p
					className={`mt-[12px] mb-[22px] ${descriptionStyles} leading-[155%] md:mt-[20px] md:mb-[28px]`}
				>
					{description}
				</p>
				{isButtonShown && (
					<div className="w-full sm:w-auto lg:w-auto">
						<Link href={buttonLink}>
							<Button
								type="button"
								variant="solid"
								color="primary"
								icon={buttonIcon}
								iconPosition="right"
								className="!h-[58px] w-full justify-between !rounded-none !bg-[#003BFF] !px-6 !py-3 !text-[20px] !font-[400] sm:!w-[209px] lg:!w-[209px]"
								aria-label={buttonText}
							>
								{buttonText}
							</Button>
						</Link>
					</div>
				)}
			</section>
		</article>
	);
};
