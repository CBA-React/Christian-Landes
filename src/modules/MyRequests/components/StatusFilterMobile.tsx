// modules/MyRequests/components/StatusFilterMobile.tsx
'use client';

import { JSX, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
	FILTER_STATUS_OPTIONS,
	STATUS_CONFIG,
} from '@/shared/constants/requestStatus';

import AllIcon from '../../../../public/icons/profile/project-categories/all.svg';
import FilterIcon from '../../../../public/icons/profile/project-categories/filters.svg';

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
					{/* All button */}
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

					{/* Status options from FILTER_STATUS_OPTIONS */}
					{FILTER_STATUS_OPTIONS.filter(
						(option) => option.id !== 'all',
					).map((option) => {
						const isSelected = selectedStatus === option.slug;
						const statusConfig =
							STATUS_CONFIG[
								option.slug as keyof typeof STATUS_CONFIG
							];

						return (
							<div
								key={option.id}
								className="embla__slide flex-shrink-0"
								style={{ flex: '0 0 auto' }}
							>
								<button
									onClick={() => onStatusChange(option.slug)}
									className={`flex h-11 items-center justify-center gap-2 px-3 py-1.5 whitespace-nowrap transition-all duration-200 ${
										isSelected
											? 'bg-[#CFEDD9] text-[#242424]'
											: 'bg-white text-[#242424] hover:bg-gray-50'
									}`}
								>
									{/* Используем иконку из конфигурации */}
									<span className="h-5 w-5 flex-shrink-0">
										{typeof option.icon === 'string' ? (
											<AllIcon className="h-5 w-5" /> // fallback для 'grid'
										) : (
											option.icon || statusConfig?.icon
										)}
									</span>
									<span className="font-chalet-1960 text-[16px] font-medium">
										{option.name}
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
