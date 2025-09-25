import { PaginatedResponse } from '@/shared/types/paginatedItems';

export interface ApiImage {
	id: number;
	url: string;
	type: string;
	created_at: string;
}

export interface ApiProject {
	id: number;
	user_id: number;
	title: string;
	category: string;
	location: string;
	budget: number;
	preferred_start: string;
	completion_window: string;
	description: string;
	images: ApiImage[] | string[];
	status: number;
	created_at: string;
}

export type ProjectsResponse = PaginatedResponse<ApiProject>;

export interface ProjectDisplayData {
	id: string;
	title: string;
	category: string;
	location: string;
	budget: string;
	budgetFormatted: string;
	description: string;
	images: string[];
	status: 'active' | 'completed';
	createdAt: string;
	postedDate: string;
	preferredStart: string;
	completionWindow: string;
}

export interface ProjectFilters {
	page?: number;
	perPage?: number;
	location?: string;
	date?: string;
	budget?: {
		from?: number | string;
		to?: number | string;
	};
	bids?: string;
	search?: string;
	category?: string;
}

export interface SimpleProjectFilters {
	search?: string;
	category?: string;
	minBudget?: number;
	maxBudget?: number;
	location?: string;
}
