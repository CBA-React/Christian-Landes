// modules/MyRequests/services/RequestsApi.ts
import { axiosInstance } from '@/shared/lib/axiosInstance';
import type {
	RequestsResponse,
	ApiRequest,
	RequestDisplayData,
	RequestFilters,
	SimpleRequestFilters,
} from '../type';

export class RequestsApi {
	static async getRequests(params: {
		page?: number;
		perPage?: number;
		filters?: SimpleRequestFilters;
	}): Promise<RequestsResponse> {
		const { page = 1, perPage = 6, filters = {} } = params;

		const hasFilters = Boolean(
			(filters.search && filters.search) ||
				(filters.minBudget && filters.minBudget > 0) ||
				(filters.maxBudget && filters.maxBudget > 0) ||
				(filters.location && filters.location) ||
				(filters.status && filters.status !== 'all'),
		);

		try {
			let response;

			if (hasFilters) {
				const requestBody: RequestFilters = {
					page,
					perPage,
					location: filters.location || '',
					date: '',
					budget: {
						from: filters.minBudget || 0,
						to: filters.maxBudget || 0,
					},
					status: filters.status || 'all',
					search: filters.search || '',
				};

				response = await axiosInstance.post(
					'homeowner/project/getProjects',
					requestBody,
				);
			} else {
				const queryParams = `page=${page}&perPage=${perPage}`;
				response = await axiosInstance.get(
					`homeowner/project/getProjects?${queryParams}`,
				);
			}

			return response.data as RequestsResponse;
		} catch (error) {
			throw error;
		}
	}

	static transformRequestsForDisplay(
		requests: ApiRequest[],
	): RequestDisplayData[] {
		if (!Array.isArray(requests)) {
			return [];
		}

		return requests.map((request) => {
			const status = this.mapRequestStatus(request.status);
			const statusBadge = this.getStatusBadge(status);

			return {
				id: request.id.toString(),
				title: request.title,
				category: request.category,
				location: request.location,
				budget: request.budget.toString(),
				budgetFormatted: `$${request.budget.toLocaleString()}`,
				description: request.description,
				images:
					request.images?.length > 0
						? request.images
						: ['/images/profile/project-placeholder.png'],
				status,
				statusBadge,
				bidsCount: request._count.bids,
				createdAt: request.created_at,
				postedDate: this.formatDate(request.created_at),
				preferredStart: request.preferred_start,
				completionWindow: request.completion_window,
				daysActive:
					status === 'open'
						? this.calculateDaysActive(request.created_at)
						: undefined,
			};
		});
	}

	private static mapRequestStatus(
		statusCode: number,
	): 'open' | 'closed' | 'auto-closed' {
		switch (statusCode) {
			case 1:
				return 'open';
			case 2:
				return 'closed';
			case 0:
			default:
				return 'auto-closed';
		}
	}

	private static getStatusBadge(status: 'open' | 'closed' | 'auto-closed') {
		switch (status) {
			case 'open':
				return { text: 'Open', variant: 'open' as const };
			case 'closed':
				return { text: 'Closed', variant: 'closed' as const };
			case 'auto-closed':
				return { text: 'Auto-closed', variant: 'auto-closed' as const };
		}
	}

	private static calculateDaysActive(createdAt: string): number {
		const created = new Date(createdAt);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - created.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
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

	// Методы управления проектами (можешь добавить позже)
	static async closeRequest(requestId: string): Promise<void> {
		await axiosInstance.post(`homeowner/project/${requestId}/close`);
	}

	static async reopenRequest(requestId: string): Promise<void> {
		await axiosInstance.post(`homeowner/project/${requestId}/reopen`);
	}

	static async deleteRequest(requestId: string): Promise<void> {
		await axiosInstance.delete(`homeowner/project/${requestId}`);
	}
}
