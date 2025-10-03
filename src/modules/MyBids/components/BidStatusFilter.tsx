'use client';

import { JSX, useState, useEffect, useCallback } from 'react';
import {
	FILTER_BID_STATUS_OPTIONS,
	BID_STATUS_CONFIG,
} from '@/modules/MyBids/bidStatus';

import AllIcon from 'public/icons/profile/project-categories/all.svg';
import { BidStatusFilterMobile } from './BidStatusFilterMobile';

interface BidStatusFilterProps {
	selectedStatus: string | null;
	onStatusChange: (status: string | null) => void;
	className?: string;
}

export const BidStatusFilter = ({
	selectedStatus,
	onStatusChange,
	className = '',
}: BidStatusFilterProps): JSX.Element => {
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

				<div className="relative flex-1 overflow-hidden">
					<div
						className="scrollbar-hide flex gap-2 overflow-x-auto scroll-smooth pb-0.5"
						style={{
							scrollbarWidth: 'none',
							msOverflowStyle: 'none',
						}}
					>
						{FILTER_BID_STATUS_OPTIONS.filter(
							(option) => option.id !== 'all',
						).map((option) => {
							const isSelected = selectedStatus === option.slug;
							const statusConfig =
								BID_STATUS_CONFIG[
									option.slug as keyof typeof BID_STATUS_CONFIG
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
			</>
		);
	};

	return (
		<div className={`mb-6 w-full md:mb-10 ${className}`}>
			{isMobile ? (
				<BidStatusFilterMobile
					selectedStatus={selectedStatus}
					onStatusChange={onStatusChange}
				/>
			) : (
				<div className="relative flex items-center gap-3">
					{renderDesktopLayout()}
				</div>
			)}
		</div>
	);
};
