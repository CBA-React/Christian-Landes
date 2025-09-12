import { axiosInstance } from '@/shared/lib/axiosInstance';
import { AuthRole } from '@/shared/lib/roleMapper';
import type {
	ApiProfileData,
	ApiProject,
	ProjectsResponse,
	ContractorMetrics,
	HomeownerMetrics,
	ProfileData,
	StatItem,
	ProjectDisplayData,
	ProjectStatus,
} from './types';

import { PROJECT_STATUS_CONFIG, API_ENDPOINTS } from './constants';

export class ProfileApi {
	private static getEndpoint(authRole: AuthRole): string {
		return API_ENDPOINTS[authRole] || API_ENDPOINTS[1];
	}

	static async getProfile(authRole: AuthRole): Promise<ProfileData> {
		const endpoint = this.getEndpoint(authRole);

		const response = await axiosInstance.get<ApiProfileData>(
			`/${endpoint}/profile`,
		);

		return this.transformProfileData(response.data, authRole);
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

	/**
	 * Transforming API profile into local format
	 */
	private static transformProfileData(
		apiData: ApiProfileData,
		authRole: AuthRole,
	): ProfileData {
		return {
			id: apiData.id.toString(),
			name: apiData.full_name,
			email: apiData.email,
			avatar: apiData.logo || '/images/Profile/mock-avatar.jpg',
			role: authRole === 2 ? 'contractor' : 'client',
			rating: apiData.avg_reviews,
			reviewsCount: apiData._count.reviews,
			phone: apiData.phone,
			location: apiData.location,
			about: apiData.about,
			specialities: apiData.speciality,
		};
	}

	private static transformMetricsData(
		apiData: ContractorMetrics | HomeownerMetrics,
		authRole: AuthRole,
	): StatItem[] {
		if (authRole === 2) {
			const data = apiData as ContractorMetrics;
			return [
				{ label: 'Active Projects', value: data.countClosetProjects },
				{ label: 'Submitted Bids', value: data.countBids },
				{
					label: 'Total Earnings',
					value: `$${data.totalPrice.toLocaleString()}`,
				},
			];
		} else {
			const data = apiData as HomeownerMetrics;
			return [
				{ label: 'Projects Posted', value: data.countProjects },
				{ label: 'Bids Received', value: data.countBids },
				{ label: 'Projects Completed', value: data.countCompleted },
				{
					label: 'Total Spent',
					value: `$${data.totalPrice.toLocaleString()}`,
				},
			];
		}
	}

	/**
	 * Transforming projects for display
	 */
	static transformProjectsForDisplay(
		projects: ApiProject[],
	): ProjectDisplayData[] {
		return projects.map((project) => ({
			id: project.id.toString(),
			title: project.title,
			category: project.category,
			location: project.location,
			budget: project.budget.toString(),
			description: project.description,
			images:
				project.images && project.images.length > 0
					? project.images
					: ['/images/profile/project-placeholder.png'],
			status: PROJECT_STATUS_CONFIG[project.status as ProjectStatus],
			bidsCount: project._count.bids,
			createdAt: project.created_at,
			postedDate: this.formatDate(project.created_at),
			budgetFormatted: `$${project.budget.toLocaleString()}`,
		}));
	}

	/**
	 * Formatting date in "Aug 02" format
	 */
	private static formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: '2-digit',
		});
	}
}
