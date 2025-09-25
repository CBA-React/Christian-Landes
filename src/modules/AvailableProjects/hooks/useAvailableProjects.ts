import { useInfiniteQuery } from '@tanstack/react-query';
import { AvailableProjectsApi } from '@/modules/AvailableProjects/services/AvailableProjectsApi';
import { SimpleProjectFilters } from '@/modules/AvailableProjects/types/type';

export const useAvailableProjects = (filters: SimpleProjectFilters = {}) => {
	return useInfiniteQuery({
		queryKey: ['projects', filters],

		queryFn: async ({ pageParam = 1 }) => {
			const response = await AvailableProjectsApi.getProjects({
				page: pageParam,
				perPage: 6,
				filters,
			});

			return {
				...response,
				data: AvailableProjectsApi.transformProjectsForDisplay(
					response.data,
				),
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
