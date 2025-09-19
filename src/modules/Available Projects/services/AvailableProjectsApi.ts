import { axiosInstance } from '@/shared/lib/axiosInstance';
import type {
	ProjectsResponse,
	ApiProject,
	ProjectDisplayData,
	ProjectFilters,
} from '../types/type';

export class ProjectsApi {
	static async getProjects(params: {
		page?: number;
		perPage?: number;
		filters?: ProjectFilters;
	}): Promise<ProjectsResponse> {
		const { page = 1, perPage = 6, filters } = params;

		const queryParams = new URLSearchParams({
			page: page.toString(),
			perPage: perPage.toString(),
		});

		if (filters?.search) queryParams.append('search', filters.search);
		if (filters?.category) queryParams.append('category', filters.category);
		if (filters?.minBudget)
			queryParams.append('minBudget', filters.minBudget.toString());
		if (filters?.maxBudget)
			queryParams.append('maxBudget', filters.maxBudget.toString());
		if (filters?.location) queryParams.append('location', filters.location);

		const response = await axiosInstance.get<ProjectsResponse>(
			`contractor/project/getProjects?${queryParams.toString()}`,
		);

		return response.data;
	}

	static transformProjectsForDisplay(
		projects: ApiProject[],
	): ProjectDisplayData[] {
		return projects.map((project) => ({
			id: project.id.toString(),
			title: project.title,
			category: project.category,
			location: project.location,
			budget: project.budget.toString(),
			budgetFormatted: `$${project.budget.toLocaleString()}`,
			description: project.description,
			images:
				project.images?.length > 0
					? project.images
					: ['/images/project-placeholder.png'],
			status: project.status === 1 ? 'active' : 'completed',
			createdAt: project.created_at,
			postedDate: this.formatDate(project.created_at),
			preferredStart: project.preferred_start,
			completionWindow: project.completion_window,
		}));
	}

	private static formatDate(dateString: string): string {
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				month: 'short',
				day: '2-digit',
			});
		} catch {
			return 'N/A';
		}
	}
}
