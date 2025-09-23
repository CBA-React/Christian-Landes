// modules/MyRequests/types/type.ts

// API response structure based on your actual data
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
	images: string[];
	status: number;
	created_at: string;
	_count: {
		bids: number;
	};
}

export interface RequestsResponse {
	data: ApiRequest[];
	pagination: {
		total: number;
		page: number;
		perPage: number;
		totalPages: number;
	};
}

// Transformed data for UI display
export interface RequestDisplayData {
	id: string;
	title: string;
	category: string;
	location: string;
	budget: string;
	budgetFormatted: string;
	description: string;
	images: string[];
	status: 'open' | 'closed' | 'auto-closed';
	statusBadge: {
		text: string;
		variant: 'open' | 'closed' | 'auto-closed';
	};
	bidsCount: number;
	createdAt: string;
	postedDate: string;
	preferredStart: string;
	completionWindow: string;
	daysActive?: number;
}

// Filter types - no categories, only status
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
	status?: 'open' | 'closed' | 'auto-closed' | 'all';
}

// Status filter for UI
export interface RequestStatusFilter {
	value: 'all' | 'open' | 'closed' | 'auto-closed';
	label: string;
	count?: number;
}
