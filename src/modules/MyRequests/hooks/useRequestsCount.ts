import { useQuery } from '@tanstack/react-query';
import { RequestsApi } from '@/modules/MyRequests/services/RequestsApi';
import { SimpleRequestFilters } from '@/modules/MyRequests/types/type';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface UseRequestsCountResult {
	totalCount: number;
	isLoading: boolean;
	isPending: boolean;
}

export const useRequestsCount = (
	filters: SimpleRequestFilters,
	enabled: boolean = true,
	debounceDelay: number = 500,
): UseRequestsCountResult => {
	const debouncedFilters = useDebounce(filters, debounceDelay);

	const {
		data: totalCount = 0,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ['requests-count', debouncedFilters],
		queryFn: async () => {
			const response = await RequestsApi.getRequests({
				page: 1,
				perPage: 1,
				filters: debouncedFilters,
			});
			return response.pagination?.total || 0;
		},
		enabled: enabled,
		staleTime: 5 * 60 * 1000,
		gcTime: 5 * 60 * 1000,
	});

	const isPending =
		JSON.stringify(filters) !== JSON.stringify(debouncedFilters);

	return {
		totalCount,
		isLoading: isLoading || isFetching,
		isPending,
	};
};
