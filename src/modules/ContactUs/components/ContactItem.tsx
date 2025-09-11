'use client';

import React, { JSX, ReactNode } from 'react';

import { Button } from '@/shared/components/Button/Button';

interface Props {
	icon: ReactNode;
	title: string;
	contact: string;
	buttonLabel: string;
}

export const ContactItem = ({
	icon,
	title,
	contact,
	buttonLabel,
}: Props): JSX.Element => {
	return (
		<li className="embla__slide h-[194px] rounded-[10px] border-1 border-[#000] p-5 md:h-[223px] lg:border-[rgba(0,0,0,0.3)] lg:p-6">
			{icon}
			<p className="mb-[1px] text-[20px] lg:mb-3">{title}</p>
			<p className="mb-[19px] text-[16px] lg:mb-5">{contact}</p>
			<Button
				type="button"
				variant="solid"
				color="primary"
				aria-label={buttonLabel}
				className="!h-[43px] w-full justify-center text-[16px] !font-[400]"
			>
				{buttonLabel}
			</Button>
		</li>
	);
};

