'use client';

import { CategoryItem } from '@/shared/components/CategoryItem/CategoryItem';
import { categoriesData } from '@/shared/constants/categories';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import ArrowLeftHorizontal from 'public/icons/arrow-left-horizontal.svg';
import ArrowRightHorizontal from 'public/icons/arrow-right-horizontal.svg';

export const ProjectCategoriesSlider = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		dragFree: true,
	});

	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const updateScrollButtons = useCallback(() => {
		if (!emblaApi) return;
		setCanScrollPrev(emblaApi.canScrollPrev());
		setCanScrollNext(emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		updateScrollButtons();
		emblaApi.on('select', updateScrollButtons);
	}, [emblaApi, updateScrollButtons]);

	return (
		<div className="mx-[20px] mt-[60px] xl:mx-0 xl:mt-[130px] xl:ml-[100px]">
			<div className="mb-4 flex justify-between lg:mb-12">
				<h2 className="text-[36px] leading-11 lg:w-[400px] lg:text-[48px] lg:leading-12">
					Popular Projects Categories
				</h2>
				<div className="mr-25 hidden gap-2 self-end lg:flex">
					<button
						onClick={scrollPrev}
						disabled={!canScrollPrev}
						className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
							canScrollPrev
								? 'bg-gray-900 text-white hover:bg-gray-600'
								: 'cursor-not-allowed bg-gray-700 text-gray-600'
						}`}
					>
						<ArrowLeftHorizontal />
					</button>
					<button
						onClick={scrollNext}
						disabled={!canScrollNext}
						className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
							canScrollNext
								? 'bg-gray-900 text-white hover:bg-gray-600'
								: 'cursor-not-allowed bg-gray-700 text-gray-600'
						}`}
					>
						<ArrowRightHorizontal />
					</button>
				</div>
			</div>

			<div className="embla_categories overflow-hidden" ref={emblaRef}>
				<div className="embla__container flex gap-4">
					{categoriesData.map((category) => (
						<div
							key={category.id}
							className="embla__slide h-[128px] w-[300px] !flex-none lg:h-[157px] lg:w-[400px]"
						>
							<CategoryItem
								name={category.name}
								id={category.id}
								icon={category.icon}
							/>
						</div>
					))}
				</div>
			</div>

			<div className="mt-6 flex gap-2 lg:hidden">
				<button
					onClick={scrollPrev}
					disabled={!canScrollPrev}
					className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
						canScrollPrev
							? 'bg-gray-900 text-white hover:bg-gray-600'
							: 'cursor-not-allowed bg-gray-700 text-gray-600'
					}`}
				>
					<ArrowLeftHorizontal />
				</button>
				<button
					onClick={scrollNext}
					disabled={!canScrollNext}
					className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
						canScrollNext
							? 'bg-gray-900 text-white hover:bg-gray-600'
							: 'cursor-not-allowed bg-gray-700 text-gray-600'
					}`}
				>
					<ArrowRightHorizontal />
				</button>
			</div>
		</div>
	);
};

