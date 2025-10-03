'use client';

import { JSX, useCallback, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { BidStatusFilter } from './BidStatusFilter';
import { BidCard } from './BidCard';
import { BidDisplayData, SimpleBidFilters } from '../bidTypes';
import { useMyBids } from '../hooks/useMyBids';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage/ErrorMessage';

const EmptyState = ({ message }: { message: string }) => (
	<section
		className="flex flex-col items-center justify-center py-12 text-center"
		aria-live="polite"
	>
		<div className="mb-4 text-[#242424]/30" aria-hidden="true">
			<svg
				className="mx-auto h-16 w-16"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
		</div>
		<h2 className="mb-2 text-lg font-medium text-[#242424]">
			No bids found
		</h2>
		<p className="text-[#242424]/50">{message}</p>
	</section>
);

const BidsList = ({
	bids,
	hasMore,
	isLoadingMore,
	onLoadMore,
	onBidClick,
}: {
	bids: BidDisplayData[];
	hasMore: boolean;
	isLoadingMore: boolean;
	onLoadMore: () => void;
	onBidClick: (projectId: string) => void;
}) => (
	<>
		<section
			className="flex flex-col gap-6 gap-y-7 md:gap-y-10"
			aria-label="List of bids"
		>
			{bids.map((bid) => (
				<article key={bid.id}>
					<BidCard
						bid={bid}
						onCardClick={onBidClick}
						className="w-full"
					/>
				</article>
			))}
		</section>

		{hasMore && (
			<nav
				className="mt-10 mb-5 flex justify-center md:mt-20 md:mb-20"
				aria-label="Load more bids"
			>
				<button
					onClick={onLoadMore}
					disabled={isLoadingMore}
					className="flex cursor-pointer items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isLoadingMore ? (
						<div className="flex items-center gap-3">
							<div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
							<span className="text-gray-600">
								Loading bids...
							</span>
						</div>
					) : (
						<span className="text-[36px] text-[#242424] transition-colors hover:text-blue-600 md:text-[40px]">
							Load More +
						</span>
					)}
				</button>
			</nav>
		)}
	</>
);

export const MyBids = (): JSX.Element => {
	const router = useRouter();
	const [selectedStatus, setSelectedStatus] = useState<string | null>('all');

	const filters = useMemo(
		() => ({
			status: (selectedStatus === 'all'
				? 'all'
				: selectedStatus) as SimpleBidFilters['status'],
		}),
		[selectedStatus],
	);

	const {
		data,
		error,
		isLoading,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		refetch,
	} = useMyBids(filters);

	const allBids = data?.pages.flatMap((page) => page.data) || [];

	const handleStatusChange = useCallback((status: string | null) => {
		setSelectedStatus(status === null ? 'all' : status);
	}, []);

	const handleBidClick = useCallback(
		(projectId: string) => {
			router.push(`/profile/available-projects/${projectId}`);
		},
		[router],
	);

	const getEmptyMessage = () => {
		if (selectedStatus && selectedStatus !== 'all') {
			const statusLabel =
				selectedStatus.charAt(0).toUpperCase() +
				selectedStatus.slice(1).replace('-', ' ');
			return `No ${statusLabel.toLowerCase()} bids found.`;
		}
		return "You haven't submitted any bids yet.";
	};

	if (isLoading || (!data && !error)) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<ErrorMessage
				message="Failed to load bids"
				onRetry={() => refetch()}
			/>
		);
	}

	return (
		<section className="mb-10 w-full max-w-full overflow-hidden">
			<div className="mb-6">
				<h1 className="text-[36px] font-medium tracking-[-1px] text-[#242424] lg:text-[40px]">
					My Bids
				</h1>
				<p className="text-[16px] text-[#242424]/60">
					Track and manage all your submitted bids in one place
				</p>
			</div>

			<nav aria-label="Filter bids by status">
				<BidStatusFilter
					selectedStatus={
						selectedStatus === 'all' ? null : selectedStatus
					}
					onStatusChange={handleStatusChange}
				/>
			</nav>

			{allBids.length > 0 ? (
				<>
					<BidsList
						bids={allBids}
						hasMore={!!hasNextPage}
						isLoadingMore={isFetchingNextPage}
						onLoadMore={() => fetchNextPage()}
						onBidClick={handleBidClick}
					/>

					{isFetching && !isFetchingNextPage && (
						<div className="flex justify-center py-4">
							<div className="flex items-center gap-3">
								<div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
								<span className="text-sm text-gray-600">
									Updating...
								</span>
							</div>
						</div>
					)}
				</>
			) : (
				<EmptyState message={getEmptyMessage()} />
			)}
		</section>
	);
};
