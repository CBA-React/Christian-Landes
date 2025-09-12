// API TYPES

export interface ApiProfileData {
	id: number;
	full_name: string;
	email: string;
	phone: string;
	location: string;
	about: string | null;
	speciality: string[];
	google_id: string | null;
	facebook_id: string | null;
	apple_id: string | null;
	windows_id: string | null;
	logo: string | null;
	avg_reviews: number;
	_count: {
		reviews: number;
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
	_count: {
		bids: number;
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
	countClosetProjects: number;
	countBids: number;
	totalPrice: number;
}

export interface HomeownerMetrics {
	countProjects: number;
	countBids: number;
	countCompleted: number;
	totalPrice: number;
}

// LOCAL TYPES
export interface ProfileData {
	id: string;
	name: string;
	email: string;
	avatar: string;
	role: 'contractor' | 'client';
	rating: number;
	reviewsCount: number;
	phone: string;
	location: string;
	about: string | null;
	specialities: string[];
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
	id: string;
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

export type ProfileRole = 'contractor' | 'client';

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
	roles: ProfileRole[];
}

export type {
	ProfileData as Profile,
	StatItem as Stat,
	ProjectDisplayData as Project,
	LoadingState as Loading,
};
