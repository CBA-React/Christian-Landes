// modules/MyRequests/types/type.ts

import {
	RequestStatus,
	RequestStatusVariant,
} from '@/shared/constants/requestStatus';

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
	images:
		| Array<{
				id: number;
				url: string;
				type: string;
				created_at: string;
		  }>
		| [];
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

// Transformed data for UI display - использует типы из requestStatus
export interface RequestDisplayData {
	id: string;
	title: string;
	category: string;
	location: string;
	budget: string;
	budgetFormatted: string;
	description: string;
	images: string[]; // После трансформации это массив URL строк
	status: RequestStatus; // Используем тип из requestStatus
	statusBadge: {
		text: string;
		variant: RequestStatusVariant; // Используем тип из requestStatus
	};
	bidsCount: number;
	createdAt: string;
	postedDate: string;
	preferredStart: string;
	completionWindow: string;
	daysActive?: number;
}

// Filter types - улучшенная типизация
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
	status?: RequestStatus | 'all'; // Используем тип из requestStatus
}

// Status filter for UI - более строгая типизация
export interface RequestStatusFilter {
	value: RequestStatus | 'all';
	label: string;
	count?: number;
	icon?: React.ReactNode;
	description?: string;
}

// Дополнительные типы для статистики и управления
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

// Типы для сортировки и пагинации
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

// Типы для форм и валидации
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
