'use client';

import { JSX, useState, useEffect, useCallback } from 'react';
import {
	FILTER_STATUS_OPTIONS,
	STATUS_CONFIG,
} from '@/modules/MyRequests/requestStatus';

import AllIcon from 'public/icons/profile/project-categories/all.svg';
import FilterIcon from 'public/icons/profile/project-categories/filters.svg';

import { StatusFilterMobile } from './StatusFilterMobile';

interface StatusFilterProps {
	selectedStatus: string | null;
	onStatusChange: (status: string | null) => void;
	onFiltersClick?: () => void;
	className?: string;
}

export const StatusFilter = ({
	selectedStatus,
	onStatusChange,
	onFiltersClick,
	className = '',
}: StatusFilterProps): JSX.Element => {
	const [isMobile, setIsMobile] = useState(false);

	const isAllSelected = selectedStatus === null;

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handleStatusClick = useCallback(
		(statusSlug: string | null) => {
			onStatusChange(statusSlug);
		},
		[onStatusChange],
	);

	const renderDesktopLayout = () => {
		return (
			<>
				<button
					onClick={() => handleStatusClick(null)}
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

				<div className="relative !mr-10 flex-1 overflow-hidden">
					<div
						className="scrollbar-hide flex gap-2 overflow-x-auto scroll-smooth pb-0.5"
						style={{
							scrollbarWidth: 'none',
							msOverflowStyle: 'none',
						}}
					>
						{FILTER_STATUS_OPTIONS.filter(
							(option) => option.id !== 'all',
						).map((option) => {
							const isSelected = selectedStatus === option.slug;
							const statusConfig =
								STATUS_CONFIG[
									option.slug as keyof typeof STATUS_CONFIG
								];

							return (
								<button
									key={option.id}
									onClick={() =>
										handleStatusClick(option.slug)
									}
									className={`flex h-11 flex-shrink-0 items-center justify-center gap-2 px-3 py-1.5 whitespace-nowrap transition-all duration-200 ${
										isSelected
											? 'bg-[#CFEDD9] text-[#242424]'
											: 'bg-white text-[#242424] hover:bg-gray-50'
									}`}
								>
									<span className="h-5 w-5 flex-shrink-0">
										{typeof option.icon === 'string' ? (
											<AllIcon className="h-5 w-5" />
										) : (
											option.icon || statusConfig?.icon
										)}
									</span>
									<span className="font-chalet-1960 text-[16px] leading-[100%] font-medium">
										{option.name}
									</span>
								</button>
							);
						})}
					</div>
				</div>

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
		<div className={`mb-6 w-full md:mb-10 ${className}`}>
			{isMobile ? (
				<StatusFilterMobile
					selectedStatus={selectedStatus}
					onStatusChange={onStatusChange}
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
