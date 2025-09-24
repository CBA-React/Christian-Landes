'use client';

import { JSX, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
	PROJECT_CATEGORIES,
	ProjectCategory,
} from '../../../shared/constants/projectCategories';

import AllIcon from '../../../../public/icons/profile/project-categories/all.svg';
import FilterIcon from '../../../../public/icons/profile/project-categories/filters.svg';

interface ProjectsFilterMobileProps {
	selectedCategory: string | null;
	onCategoryChange: (category: string | null) => void;
	onFiltersClick?: () => void;
}

export const ProjectsFilterMobile = ({
	selectedCategory,
	onCategoryChange,
	onFiltersClick,
}: ProjectsFilterMobileProps): JSX.Element => {
	const [emblaRef] = useEmblaCarousel({
		align: 'start',
		containScroll: 'trimSnaps',
		dragFree: true,
	});

	const isAllSelected = selectedCategory === null;

	useEffect(() => {}, []);

	return (
		<div className="relative w-full">
			<div className="flex items-center pb-4">
				<button
					onClick={onFiltersClick}
					className="flex h-9 w-full items-center justify-center gap-1.5 rounded-full bg-[#F1F3F6] px-3.5 py-1.5 whitespace-nowrap transition-all duration-200 hover:bg-gray-200"
				>
					<span className="font-chalet-1960 text-[16px] font-medium text-[#242424]">
						Filters
					</span>
					<FilterIcon className="h-4 w-4" />
				</button>
			</div>
			<div
				className="embla w-full overflow-x-auto"
				ref={emblaRef}
				style={{ WebkitOverflowScrolling: 'touch' }}
			>
				<div className="embla__container flex gap-2">
					<div
						className="embla__slide flex-shrink-0"
						style={{ flex: '0 0 auto' }}
					>
						<button
							onClick={() => onCategoryChange(null)}
							className={`flex h-11 items-center justify-center gap-1 px-3 transition-all duration-200 ${
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
					</div>

					{PROJECT_CATEGORIES.map((category: ProjectCategory) => {
						const isSelected = selectedCategory === category.slug;
						return (
							<div
								key={category.id}
								className="embla__slide flex-shrink-0"
								style={{ flex: '0 0 auto' }}
							>
								<button
									onClick={() =>
										onCategoryChange(category.slug)
									}
									className={`flex h-11 items-center justify-center gap-2 px-3 py-1.5 whitespace-nowrap transition-all duration-200 ${
										isSelected
											? 'bg-[#D1FAE5] text-[#059669]'
											: 'bg-white text-[#242424] hover:bg-gray-50'
									}`}
								>
									{category.icon}
									<span className="font-chalet-1960 text-[16px] font-medium">
										{category.name}
									</span>
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
