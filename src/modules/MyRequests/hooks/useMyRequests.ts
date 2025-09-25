import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { RequestsApi } from '@/modules/MyRequests/services/RequestsApi';
import { SimpleRequestFilters } from '@/modules/MyRequests/types/type';

export const useMyRequests = (
	filters: SimpleRequestFilters = { status: 'all' },
) => {
	return useInfiniteQuery({
		queryKey: ['my-requests', filters],

		queryFn: async ({ pageParam = 1 }) => {
			const response = await RequestsApi.getRequests({
				page: pageParam,
				perPage: 6,
				filters,
			});

			return {
				...response,
				data: RequestsApi.transformRequestsForDisplay(response.data),
			};
		},

		getNextPageParam: (lastPage, allPages) => {
			const currentPage = allPages.length;
			const totalPages = lastPage.pagination?.totalPages || 1;
			return currentPage < totalPages ? currentPage + 1 : undefined;
		},

		initialPageParam: 1,
		staleTime: 5 * 60 * 1000,
	});
};
