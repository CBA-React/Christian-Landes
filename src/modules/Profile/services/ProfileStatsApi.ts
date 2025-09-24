import { axiosInstance } from '@/shared/lib/axiosInstance';
import { AuthRole } from '@/shared/lib/roleMapper';
import { API_ENDPOINTS } from '@/shared/constants/profile';
import type {
	ApiProject,
	ProjectsResponse,
	ContractorMetrics,
	HomeownerMetrics,
	StatItem,
	ProjectDisplayData,
	ProjectStatus,
} from '../types';
import { PROJECT_STATUS_CONFIG } from '../constants';

export class ProfileStatsApi {
	private static getEndpoint(authRole: AuthRole): string {
		return API_ENDPOINTS[authRole] || API_ENDPOINTS[1];
	}

	static async getMetrics(authRole: AuthRole): Promise<StatItem[]> {
		const endpoint = this.getEndpoint(authRole);

		const response = await axiosInstance.get<
			ContractorMetrics | HomeownerMetrics
		>(`/${endpoint}/overview/metrics`);

		return this.transformMetricsData(response.data, authRole);
	}

	static async getProjects(
		authRole: AuthRole,
		page: number = 1,
		perPage: number = 6,
	): Promise<ProjectsResponse> {
		const endpoint = this.getEndpoint(authRole);
		const response = await axiosInstance.get<ProjectsResponse>(
			`/${endpoint}/project/getProjects?page=${page}&perPage=${perPage}`,
		);
		return response.data;
	}

	private static transformMetricsData(
		apiData: ContractorMetrics | HomeownerMetrics,
		authRole: AuthRole,
	): StatItem[] {
		if (authRole === 2) {
			const data = apiData as ContractorMetrics;
			return [
				{
					label: 'Active Projects',
					value: data.countClosetProjects || 0,
				},
				{ label: 'Submitted Bids', value: data.countBids || 0 },
				{
					label: 'Total Earnings',
					value: `$${(data.totalPrice || 0).toLocaleString()}`,
				},
			];
		} else {
			const data = apiData as HomeownerMetrics;
			return [
				{ label: 'Projects Posted', value: data.countProjects || 0 },
				{ label: 'Bids Received', value: data.countBids || 0 },
				{
					label: 'Projects Completed',
					value: data.countCompleted || 0,
				},
				{
					label: 'Total Spent',
					value: `$${(data.totalPrice || 0).toLocaleString()}`,
				},
			];
		}
	}

	static transformProjectsForDisplay(
		projects: ApiProject[],
	): ProjectDisplayData[] {
		if (!projects || !Array.isArray(projects)) return [];

		return projects.map((project) => ({
			project_id: project.id.toString(),
			title: project.title || 'Untitled Project',
			category: project.category || 'General',
			location: project.location || 'Location not specified',
			budget: project.budget?.toString() || '0',
			description: project.description || '',
			images:
				project.images?.length > 0
					? project.images.map((img) =>
							typeof img === 'string' ? img : img.url,
						)
					: ['/images/profile/project-placeholder.png'],
			status: PROJECT_STATUS_CONFIG[project.status as ProjectStatus],
			bidsCount: project._count?.bids || 0,
			createdAt: project.created_at || new Date().toISOString(),
			postedDate: this.formatDate(
				project.created_at || new Date().toISOString(),
			),
			budgetFormatted: `$${(project.budget || 0).toLocaleString()}`,
		}));
	}

	private static formatDate(dateString: string): string {
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				month: 'short',
				day: '2-digit',
			});
		} catch (error) {
			return 'N/A';
		}
	}
}
