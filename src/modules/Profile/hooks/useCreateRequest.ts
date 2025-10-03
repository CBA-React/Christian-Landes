import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateRequestApi } from '../services/CreateRequesteApi';
import type { CreateRequestPayload } from '../types';

export function useCreateRequest() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateRequestPayload) =>
			CreateRequestApi.CreateRequest(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile-projects'] });
			queryClient.invalidateQueries({ queryKey: ['my-requests'] });
		},
	});
}
