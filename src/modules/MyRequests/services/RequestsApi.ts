import { axiosInstance } from '@/shared/lib/axiosInstance';
import {
	processImages,
	formatDate,
	formatBudget,
} from '@/shared/lib/formatUtils';
import type {
	ApiRequest,
	RequestDisplayData,
	SimpleRequestFilters,
	RequestFilters,
	RequestsResponse,
} from '../types/type';
import {
	REQUEST_STATUSES,
	API_STATUS_MAP,
	STATUS_CONFIG,
} from '../requestStatus';

import type {
	ApiRequestDetails,
	RequestDetailsDisplayData,
	BidDisplayData,
	ApiBid,
} from '../types/requestDetails';

export class RequestsApi {
	static async getRequests(params: {
		page?: number;
		perPage?: number;
		filters?: SimpleRequestFilters;
	}): Promise<RequestsResponse> {
		const { page = 1, perPage = 6, filters = {} } = params;

		const hasFilters = Boolean(
			(filters.status && filters.status !== 'all') ||
				(filters.search && filters.search) ||
				(filters.minBudget && filters.minBudget > 0) ||
				(filters.maxBudget && filters.maxBudget > 0) ||
				(filters.location && filters.location) ||
				(filters.date && filters.date) ||
				(filters.bids && filters.bids),
		);

		try {
			let response;

			if (hasFilters) {
				const requestBody: RequestFilters = {
					page,
					perPage,
					status:
						API_STATUS_MAP[
							filters.status as keyof typeof API_STATUS_MAP
						] || API_STATUS_MAP.all,
					search: filters.search || '',
					location: filters.location || '',
					budget: {
						from: filters.minBudget || 0,
						to: filters.maxBudget || 0,
					},
					date: filters.date || '',
					bids: filters.bids || '',
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
			console.error('Error fetching requests:', error);
			throw error;
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
				budgetFormatted: formatBudget(request.budget),
				description: request.description,
				images: processImages(request.images),
				status,
				statusBadge,
				bidsCount: request._count.bids,
				createdAt: request.created_at,
				postedDate: formatDate(request.created_at),
				preferredStart: request.preferred_start,
				completionWindow: request.completion_window,
				daysActive:
					status === REQUEST_STATUSES.OPEN
						? this.calculateDaysActive(request.created_at)
						: undefined,
			};
		});
	}

	static async getRequestById(id: string): Promise<ApiRequestDetails> {
		try {
			const response = await axiosInstance.get<ApiRequestDetails>(
				`homeowner/project/${id}`,
			);
			return response.data;
		} catch (error) {
			console.error('Error fetching request details:', error);
			throw error;
		}
	}

	static transformBidForDisplay(bid: ApiBid): BidDisplayData {
		return {
			id: bid.id.toString(),
			amount: bid.bid,
			amountFormatted: formatBudget(bid.bid),
			contractorId: bid.user.id.toString(),
			contractorName: bid.user.full_name,
			contractorEmail: bid.user.email,
			contractorPhone: bid.user.phone,
			contractorLogo: bid.user.logo?.url || null,
			specialities: bid.user.speciality.map((s) => s.value),
			beginWork: bid.begin_work,
			estimate: bid.estimate,
			message: bid.message,
			status: bid.status,
			createdAt: bid.created_at,
			postedDate: formatDate(bid.created_at),
		};
	}

	static transformRequestDetailsForDisplay(
		request: ApiRequestDetails,
	): RequestDetailsDisplayData {
		const status = this.mapRequestStatus(request.status);
		const statusBadge = this.getStatusBadge(status);

		const bids = request.bids.map((bid) =>
			this.transformBidForDisplay(bid),
		);

		return {
			id: request.id.toString(),
			title: request.title,
			category: request.category,
			location: request.location,
			budget: request.budget,
			budgetFormatted: formatBudget(request.budget),
			preferredStart: request.preferred_start,
			completionWindow: request.completion_window,
			description: request.description,
			images: processImages(request.images),
			status,
			statusBadge,
			createdAt: request.created_at,
			postedDate: formatDate(request.created_at),
			bidsCount: bids.length,
			bids,
			daysActive:
				status === REQUEST_STATUSES.OPEN
					? this.calculateDaysActive(request.created_at)
					: undefined,
		};
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
}
