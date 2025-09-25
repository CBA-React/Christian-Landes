'use client';

import { JSX, useCallback, useState, useMemo } from 'react';
import { StatusFilter } from './StatusFilter';
import { RequestCard } from './RequestCard';
import { RequestDisplayData, SimpleRequestFilters } from '../types/type';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary';
import { useMyRequests } from '../hooks/useMyRequests';

const LoadingState = () => (
	<div className="flex justify-center py-20" role="status" aria-live="polite">
		<div className="flex items-center gap-3">
			<div
				className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
				aria-hidden="true"
			/>
			<span className="text-gray-600">Loading requests...</span>
		</div>
	</div>
);

const ErrorState = ({
	error,
	onRetry,
}: {
	error: string;
	onRetry: () => void;
}) => (
	<section
		className="flex flex-col items-center justify-center py-12 text-center"
		role="alert"
		aria-live="polite"
	>
		<h2 className="mb-2 text-lg font-medium text-[#242424]">
			Error loading requests
		</h2>
		<p className="mb-4 text-[#242424]/50">{error}</p>
		<button
			onClick={onRetry}
			className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		>
			Try Again
		</button>
	</section>
);

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
	const [selectedStatus, setSelectedStatus] = useState<string | null>('all');

	const filters = useMemo(
		() => ({
			status: (selectedStatus === 'all'
				? 'all'
				: selectedStatus) as SimpleRequestFilters['status'],
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
	} = useMyRequests(filters);

	const allRequests = data?.pages.flatMap((page) => page.data) || [];

	const handleStatusChange = useCallback((status: string | null) => {
		setSelectedStatus(status === null ? 'all' : status);
	}, []);

	const handleRequestClick = useCallback((requestId: string) => {
		console.log('Request clicked:', requestId);
	}, []);

	const handleCloseRequest = useCallback((requestId: string) => {
		console.log('Close request clicked:', requestId);
	}, []);

	const handleFiltersClick = useCallback(() => {
		console.log('Filters clicked');
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

	if (isLoading) {
		return (
			<ErrorBoundary>
				<ProfileLayout showHeader={true} showSidebar={true}>
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
									selectedStatus === 'all'
										? null
										: selectedStatus
								}
								onStatusChange={handleStatusChange}
								onFiltersClick={handleFiltersClick}
							/>
						</nav>

						<LoadingState />
					</section>
				</ProfileLayout>
			</ErrorBoundary>
		);
	}

	if (error) {
		return (
			<ErrorBoundary>
				<ProfileLayout showHeader={true} showSidebar={true}>
					<section className="mb-10 w-full max-w-full overflow-hidden">
						<div className="mb-6">
							<h1 className="text-[36px] font-medium tracking-[-1px] text-[#242424] lg:text-[40px]">
								My Requests
							</h1>
							<p className="text-[16px] text-[#242424]/60">
								All your job posts in one place.
							</p>
						</div>

						<ErrorState
							error={
								error instanceof Error
									? error.message
									: 'Something went wrong'
							}
							onRetry={() => refetch()}
						/>
					</section>
				</ProfileLayout>
			</ErrorBoundary>
		);
	}

	return (
		<ErrorBoundary>
			<ProfileLayout showHeader={true} showSidebar={true}>
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
				</section>
			</ProfileLayout>
		</ErrorBoundary>
	);
};
