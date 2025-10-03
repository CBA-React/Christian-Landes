import { PaginatedResponse } from '@/shared/types/paginatedItems';
import { BidStatus, BidStatusVariant } from './bidStatus';

export interface ApiImage {
	id: number;
	url: string;
	type: string;
	created_at: string;
}

export interface ApiBid {
	id: number;
	bid: number;
	user_id: number;
	project_id: number;
	begin_work: string;
	estimate: string;
	message: string;
	status: number;
	created_at: string;
}

export interface ApiProjectWithBids {
	id: number;
	user_id: number;
	title: string;
	category: string;
	location: string;
	budget: number;
	preferred_start: string;
	completion_window: string;
	description: string;
	images: ApiImage[];
	status: number;
	created_at: string;
	bids: ApiBid[];
}

export type BidsResponse = PaginatedResponse<ApiProjectWithBids>;

export interface BidDisplayData {
	// Bid info
	id: string;
	bidAmount: number;
	bidAmountFormatted: string;
	beginWork: string;
	estimate: string;
	message: string;
	bidStatus: BidStatus;
	bidStatusBadge: {
		text: string;
		variant: BidStatusVariant;
	};
	createdAt: string;
	postedDate: string;

	// Project info
	projectId: string;
	projectTitle: string;
	projectCategory: string;
	projectLocation: string;
	projectBudget: number;
	projectBudgetFormatted: string;
	projectDescription: string;
	projectImages: string[];
	projectStatus: number;
}

export interface SimpleBidFilters {
	status?: BidStatus | 'all';
}

export interface BidFilters {
	page?: number;
	perPage?: number;
	status?: string;
}
