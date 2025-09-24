// modules/MyRequests/services/RequestsApi.ts
import { axiosInstance } from '@/shared/lib/axiosInstance';
import type {
	RequestsResponse,
	ApiRequest,
	RequestDisplayData,
	SimpleRequestFilters,
} from '../type';
import {
	REQUEST_STATUSES,
	API_STATUS_MAP,
	STATUS_CONFIG,
} from '@/shared/constants/requestStatus';

export class RequestsApi {
	static async getRequests(params: {
		page?: number;
		perPage?: number;
		filters?: SimpleRequestFilters;
	}): Promise<RequestsResponse> {
		const { page = 1, perPage = 6, filters = {} } = params;

		try {
			const requestBody = {
				page,
				perPage,
				status:
					API_STATUS_MAP[
						filters.status as keyof typeof API_STATUS_MAP
					] || API_STATUS_MAP.all,
				search: filters.search || '',
				location: filters.location || '',
				minBudget: filters.minBudget || 0,
				maxBudget: filters.maxBudget || 0,
			};

			const response = await axiosInstance.post(
				'homeowner/project/getProjects',
				requestBody,
			);

			return response.data as RequestsResponse;
		} catch (error) {
			console.error('Error fetching requests:', error);
			throw error;
		}
	}

	static transformRequestsForDisplay(
		requests: ApiRequest[],
	): RequestDisplayData[] {
		if (!Array.isArray(requests)) {
			console.warn('Requests is not an array:', requests);
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
				images: this.processImages(request.images),
				status,
				statusBadge,
				bidsCount: request._count.bids,
				createdAt: request.created_at,
				postedDate: this.formatDate(request.created_at),
				preferredStart: request.preferred_start,
				completionWindow: request.completion_window,
				daysActive:
					status === REQUEST_STATUSES.OPEN
						? this.calculateDaysActive(request.created_at)
						: undefined,
			};
		});
	}

	private static processImages(images: ApiRequest['images']): string[] {
		if (!images || !Array.isArray(images) || images.length === 0) {
			return ['/images/profile/project-placeholder.png'];
		}

		return images.map((img: any) => {
			if (typeof img === 'string') {
				return img;
			}
			if (typeof img === 'object' && img.url) {
				return img.url;
			}
			return '/images/profile/project-placeholder.png';
		});
	}

	private static mapRequestStatus(
		statusCode: number,
	): 'open' | 'closed' | 'auto-closed' {
		switch (statusCode) {
			case 1:
				return REQUEST_STATUSES.OPEN;
			case 2:
				return REQUEST_STATUSES.CLOSED;
			case 3:
				return REQUEST_STATUSES.AUTO_CLOSED;
			default:
				console.warn('Unknown status code:', statusCode);
				return REQUEST_STATUSES.AUTO_CLOSED;
		}
	}

	private static getStatusBadge(status: 'open' | 'closed' | 'auto-closed') {
		const config = STATUS_CONFIG[status];
		return {
			text: config.label,
			variant: config.variant,
		};
	}

	private static calculateDaysActive(createdAt: string): number {
		try {
			const created = new Date(createdAt);
			const now = new Date();

			// Проверяем валидность даты
			if (isNaN(created.getTime())) {
				console.warn('Invalid date string:', createdAt);
				return 0;
			}

			const diffTime = Math.abs(now.getTime() - created.getTime());
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			return diffDays;
		} catch (error) {
			console.error('Error calculating days active:', error);
			return 0;
		}
	}

	private static formatDate(dateString: string): string {
		try {
			const date = new Date(dateString);

			// Проверяем валидность даты
			if (isNaN(date.getTime())) {
				console.warn('Invalid date string:', dateString);
				return 'N/A';
			}

			return date.toLocaleDateString('en-US', {
				month: 'short',
				day: '2-digit',
			});
		} catch (error) {
			console.error('Error formatting date:', error);
			return 'N/A';
		}
	}

	static async closeRequest(requestId: string): Promise<void> {
		try {
			await axiosInstance.post(`homeowner/project/${requestId}/close`);
		} catch (error) {
			console.error('Error closing request:', error);
			throw new Error('Failed to close request. Please try again.');
		}
	}

	static async reopenRequest(requestId: string): Promise<void> {
		try {
			await axiosInstance.post(`homeowner/project/${requestId}/reopen`);
		} catch (error) {
			console.error('Error reopening request:', error);
			throw new Error('Failed to reopen request. Please try again.');
		}
	}

	static async deleteRequest(requestId: string): Promise<void> {
		try {
			await axiosInstance.delete(`homeowner/project/${requestId}`);
		} catch (error) {
			console.error('Error deleting request:', error);
			throw new Error('Failed to delete request. Please try again.');
		}
	}

	static async getStatusCounts(): Promise<Record<string, number>> {
		try {
			const response = await axiosInstance.get('homeowner/project/stats');
			return response.data as Record<string, number>;
		} catch (error) {
			console.error('Error fetching status counts:', error);
			return {};
		}
	}
}
