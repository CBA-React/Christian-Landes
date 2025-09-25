import { axiosInstance } from '@/shared/lib/axiosInstance';
import {
	processImages,
	formatDate,
	formatBudget,
} from '@/shared/lib/formatUtils';
import type {
	ApiProject,
	ProjectDisplayData,
	SimpleProjectFilters,
	ProjectFilters,
	ProjectsResponse,
} from '../types/type';

export class AvailableProjectsApi {
	static async getProjects(params: {
		page?: number;
		perPage?: number;
		filters?: SimpleProjectFilters;
	}): Promise<ProjectsResponse> {
		const { page = 1, perPage = 6, filters = {} } = params;

		const hasFilters = Boolean(
			(filters.category && filters.category) ||
				(filters.search && filters.search) ||
				(filters.minBudget && filters.minBudget > 0) ||
				(filters.maxBudget && filters.maxBudget > 0) ||
				(filters.location && filters.location),
		);

		try {
			let response;

			if (hasFilters) {
				const requestBody: ProjectFilters = {
					page,
					perPage,
					location: filters.location || '',
					date: '',
					budget: {
						from: filters.minBudget || 0,
						to: filters.maxBudget || 0,
					},
					bids: '',
					search: filters.search || '',
					category: filters.category || '',
				};

				response = await axiosInstance.post(
					'contractor/project/getProjects',
					requestBody,
				);
			} else {
				const queryParams = `page=${page}&perPage=${perPage}`;
				response = await axiosInstance.get(
					`contractor/project/getProjects?${queryParams}`,
				);
			}

			return response.data as ProjectsResponse;
		} catch (error) {
			console.error('Error fetching projects:', error);
			throw error;
		}
	}

	static transformProjectsForDisplay(
		projects: ApiProject[],
	): ProjectDisplayData[] {
		if (!Array.isArray(projects)) {
			console.warn('Projects is not an array:', projects);
			return [];
		}

		return projects.map((project) => ({
			id: project.id.toString(),
			title: project.title,
			category: project.category,
			location: project.location,
			budget: project.budget.toString(),
			budgetFormatted: formatBudget(project.budget),
			description: project.description,
			images: processImages(project.images),
			status: project.status === 1 ? 'active' : 'completed',
			createdAt: project.created_at,
			postedDate: formatDate(project.created_at),
			preferredStart: project.preferred_start,
			completionWindow: project.completion_window,
		}));
	}
}
