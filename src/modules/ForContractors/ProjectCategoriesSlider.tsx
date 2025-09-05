'use client';

import { CategoryItem } from '@/shared/components/CategoryItem/CategoryItem';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import ArrowLeftHorizontal from 'public/icons/arrow-left-horizontal.svg';
import ArrowRightHorizontal from 'public/icons/arrow-right-horizontal.svg';

const categories = [
	{ id: 1, name: 'Handyperson', icon: '🏠' },
	{ id: 2, name: 'Landscaping', icon: '🌲' },
	{ id: 3, name: 'Plumbing', icon: '🔧' },
	{ id: 4, name: 'Remodeling', icon: '🏗️' },
	{ id: 5, name: 'Electrical', icon: '⚡' },
	{ id: 6, name: 'Painting', icon: '🎨' },
	{ id: 7, name: 'Cleaning', icon: '🧽' },
	{ id: 8, name: 'Moving', icon: '📦' },
];

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
		<div className="mt-[60px]">
			<h2 className="mb-6 text-[36px] leading-12">Popular Projects Categories</h2>

			<div className="embla overflow-hidden" ref={emblaRef}>
				<div className="embla__container flex gap-4">
					{categories.map((category) => (
						<div
							key={category.id}
							className="embla__slide w-[80vw] flex-none"
						>
							<CategoryItem
								name={category.name}
								id={category.id}
							/>
						</div>
					))}
				</div>
			</div>

			<div className="mt-6 flex gap-2">
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
