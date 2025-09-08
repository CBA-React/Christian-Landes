'use client';

import { CategoryItem } from '@/shared/components/CategoryItem/CategoryItem';

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
import React, { JSX, useEffect, useRef, useState } from 'react';

import ArrowLeftHorizontal from 'public/icons/arrow-left-horizontal.svg';
import ArrowRightHorizontal from 'public/icons/arrow-right-horizontal.svg';

export const ProjectCategoriesSlider = (): JSX.Element => {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const scrollRef = useRef<HTMLDivElement>(null);

	const updateScrollState = () => {
		if (!scrollRef.current) return;

		const container = scrollRef.current;
		const containerWidth = container.offsetWidth;
		const scrollWidth = container.scrollWidth;
		const currentScroll = container.scrollLeft;

		setCanScrollRight(currentScroll + containerWidth < scrollWidth - 5);
		setScrollPosition(currentScroll);
	};

	useEffect(() => {
		updateScrollState();

		const handleResize = () => updateScrollState();
		window.addEventListener('resize', handleResize);

		return (): void => window.removeEventListener('resize', handleResize);
	}, []);

	const scroll = (direction: 'left' | 'right'): void => {
		const container = scrollRef.current;
		if (!container) return;

		const cardWidth =
			document.documentElement.clientWidth < 768 ? 300 + 16 : 400 + 16;
		const scrollAmount = cardWidth;

		let targetScrollPosition;
		if (direction === 'left') {
			targetScrollPosition = Math.max(
				0,
				container.scrollLeft - scrollAmount,
			);
		} else {
			const maxScroll = container.scrollWidth - container.offsetWidth;
			targetScrollPosition = Math.min(
				container.scrollLeft + scrollAmount,
				maxScroll,
			);
		}

		const startPosition = container.scrollLeft;
		const distance = targetScrollPosition - startPosition;
		const duration = 400;
		let startTime: number | null = null;

		function animateScroll(currentTime: number): void {
			if (!container) return;
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const progress = Math.min(timeElapsed / duration, 1);

			const ease = 1 - Math.pow(1 - progress, 3);

			container.scrollLeft = startPosition + distance * ease;

			if (progress < 1) {
				requestAnimationFrame(animateScroll);
			} else {
				updateScrollState();
			}
		}

		requestAnimationFrame(animateScroll);
	};

	const canScrollLeft = scrollPosition > 0;

	return (
		<div className="relative mt-[56px] overflow-x-hidden md:mt-[122px]">
			<div className="mx-auto max-w-[1240px] px-6 xl:px-0">
				<div className="mb-7 flex items-center justify-between md:mb-9">
					<h2 className="text-[36px] leading-[120%] lg:max-w-[440px] lg:text-[48px] lg:font-bold">
						Popular Projects Categories
					</h2>
					<div className="gap-2 self-end max-sm:hidden sm:hidden md:flex lg:flex">
						<button
							onClick={() => scroll('left')}
							disabled={!canScrollLeft}
							className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
								canScrollLeft
									? 'bg-gray-900 text-white hover:bg-gray-600'
									: 'cursor-not-allowed bg-gray-700 text-gray-600'
							}`}
						>
							<ArrowLeftHorizontal />
						</button>
						<button
							onClick={() => scroll('right')}
							disabled={!canScrollRight}
							className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
								canScrollRight
									? 'bg-gray-900 text-white hover:bg-gray-600'
									: 'cursor-not-allowed bg-gray-700 text-gray-600'
							}`}
						>
							<ArrowRightHorizontal />
						</button>
					</div>
				</div>
			</div>

			<div className="relative">
				<div
					ref={scrollRef}
					className="scrollbar-hide flex h-[144px] gap-4 overflow-x-auto pb-4 md:h-auto"
					onScroll={updateScrollState}
					style={{
						paddingLeft: 'max(calc((100vw - 1240px) / 2), 1rem)',
						paddingRight: '1rem',
						scrollbarWidth: 'none',
						msOverflowStyle: 'none',
					}}
				>
					{categories.map((category) => (
						<CategoryItem
							name={category.name}
							id={category.id}
							key={category.id}
						/>
					))}
				</div>
			</div>
			<div className="mt-2 flex max-w-[1240px] gap-2 px-[20px] md:hidden">
				<button
					onClick={() => scroll('left')}
					disabled={!canScrollLeft}
					className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
						canScrollLeft
							? 'bg-gray-900 text-white hover:bg-gray-600'
							: 'cursor-not-allowed bg-gray-700 text-gray-600'
					}`}
				>
					<ArrowLeftHorizontal />
				</button>
				<button
					onClick={() => scroll('right')}
					disabled={!canScrollRight}
					className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
						canScrollRight
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

