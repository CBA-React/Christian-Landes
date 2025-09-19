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
	images: string[];
	status: number;
	created_at: string;
}

export interface ProjectsResponse {
	data: ApiProject[];
	pagination: {
		total: number;
		page: number;
		perPage: number;
		totalPages: number;
	};
}

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
	search?: string;
	category?: string;
	minBudget?: number;
	maxBudget?: number;
	location?: string;
}
