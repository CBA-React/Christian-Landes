import { useQuery } from '@tanstack/react-query';
import { AvailableProjectsApi } from '@/modules/AvailableProjects/services/AvailableProjectsApi';
import { SimpleProjectFilters } from '@/modules/AvailableProjects/types/type';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface UseProjectsCountResult {
	totalCount: number;
	isLoading: boolean;
	isPending: boolean;
}

export const useProjectsCount = (
	filters: SimpleProjectFilters,
	enabled: boolean = true,
	debounceDelay: number = 500,
): UseProjectsCountResult => {
	const debouncedFilters = useDebounce(filters, debounceDelay);

	const {
		data: totalCount = 0,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ['projects-count', debouncedFilters],
		queryFn: async () => {
			const response = await AvailableProjectsApi.getProjects({
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
