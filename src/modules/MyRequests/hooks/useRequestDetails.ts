import { useQuery } from '@tanstack/react-query';
import { RequestsApi } from '../services/RequestsApi';
import type { RequestDetailsDisplayData } from '../types/requestDetails';

export function useRequestDetails(requestId: string) {
	return useQuery({
		queryKey: ['request-details', requestId],
		queryFn: async (): Promise<RequestDetailsDisplayData> => {
			const data = await RequestsApi.getRequestById(requestId);
			return RequestsApi.transformRequestDetailsForDisplay(data);
		},
		enabled: !!requestId,
		staleTime: 2 * 60 * 1000,
		retry: 2,
	});
}
