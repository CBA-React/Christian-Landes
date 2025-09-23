// modules/MyRequests/components/MyRequests.tsx
'use client';

import { JSX, useState, useEffect, useCallback, useRef } from 'react';
import { StatusFilter } from './StatusFilter';
import { RequestCard } from './RequestCard';
import { RequestDisplayData, SimpleRequestFilters } from '../type';
import { RequestsApi } from '../services/RequestsApi';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';

interface MyRequestsProps {
	initialRequests?: RequestDisplayData[];
}

export const MyRequests = ({
	initialRequests = [],
}: MyRequestsProps): JSX.Element => {
	const [requests, setRequests] =
		useState<RequestDisplayData[]>(initialRequests);
	const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
	const [filters, setFilters] = useState<SimpleRequestFilters>({});
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const abortControllerRef = useRef<AbortController | null>(null);
	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isComponentMountedRef = useRef(true);

	useEffect(() => {
		isComponentMountedRef.current = true;
		return () => {
			isComponentMountedRef.current = false;
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
		};
	}, []);

	const loadRequests = useCallback(
		async (
			newFilters: SimpleRequestFilters = {},
			page: number = 1,
			isLoadMore: boolean = false,
			signal?: AbortSignal,
		) => {
			if (
				abortControllerRef.current &&
				!abortControllerRef.current.signal.aborted
			) {
				abortControllerRef.current.abort();
			}

			const controller = signal ? null : new AbortController();
			if (controller) {
				abortControllerRef.current = controller;
			}
			const requestSignal = signal || controller?.signal;

			if (isLoadMore) {
				setIsLoadingMore(true);
			} else {
				setIsLoading(true);
			}
			setError(null);

			try {
				const response = await RequestsApi.getRequests({
					page,
					perPage: 6,
					filters: newFilters,
				});

				if (requestSignal?.aborted) {
					return;
				}

				if (!isComponentMountedRef.current) {
					return;
				}

				const transformedRequests =
					RequestsApi.transformRequestsForDisplay(response.data);

				if (isLoadMore) {
					setRequests((prev) => [...prev, ...transformedRequests]);
					setCurrentPage((prev) => prev + 1);
				} else {
					setRequests(transformedRequests);
					setCurrentPage(1);
				}

				const totalPages = response.pagination?.totalPages || 1;
				setHasMore(page < totalPages);

				if (isLoadMore) {
					setCurrentPage((prev) => prev + 1);
				}

				setError(null);
			} catch (err: any) {
				if (err.name === 'AbortError' || requestSignal?.aborted) {
					return;
				}

				if (!isComponentMountedRef.current) return;

				let errorMessage = 'Failed to load requests. Please try again.';

				if (
					err.code === 'ECONNABORTED' ||
					err.message?.includes('timeout')
				) {
					errorMessage = 'Request timed out. Please try again.';
				} else if (err.response?.status >= 500) {
					errorMessage = 'Server error. Please try again later.';
				} else if (err.response?.status === 429) {
					errorMessage =
						'Too many requests. Please wait a moment and try again.';
				}

				setError(errorMessage);
			} finally {
				if (isComponentMountedRef.current) {
					setIsLoading(false);
					setIsLoadingMore(false);
				}
			}
		},
		[],
	);

	const debouncedLoadRequests = useCallback(
		(newFilters: SimpleRequestFilters) => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}

			debounceTimeoutRef.current = setTimeout(() => {
				loadRequests(newFilters, 1, false);
			}, 300);
		},
		[loadRequests],
	);

	const handleLoadMore = useCallback(() => {
		loadRequests(filters, currentPage + 1, true);
	}, [loadRequests, filters, currentPage]);

	const handleStatusChange = useCallback(
		async (status: string | null) => {
			setSelectedStatus(status);
			setCurrentPage(1);

			const statusValue = status === null ? 'all' : status;

			const newFilters: SimpleRequestFilters = {
				...filters,
				status: statusValue as any,
			};
			setFilters(newFilters);

			debouncedLoadRequests(newFilters);
		},
		[debouncedLoadRequests, filters],
	);

	const handleRequestClick = useCallback((requestId: string) => {
		console.log('Request clicked:', requestId);
		// TODO: Navigate to request details page
		// router.push(`/profile/requests/${requestId}`);
	}, []);

	const handleCloseRequest = useCallback(
		async (requestId: string) => {
			try {
				await RequestsApi.closeRequest(requestId);
				// Reload requests after closing
				loadRequests(filters, 1, false);
			} catch (error) {
				console.error('Failed to close request:', error);
				// TODO: Add toast notification for error
			}
		},
		[loadRequests, filters],
	);

	const handleFiltersClick = useCallback(() => {
		console.log('Filters clicked');
		// TODO: Open filters modal/sidebar
	}, []);

	const handleRetry = useCallback(() => {
		loadRequests(filters, 1, false);
	}, [loadRequests, filters]);

	useEffect(() => {
		if (initialRequests.length === 0) {
			loadRequests();
		}
	}, [loadRequests, initialRequests.length]);

	return (
		<ProfileLayout showHeader={true} showSidebar={true}>
			<div className="mb-10 w-full max-w-full overflow-hidden">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-[36px] font-medium tracking-[-1px] text-[#242424] lg:text-[40px]">
						My Requests
					</h1>
					<p className="text-[16px] text-[#242424]/60">
						All your job posts in one place.
					</p>
				</div>

				{/* Status Filter - exact copy of ProjectsFilter layout */}
				<div className="mb-6">
					<StatusFilter
						selectedStatus={selectedStatus}
						onStatusChange={handleStatusChange}
						onFiltersClick={handleFiltersClick}
					/>
				</div>

				{isLoading && (
					<div className="flex justify-center py-20">
						<div className="flex items-center gap-3">
							<div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
							<span className="text-gray-600">
								Loading requests...
							</span>
						</div>
					</div>
				)}

				{!isLoading && (
					<>
						{error ? (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<div className="mb-4 text-red-500">
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
											d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
										/>
									</svg>
								</div>
								<h3 className="mb-2 text-lg font-medium text-[#242424]">
									Error loading requests
								</h3>
								<p className="mb-4 text-[#242424]/50">
									{error}
								</p>
								<button
									onClick={handleRetry}
									className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
								>
									Try Again
								</button>
							</div>
						) : requests.length > 0 ? (
							<>
								{/* Requests grid */}
								<div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
									{requests.map((request) => (
										<RequestCard
											key={request.id}
											request={request}
											onCardClick={handleRequestClick}
											onCloseRequest={handleCloseRequest}
											className="w-full"
										/>
									))}
								</div>

								{hasMore && (
									<div className="mt-20 mb-5 flex justify-center md:mb-20">
										<button
											onClick={handleLoadMore}
											disabled={isLoadingMore}
											className="flex cursor-pointer items-center gap-2"
										>
											{isLoadingMore ? (
												<>
													<div className="flex justify-center py-8">
														<div className="flex items-center gap-3">
															<div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
															<span className="text-gray-600">
																Loading
																requests...
															</span>
														</div>
													</div>
												</>
											) : (
												<div className="flex items-center gap-2">
													<span className="text-[36px] text-[#242424] md:text-[40px]">
														Load More +
													</span>
												</div>
											)}
										</button>
									</div>
								)}
							</>
						) : (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<div className="mb-4 text-[#242424]/30">
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
											d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
										/>
									</svg>
								</div>
								<h3 className="mb-2 text-lg font-medium text-[#242424]">
									No requests found
								</h3>
								<p className="text-[#242424]/50">
									{selectedStatus && selectedStatus !== 'all'
										? `No ${selectedStatus} requests found.`
										: "You haven't posted any requests yet."}
								</p>
							</div>
						)}
					</>
				)}
			</div>
		</ProfileLayout>
	);
};
