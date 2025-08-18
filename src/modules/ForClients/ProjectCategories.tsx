'use client';

import React, { JSX } from 'react';
import Link from 'next/link';

import { ProjectCategoriesSlider } from '@/modules/ForContractors/ProjectCategoriesSlider';
import { Button } from '@/shared/components/Button/Button';
import { CategoryItem } from '@/shared/components/CategoryItem/CategoryItem';

import ArrowRightIcon from '../../../public/icons/arrow-up-right-white-big.svg';

const servicesData = [
    {
        id: 1,
        name: 'Handyperson',
    },
    {
        id: 2,
        name: 'Landscaping',
    },
    {
        id: 3,
        name: 'Plumbing',
    },
    {
        id: 4,
        name: 'Remodeling',
    },
    {
        id: 5,
        name: 'Electrical',
    },
    {
        id: 6,
        name: 'Painting',
    },
    {
        id: 7,
        name: 'Window',
    },
    {
        id: 8,
        name: 'Cleaning',
    },
    {
        id: 9,
        name: 'Concrete',
    },
];

export const ProjectCategories = (): JSX.Element => {
    return (
        <article className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-0">
            <div className={'hidden md:block lg:block'}>
                <div
                    className={
                        'flex mt-[56px] lg:mt-[120px] items-center justify-between'
                    }
                >
                    <h1 className={'text-[32px] lg:text-[48px] '}>
                        Popular Projects Categories
                    </h1>
                    <Link href={'#'}>
                        <Button
                            type="button"
                            variant="solid"
                            color="primary"
                            icon={<ArrowRightIcon aria-hidden="true" />}
                            iconPosition="right"
                            className="!bg-[#003BFF] !rounded-none !h-[58px] !px-6 !py-3 w-full md:!w-[209px] lg:!w-[209px] justify-between !text-[20px] !font-[400]"
                            aria-label={'Post a Job'}
                        >
                            Post a Job
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-[40px]">
                    {servicesData.map((category) => {
                        return (
                            <CategoryItem
                                name={category.name}
                                id={category.id}
                                key={category.id}
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
                        className="!bg-[#003BFF] !rounded-none !h-[58px] !px-6 !py-3 !w-[100%] justify-between !text-[20px] !font-[400] mt-6"
                        aria-label={'Post a Job'}
                    >
                        Post a Job
                    </Button>
                </Link>
            </div>
        </article>
    );
};
