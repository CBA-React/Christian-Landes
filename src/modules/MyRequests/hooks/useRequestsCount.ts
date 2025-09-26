import { useQuery } from '@tanstack/react-query';
import { RequestsApi } from '@/modules/MyRequests/services/RequestsApi';
import { SimpleRequestFilters } from '@/modules/MyRequests/types/type';

export const useRequestsCount = (
	filters: SimpleRequestFilters,
	enabled: boolean = true,
) => {
	return useQuery({
		queryKey: ['requests-count', filters],
		queryFn: async () => {
			const response = await RequestsApi.getRequests({
				page: 1,
				perPage: 1,
				filters,
			});
			return response.pagination?.total || 0;
		},
		enabled,
		gcTime: 5 * 60 * 1000,
	});
};
