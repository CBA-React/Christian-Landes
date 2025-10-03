'use client';

import { JSX, useCallback, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { StatusFilter } from './StatusFilter';
import { RequestCard } from './RequestCard';
import { RequestDisplayData, SimpleRequestFilters } from '../../types/type';
import { useMyRequests } from '../../hooks/useMyRequests';
import { FilterDrawer } from '@/shared/components/FilterDrawer/FilterDrawer';
import { FilterForm, FilterFormData } from './FilterForm';
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
					d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10"
				/>
			</svg>
		</div>
		<h2 className="mb-2 text-lg font-medium text-[#242424]">
			No requests found
		</h2>
		<p className="text-[#242424]/50">{message}</p>
	</section>
);

const RequestsList = ({
	requests,
	hasMore,
	isLoadingMore,
	onLoadMore,
	onRequestClick,
	onCloseRequest,
}: {
	requests: RequestDisplayData[];
	hasMore: boolean;
	isLoadingMore: boolean;
	onLoadMore: () => void;
	onRequestClick: (id: string) => void;
	onCloseRequest: (id: string) => void;
}) => (
	<>
		<section
			className="grid grid-cols-1 gap-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3"
			aria-label="List of requests"
		>
			{requests.map((request) => (
				<article key={request.id}>
					<RequestCard
						request={request}
						onCardClick={onRequestClick}
						onCloseRequest={onCloseRequest}
						className="w-full"
					/>
				</article>
			))}
		</section>

		{hasMore && (
			<nav
				className="mt-20 mb-5 flex justify-center md:mb-20"
				aria-label="Load more requests"
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
								Loading requests...
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

export const MyRequests = (): JSX.Element => {
	const router = useRouter();
	const [selectedStatus, setSelectedStatus] = useState<string | null>('all');
	const [isFilterDrawerOpen, setIsFilterDrawerOpen] =
		useState<boolean>(false);

	const [activeFilters, setActiveFilters] = useState<FilterFormData>({
		search: '',
		location: '',
		date: '',
		minBudget: 0,
		maxBudget: 50000,
		bids: '',
	});

	const filters = useMemo(
		() => ({
			status: (selectedStatus === 'all'
				? 'all'
				: selectedStatus) as SimpleRequestFilters['status'],
			...activeFilters,
		}),
		[selectedStatus, activeFilters],
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
	} = useMyRequests(filters);

	const allRequests = data?.pages.flatMap((page) => page.data) || [];

	const handleStatusChange = useCallback((status: string | null) => {
		setSelectedStatus(status === null ? 'all' : status);
	}, []);

	const handleRequestClick = useCallback(
		(requestId: string) => {
			router.push(`/profile/my-requests/${requestId}`);
		},
		[router],
	);

	const handleCloseRequest = useCallback((requestId: string) => {
		console.log('Close request clicked:', requestId);
	}, []);

	const handleFiltersClick = useCallback(() => {
		setIsFilterDrawerOpen(true);
	}, []);

	const handleFiltersChange = useCallback((newFilters: FilterFormData) => {
		setActiveFilters(newFilters);
	}, []);

	const handleApplyFilters = useCallback(() => {
		setIsFilterDrawerOpen(false);
	}, []);

	const handleClearFilters = useCallback(() => {
		const clearedFilters: FilterFormData = {
			search: '',
			location: '',
			date: '',
			minBudget: 0,
			maxBudget: 50000,
			bids: '',
		};
		setActiveFilters(clearedFilters);
	}, []);

	const getEmptyMessage = () => {
		if (selectedStatus && selectedStatus !== 'all') {
			const statusLabel =
				selectedStatus.charAt(0).toUpperCase() +
				selectedStatus.slice(1);
			return `No ${statusLabel.toLowerCase()} requests found.`;
		}
		return "You haven't posted any requests yet.";
	};

	if (isLoading || (!data && !error)) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<ErrorMessage
				message="Failed to load requests"
				onRetry={() => refetch()}
			/>
		);
	}

	return (
		<section className="mb-10 w-full max-w-full overflow-hidden">
			<div className="mb-6">
				<h1 className="text-[36px] font-medium tracking-[-1px] text-[#242424] lg:text-[40px]">
					My Requests
				</h1>
				<p className="text-[16px] text-[#242424]/60">
					All your job posts in one place.
				</p>
			</div>

			<nav aria-label="Filter requests by status">
				<StatusFilter
					selectedStatus={
						selectedStatus === 'all' ? null : selectedStatus
					}
					onStatusChange={handleStatusChange}
					onFiltersClick={handleFiltersClick}
				/>
			</nav>

			{allRequests.length > 0 ? (
				<>
					<RequestsList
						requests={allRequests}
						hasMore={!!hasNextPage}
						isLoadingMore={isFetchingNextPage}
						onLoadMore={() => fetchNextPage()}
						onRequestClick={handleRequestClick}
						onCloseRequest={handleCloseRequest}
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

			<FilterDrawer
				isOpen={isFilterDrawerOpen}
				onClose={() => setIsFilterDrawerOpen(false)}
			>
				<FilterForm
					filters={activeFilters}
					onFiltersChange={handleFiltersChange}
					onApply={handleApplyFilters}
					onClear={handleClearFilters}
					onClose={() => setIsFilterDrawerOpen(false)}
					currentStatus={selectedStatus}
				/>
			</FilterDrawer>
		</section>
	);
};
