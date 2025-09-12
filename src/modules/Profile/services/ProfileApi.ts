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
	ApiSpecialityItem,
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
		const specialities = this.transformSpecialities(apiData.speciality);

		return {
			profile_id: apiData.id.toString(),
			name: apiData.full_name,
			email: apiData.email,
			avatar: apiData.logo || '/images/Profile/mock-avatar.jpg',
			role: authRole === 2 ? 'contractor' : 'client',
			rating: apiData.avg_reviews || 0,
			reviewsCount: apiData._count?.reviews || 0,
			phone: apiData.phone || '',
			location: apiData.location || '',
			about: apiData.about || null,
			specialities,
		};
	}

	/**
	 * Transform specialities to ensure they're strings
	 */
	private static transformSpecialities(
		speciality: ApiSpecialityItem[] | undefined,
	): string[] {
		if (!speciality || !Array.isArray(speciality)) {
			return [];
		}

		return speciality
			.map((item: ApiSpecialityItem) => item.value)
			.filter(Boolean); 
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

	/**
	 * Transforming projects for display
	 */
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
				project.images && project.images.length > 0
					? project.images
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

	/**
	 * Formatting date in "Aug 02" format
	 */
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
