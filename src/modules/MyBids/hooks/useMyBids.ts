import { useInfiniteQuery } from '@tanstack/react-query';
import { BidsApi } from '@/modules/MyBids/services/BidsApi';
import { SimpleBidFilters } from '@/modules/MyBids/bidTypes';

export const useMyBids = (filters: SimpleBidFilters = { status: 'all' }) => {
	return useInfiniteQuery({
		queryKey: ['my-bids', filters],

		queryFn: async ({ pageParam = 1 }) => {
			const response = await BidsApi.getBids({
				page: pageParam,
				perPage: 6,
				filters,
			});

			return {
				...response,
				data: BidsApi.transformBidsForDisplay(response.data),
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
