import { useState, useEffect, useCallback, useRef } from 'react';
import { ITEMS_PER_PAGE, DEBOUNCE_DELAY } from '../constants/pagination';
import { BaseFilters, PaginatedResponse } from '../types/paginatedItems';
import { SimpleThrottle } from '@/shared/lib/throttle';

interface UsePaginatedDataProps<T, F extends BaseFilters> {
	apiCall: (params: {
		page: number;
		perPage: number;
		filters: F;
	}) => Promise<PaginatedResponse<T>>;
	initialData?: T[];
	defaultFilters?: F;
}

export function usePaginatedData<T, F extends BaseFilters>({
	apiCall,
	initialData = [],
	defaultFilters = {} as F,
}: UsePaginatedDataProps<T, F>) {
	const [items, setItems] = useState<T[]>(initialData);
	const [filters, setFilters] = useState<F>(defaultFilters);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const abortControllerRef = useRef<AbortController | null>(null);
	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isComponentMountedRef = useRef(true);
	const isRequestInProgressRef = useRef(false);

	const throttleRef = useRef<SimpleThrottle>(new SimpleThrottle(400));

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
			throttleRef.current.cancel();
			isRequestInProgressRef.current = false;
		};
	}, []);

	const loadData = useCallback(
		async (
			newFilters: F = filters,
			page: number = 1,
			isLoadMore: boolean = false,
		) => {
			if (isRequestInProgressRef.current && !isLoadMore) {
				console.log('Request already in progress, skipping...');
				return;
			}

			if (
				abortControllerRef.current &&
				!abortControllerRef.current.signal.aborted
			) {
				abortControllerRef.current.abort();
				await new Promise((resolve) => setTimeout(resolve, 50));
			}

			const controller = new AbortController();
			abortControllerRef.current = controller;

			if (!isLoadMore) {
				isRequestInProgressRef.current = true;
			}

			if (isLoadMore) {
				setIsLoadingMore(true);
			} else {
				setIsLoading(true);
			}
			setError(null);

			const executeApiCall = async () => {
				if (controller.signal.aborted) {
					return null;
				}

				const response = await apiCall({
					page,
					perPage: ITEMS_PER_PAGE,
					filters: newFilters,
				});

				return response;
			};

			try {
				let response;

				if (isLoadMore) {
					response = await executeApiCall();
				} else {
					response =
						await throttleRef.current.execute(executeApiCall);
				}

				if (!response || controller.signal.aborted) {
					return;
				}

				if (!isComponentMountedRef.current) {
					return;
				}

				if (isLoadMore) {
					setItems((prev) => [...prev, ...response.data]);
					setCurrentPage((prev) => prev + 1);
				} else {
					setItems(response.data);
					setCurrentPage(1);
				}

				const totalPages = response.pagination?.totalPages || 1;
				setHasMore(page < totalPages);
				setError(null);
			} catch (err: any) {
				if (err.name === 'AbortError' || controller.signal.aborted) {
					return;
				}

				if (!isComponentMountedRef.current) return;

				let errorMessage = 'Failed to load data. Please try again.';

				if (
					err.code === 'ECONNABORTED' ||
					err.message?.includes('timeout')
				) {
					errorMessage =
						'Connection timeout. Please slow down or check your internet connection.';
				} else if (err.response?.status >= 500) {
					errorMessage = 'Server error. Please try again later.';
				} else if (err.response?.status === 429) {
					errorMessage =
						'Too many requests. Please wait a moment and try again.';
				} else if (err.response?.status === 401) {
					errorMessage =
						'Authentication required. Please log in again.';
				} else if (err.response?.status === 403) {
					errorMessage =
						'Access denied. You do not have permission to view these items.';
				}

				setError(errorMessage);
			} finally {
				isRequestInProgressRef.current = false;

				if (isComponentMountedRef.current) {
					setIsLoading(false);
					setIsLoadingMore(false);
				}
			}
		},
		[apiCall],
	);

	const debouncedLoadData = useCallback(
		(newFilters: F) => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}

			debounceTimeoutRef.current = setTimeout(() => {
				loadData(newFilters, 1, false);
			}, DEBOUNCE_DELAY);
		},
		[loadData],
	);

	const handleLoadMore = useCallback(() => {
		if (!isLoadingMore && hasMore && !isRequestInProgressRef.current) {
			loadData(filters, currentPage + 1, true);
		}
	}, [loadData, filters, currentPage, isLoadingMore, hasMore]);

	const handleFiltersChange = useCallback(
		(newFilters: F) => {
			setFilters(newFilters);
			setCurrentPage(1);
			setHasMore(true);
			debouncedLoadData(newFilters);
		},
		[debouncedLoadData],
	);

	const handleRetry = useCallback(() => {
		isRequestInProgressRef.current = false;
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		throttleRef.current.reset();

		setTimeout(() => {
			loadData(filters, 1, false);
		}, 100);
	}, [loadData, filters]);

	useEffect(() => {
		if (initialData.length === 0) {
			loadData();
		}
	}, [loadData, initialData.length]);

	return {
		items,
		filters,
		isLoading,
		isLoadingMore,
		error,
		currentPage,
		hasMore,

		loadData,
		handleLoadMore,
		handleFiltersChange,
		handleRetry,

		isEmpty: !isLoading && items.length === 0,
	};
}
