'use client';

import { JSX, useState, useRef, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
	PROJECT_CATEGORIES,
	ProjectCategory,
} from '../../../shared/constants/projectCategories';

import AllIcon from '../../../../public/icons/profile/project-categories/all.svg';
import FilterIcon from '../../../../public/icons/profile/project-categories/filters.svg';
import ChevronRightIcon from '../../../../public/icons/profile/project-categories/chevron-right-small.svg';
import ChevronLeft from '../../../../public/icons/profile/project-categories/chevron-left-small.svg';
import { ProjectsFilterMobile } from './ProjectsFilterMobile';

interface ProjectsFilterProps {
	selectedCategory: string | null;
	onCategoryChange: (category: string | null) => void;
	onFiltersClick?: () => void;
	className?: string;
}

export const ProjectsFilter = ({
	selectedCategory,
	onCategoryChange,
	onFiltersClick,
	className = '',
}: ProjectsFilterProps): JSX.Element => {
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		containScroll: 'trimSnaps',
		dragFree: true,
	});

	const [isMobile, setIsMobile] = useState(false);

	const SCROLL_AMOUNT = 200;
	const isAllSelected = selectedCategory === null;

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		const updateScrollButtons = () => {
			setCanScrollLeft(emblaApi.canScrollPrev());
			setCanScrollRight(emblaApi.canScrollNext());
		};

		emblaApi.on('select', updateScrollButtons);
		emblaApi.on('reInit', updateScrollButtons);
		updateScrollButtons();

		return () => {
			emblaApi.off('select', updateScrollButtons);
			emblaApi.off('reInit', updateScrollButtons);
		};
	}, [emblaApi]);

	const checkScrollability = useCallback(() => {
		if (!scrollContainerRef.current || isMobile) return;

		const { scrollLeft, scrollWidth, clientWidth } =
			scrollContainerRef.current;
		const maxScroll = scrollWidth - clientWidth;

		setCanScrollLeft(scrollLeft > 5);
		setCanScrollRight(scrollLeft < maxScroll - 5);
	}, [isMobile]);

	useEffect(() => {
		if (!isMobile) {
			checkScrollability();

			const handleResize = () => {
				setTimeout(checkScrollability, 10);
			};

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, [checkScrollability, isMobile]);

	const handleScroll = useCallback(
		(direction: 'left' | 'right') => {
			if (isMobile && emblaApi) {
				if (direction === 'left') {
					emblaApi.scrollPrev();
				} else {
					emblaApi.scrollNext();
				}
			} else if (!isMobile && scrollContainerRef.current) {
				const container = scrollContainerRef.current;
				const currentScroll = container.scrollLeft;
				const newPosition =
					direction === 'left'
						? Math.max(0, currentScroll - SCROLL_AMOUNT)
						: currentScroll + SCROLL_AMOUNT;

				container.scrollTo({
					left: newPosition,
					behavior: 'smooth',
				});

				setTimeout(checkScrollability, 350);
			}
		},
		[checkScrollability, emblaApi, isMobile],
	);

	const handleCategoryClick = useCallback(
		(categorySlug: string | null) => {
			onCategoryChange(categorySlug);
		},
		[onCategoryChange],
	);

	const handleContainerScroll = useCallback(() => {
		if (!isMobile) {
			checkScrollability();
		}
	}, [checkScrollability, isMobile]);

	const renderDesktopLayout = () => {
		return (
			<>
				<button
					onClick={() => handleCategoryClick(null)}
					className={`flex h-11 flex-shrink-0 items-center justify-center gap-1.5 px-3 transition-all duration-200 ${
						isAllSelected
							? 'bg-[#CFEDD9] text-[#242424]'
							: 'bg-white text-[#242424] hover:bg-gray-50'
					}`}
				>
					<AllIcon className="h-5 w-5 flex-shrink-0" />
					<span className="font-chalet-1960 text-[16px] leading-[100%] font-medium whitespace-nowrap">
						All
					</span>
				</button>

				<button
					onClick={() => handleScroll('left')}
					disabled={!canScrollLeft}
					className={`absolute left-20 z-30 flex h-8 w-8 flex-shrink-0 items-center justify-center${
						canScrollLeft
							? 'cursor-pointer opacity-100'
							: 'pointer-events-none opacity-0'
					}`}
					aria-label="Scroll left"
				>
					<ChevronLeft className="h-4 w-4" />
				</button>

				<div className="relative !mr-10 flex-1 overflow-hidden">
					<div
						className={`pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-45 bg-gradient-to-r from-white via-white/65 to-transparent transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'} `}
					/>

					<div
						className={`pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-45 bg-gradient-to-l from-white via-white/65 to-transparent transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'} `}
					/>

					<div
						ref={scrollContainerRef}
						onScroll={handleContainerScroll}
						className="scrollbar-hide flex gap-2 overflow-x-auto scroll-smooth pb-0.5"
						style={{
							scrollbarWidth: 'none',
							msOverflowStyle: 'none',
						}}
					>
						{PROJECT_CATEGORIES.map((category: ProjectCategory) => {
							const isSelected =
								selectedCategory === category.slug;

							return (
								<button
									key={category.id}
									onClick={() =>
										handleCategoryClick(category.slug)
									}
									className={`flex h-11 flex-shrink-0 items-center justify-center gap-2 px-3 py-1.5 whitespace-nowrap transition-all duration-200 ${
										isSelected
											? 'bg-[#CFEDD9] text-[#242424]'
											: 'bg-white text-[#242424] hover:bg-gray-50'
									}`}
								>
									{category.icon}
									<span className="font-chalet-1960 text-[16px] leading-[100%] font-medium">
										{category.name}
									</span>
								</button>
							);
						})}
					</div>
				</div>

				<button
					onClick={() => handleScroll('right')}
					disabled={!canScrollRight}
					className={`absolute right-28 z-30 flex h-8 w-8 flex-shrink-0 items-center justify-center ${
						canScrollRight
							? 'cursor-pointer opacity-100'
							: 'pointer-events-none opacity-0'
					}`}
					aria-label="Scroll right"
				>
					<ChevronRightIcon className="h-4 w-4" />
				</button>

				<button
					onClick={onFiltersClick}
					className="flex h-9 flex-shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#F1F3F6] px-3.5 py-1.5 whitespace-nowrap transition-all duration-200 hover:bg-gray-200"
				>
					<span className="font-chalet-1960 text-[16px] font-medium text-[#242424]">
						Filters
					</span>
					<FilterIcon className="h-4 w-4" />
				</button>
			</>
		);
	};

	return (
		<div className={`mb-6 w-full ${className}`}>
			{isMobile ? (
				<ProjectsFilterMobile
					selectedCategory={selectedCategory}
					onCategoryChange={onCategoryChange}
					onFiltersClick={onFiltersClick}
				/>
			) : (
				<div className="relative flex items-center gap-3">
					{renderDesktopLayout()}
				</div>
			)}
		</div>
	);
};
