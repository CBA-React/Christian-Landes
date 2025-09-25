'use client';

import React, { JSX } from 'react';
import Link from 'next/link';

import { ProjectCategoriesSlider } from '@/modules/ForContractors/ProjectCategoriesSlider';
import { Button } from '@/shared/components/Button/Button';
import { CategoryItem } from '@/shared/components/CategoryItem/CategoryItem';
import { categoriesData } from '@/shared/constants/categories';

import ArrowRightIcon from '@/public/icons/arrow-up-right-white-big.svg';

export const ProjectCategories = (): JSX.Element => {
	return (
		<article className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-0">
			<div className={'hidden md:block lg:block'}>
				<div
					className={
						'mt-[56px] flex items-center justify-between lg:mt-[120px]'
					}
				>
					<h1
						className={
							'text-[32px] leading-16 font-medium lg:text-[48px]'
						}
					>
						Popular Projects <br /> Categories
					</h1>
					<Link href={'#'}>
						<Button
							type="button"
							variant="solid"
							color="primary"
							icon={<ArrowRightIcon aria-hidden="true" />}
							iconPosition="right"
							className="!h-[58px] w-full justify-between !rounded-none !bg-[#003BFF] !px-6 !py-3 !text-[20px] !font-[400] md:!w-[209px] lg:!w-[209px]"
							aria-label={'Post a Job'}
						>
							Post a Job
						</Button>
					</Link>
				</div>
				<div className="mt-[40px] flex flex-wrap justify-center gap-4">
					{categoriesData.map((category) => {
						return (
							<CategoryItem
								name={category.name}
								id={category.id}
								key={category.id}
								icon={category.icon}
							/>
						);
					})}
				</div>
			</div>
			<div className={'block md:hidden lg:hidden'}>
				<ProjectCategoriesSlider />
				<Link href={'#'}>
					<Button
						type="button"
						variant="solid"
						color="primary"
						icon={<ArrowRightIcon aria-hidden="true" />}
						iconPosition="right"
						className="mt-6 !h-[58px] !w-[100%] justify-between !rounded-none !bg-[#003BFF] !px-6 !py-3 !text-[20px] !font-[400]"
						aria-label={'Post a Job'}
					>
						Post a Job
					</Button>
				</Link>
			</div>
		</article>
	);
};

