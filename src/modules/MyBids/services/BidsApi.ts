import { axiosInstance } from '@/shared/lib/axiosInstance';
import {
	processImages,
	formatDate,
	formatBudget,
} from '@/shared/lib/formatUtils';
import type {
	ApiProjectWithBids,
	BidDisplayData,
	SimpleBidFilters,
	BidsResponse,
} from '../bidTypes';
import {
	BID_STATUSES,
	API_BID_STATUS_MAP,
	BID_STATUS_CONFIG,
} from '../bidStatus';

export class BidsApi {
	static async getBids(params: {
		page?: number;
		perPage?: number;
		filters?: SimpleBidFilters;
	}): Promise<BidsResponse> {
		const { page = 1, perPage = 12, filters = {} } = params;

		try {
			const queryParams = new URLSearchParams({
				page: page.toString(),
				perPage: perPage.toString(),
			});

			if (filters.status && filters.status !== 'all') {
				const statusCode =
					API_BID_STATUS_MAP[
						filters.status as keyof typeof API_BID_STATUS_MAP
					];
				if (statusCode) {
					queryParams.append('status', statusCode);
				}
			}

			const response = await axiosInstance.get(
				`contractor/bids/getBids?${queryParams.toString()}`,
			);

			return response.data as BidsResponse;
		} catch (error) {
			console.error('Error fetching bids:', error);
			throw error;
		}
	}

	static transformBidsForDisplay(
		projects: ApiProjectWithBids[],
	): BidDisplayData[] {
		if (!Array.isArray(projects)) {
			console.warn('Projects is not an array:', projects);
			return [];
		}

		const flattenedBids: BidDisplayData[] = [];

		projects.forEach((project) => {
			if (!project.bids || !Array.isArray(project.bids)) {
				return;
			}

			project.bids.forEach((bid) => {
				const bidStatus = this.mapBidStatus(project.status);
				const bidStatusBadge = this.getStatusBadge(bidStatus);

				flattenedBids.push({
					id: bid.id.toString(),
					bidAmount: bid.bid,
					bidAmountFormatted: formatBudget(bid.bid),
					beginWork: bid.begin_work,
					estimate: bid.estimate,
					message: bid.message,
					bidStatus,
					bidStatusBadge,
					createdAt: bid.created_at,
					postedDate: formatDate(bid.created_at),

					projectId: project.id.toString(),
					projectTitle: project.title,
					projectCategory: project.category,
					projectLocation: project.location,
					projectBudget: project.budget,
					projectBudgetFormatted: formatBudget(project.budget),
					projectDescription: project.description,
					projectImages: processImages(project.images),
					projectStatus: project.status,
				});
			});
		});

		return flattenedBids;
	}

	private static mapBidStatus(
		statusCode: number,
	): 'waiting' | 'closed' | 'auto-closed' {
		switch (statusCode) {
			case 1:
				return BID_STATUSES.WAITING;
			case 2:
				return BID_STATUSES.CLOSED;
			case 3:
				return BID_STATUSES.AUTO_CLOSED;
			default:
				console.warn('Unknown bid status code:', statusCode);
				return BID_STATUSES.WAITING;
		}
	}

	private static getStatusBadge(
		status: 'waiting' | 'closed' | 'auto-closed',
	) {
		const config = BID_STATUS_CONFIG[status];
		return {
			text: config.label,
			variant: config.variant,
		};
	}
}
