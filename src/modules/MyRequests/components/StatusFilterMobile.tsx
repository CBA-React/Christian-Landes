// modules/MyRequests/components/StatusFilterMobile.tsx
'use client';

import { JSX, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import AllIcon from '../../../../public/icons/profile/project-categories/all.svg';
import FilterIcon from '../../../../public/icons/profile/project-categories/filters.svg';

// Status options instead of PROJECT_CATEGORIES
const STATUS_OPTIONS = [
	{ id: 1, name: 'Open', slug: 'open' },
	{ id: 2, name: 'Closed', slug: 'closed' },
	{ id: 3, name: 'Auto-closed', slug: 'auto-closed' },
];

interface StatusFilterMobileProps {
	selectedStatus: string | null;
	onStatusChange: (status: string | null) => void;
	onFiltersClick?: () => void;
}

export const StatusFilterMobile = ({
	selectedStatus,
	onStatusChange,
	onFiltersClick,
}: StatusFilterMobileProps): JSX.Element => {
	const [emblaRef] = useEmblaCarousel({
		align: 'start',
		containScroll: 'trimSnaps',
		dragFree: true,
	});

	const isAllSelected = selectedStatus === null;

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
							onClick={() => onStatusChange(null)}
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

					{STATUS_OPTIONS.map((status) => {
						const isSelected = selectedStatus === status.slug;
						return (
							<div
								key={status.id}
								className="embla__slide flex-shrink-0"
								style={{ flex: '0 0 auto' }}
							>
								<button
									onClick={() => onStatusChange(status.slug)}
									className={`flex h-11 items-center justify-center gap-2 px-3 py-1.5 whitespace-nowrap transition-all duration-200 ${
										isSelected
											? 'bg-[#D1FAE5] text-[#059669]'
											: 'bg-white text-[#242424] hover:bg-gray-50'
									}`}
								>
									<span className="font-chalet-1960 text-[16px] font-medium">
										{status.name}
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
