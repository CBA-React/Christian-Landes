export interface PaginationMeta {
	total: number;
	page: number;
	perPage: number;
	totalPages: number;
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: PaginationMeta;
}

export interface BaseFilters {
	search?: string;
	minBudget?: number;
	maxBudget?: number;
	location?: string;
}
