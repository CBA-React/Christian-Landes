import { PaginatedResponse } from '@/shared/types/paginatedItems';
import { RequestStatus, RequestStatusVariant } from '../requestStatus';

export interface ApiImage {
	id: number;
	url: string;
	type: string;
	created_at: string;
}

export interface ApiRequest {
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
	_count: {
		bids: number;
	};
}

export type RequestsResponse = PaginatedResponse<ApiRequest>;

export interface RequestDisplayData {
	id: string;
	title: string;
	category: string;
	location: string;
	budget: string;
	budgetFormatted: string;
	description: string;
	images: string[];
	status: RequestStatus;
	statusBadge: {
		text: string;
		variant: RequestStatusVariant;
	};
	bidsCount: number;
	createdAt: string;
	postedDate: string;
	preferredStart: string;
	completionWindow: string;
	daysActive?: number;
}

export interface RequestFilters {
	page?: number;
	perPage?: number;
	location?: string;
	date?: string;
	budget?: {
		from?: number | string;
		to?: number | string;
	};
	status?: string;
	search?: string;
}

export interface SimpleRequestFilters {
	search?: string;
	minBudget?: number;
	maxBudget?: number;
	location?: string;
	status?: RequestStatus | 'all';
}

export interface RequestStatusFilter {
	value: RequestStatus | 'all';
	label: string;
	count?: number;
	icon?: React.ReactNode;
	description?: string;
}

export interface RequestStats {
	total: number;
	open: number;
	closed: number;
	autoGlosed: number;
}

export interface RequestAction {
	id: string;
	type: 'close' | 'reopen' | 'delete' | 'edit';
	label: string;
	icon?: React.ReactNode;
	variant?: 'primary' | 'secondary' | 'danger';
	disabled?: boolean;
}

export type SortField = 'created_at' | 'budget' | 'bids_count' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface SortOptions {
	field: SortField;
	order: SortOrder;
}

export interface PaginationInfo {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export interface RequestFormData {
	title: string;
	description: string;
	category: string;
	location: string;
	budget: number;
	preferredStart: string;
	completionWindow: string;
	images?: File[];
}

export interface RequestFormErrors {
	title?: string;
	description?: string;
	category?: string;
	location?: string;
	budget?: string;
	preferredStart?: string;
	completionWindow?: string;
	images?: string;
}
