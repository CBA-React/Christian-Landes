import { useQuery } from '@tanstack/react-query';
import { AvailableProjectsApi } from '../services/AvailableProjectsApi';
import type { ProjectDetailsDisplayData } from '../types/projectDetails';

export function useProjectDetails(projectId: string) {
	return useQuery({
		queryKey: ['project-details', projectId],
		queryFn: async (): Promise<ProjectDetailsDisplayData> => {
			const data = await AvailableProjectsApi.getProjectById(projectId);
			return AvailableProjectsApi.transformProjectDetailsForDisplay(data);
		},
		enabled: !!projectId,
		staleTime: 2 * 60 * 1000,
		retry: 2,
	});
}
