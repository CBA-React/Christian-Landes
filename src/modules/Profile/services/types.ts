// API TYPES

export interface ApiSpecialityItem {
	id: number;
	user_id: number;
	value: string;
	created_at: string;
}

export interface ApiProfileData {
	id: number;
	full_name: string;
	email: string;
	phone?: string;
	location?: string;
	about?: string | null;
	speciality?: ApiSpecialityItem[];
	google_id?: string | null;
	facebook_id?: string | null;
	apple_id?: string | null;
	windows_id?: string | null;
	logo?: string | null;
	avg_reviews?: number;
	_count?: {
		reviews?: number;
	};
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
	images: string[];
	status: ProjectStatus;
	created_at: string;
	_count?: {
		bids?: number;
	};
}

export enum ProjectStatus {
	ACTIVE = 1,
	COMPLETED = 2,
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

export interface ContractorMetrics {
	countClosetProjects?: number;
	countBids?: number;
	totalPrice?: number;
}

export interface HomeownerMetrics {
	countProjects?: number;
	countBids?: number;
	countCompleted?: number;
	totalPrice?: number;
}

// LOCAL TYPES
export interface ProfileData {
	profile_id: string;
	name: string;
	email: string;
	avatar: string;
	role: 'contractor' | 'client';
	rating: number;
	reviewsCount: number;
	phone: string;
	location: string;
	about: string | null;
	specialities: string[]; // Always strings after transformation
}

export interface StatItem {
	label: string;
	value: string | number;
}

export interface ProjectStatusConfig {
	label: string;
	color: string;
	bgColor: string;
	textColor: string;
}

export interface ProjectDisplayData {
	project_id: string;
	title: string;
	category: string;
	location: string;
	budget: string;
	description: string;
	images: string[];
	status: ProjectStatusConfig;
	bidsCount: number;
	createdAt: string;
	postedDate: string;
	budgetFormatted: string;
}

// UTILITY TYPES

export interface LoadingState {
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
}

export interface DataLoadingState<T> extends LoadingState {
	data?: T;
}

export interface ProfileSectionConfig {
	id: string;
	label: string;
	icon: React.ReactNode;
}

export type {
	ProfileData as Profile,
	StatItem as Stat,
	ProjectDisplayData as Project,
	LoadingState as Loading,
};
