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
	images:
		| [
				{
					id: number;
					url: string;
					type: string;
					created_at: string;
				},
		  ]
		| string[];
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
	StatItem as Stat,
	ProjectDisplayData as Project,
	LoadingState as Loading,
};
