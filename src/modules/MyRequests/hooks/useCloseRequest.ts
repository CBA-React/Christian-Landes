import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CloseRequestApi } from '../services/CloseRequestApi';
import type { CloseRequestPayload } from '../types/requestDetails';

export function useCloseRequest() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CloseRequestPayload) =>
			CloseRequestApi.closeRequest(data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['request-details', variables.project_id.toString()],
			});
			queryClient.invalidateQueries({
				queryKey: ['my-requests'],
			});
		},
	});
}