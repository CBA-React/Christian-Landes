import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RespondToProjectApi } from '../services/RespondToProjectApi';
import type { RespondToProjectPayload } from '../types/type';

export function useRespondToProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: RespondToProjectPayload) =>
			RespondToProjectApi.respondToProject(data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['project-details', variables.project_id.toString()],
			});
			queryClient.invalidateQueries({
				queryKey: ['available-projects'],
			});
			queryClient.invalidateQueries({
				queryKey: ['my-bids'],
				exact: false,
			});
		},
	});
}
