import { ProjectStatus } from './types';

export const PROJECT_STATUS_CONFIG = {
	[ProjectStatus.ACTIVE]: {
		label: 'Active',
		color: 'blue',
		bgColor: 'bg-blue-100',
		textColor: 'text-blue-800',
	},
	[ProjectStatus.COMPLETED]: {
		label: 'Completed',
		color: 'green',
		bgColor: 'bg-green-100',
		textColor: 'text-green-800',
	},
} as const;

export const PROFILE_CACHE_CONFIG = {
	STATS_STALE_TIME: 2 * 60 * 1000,
	PROJECTS_STALE_TIME: 3 * 60 * 1000,
	STATS_REFETCH_INTERVAL: 5 * 60 * 1000,
} as const;

export enum ProfileSection {
	OVERVIEW = 'overview',
	AVAILABLE_PROJECTS = 'available_projects',
	MY_BIDS = 'my_bids',
	MY_REQUESTS = 'my_requests',
	CONTRACTORS = 'contractors',
	REVIEWS = 'reviews',
	PRICING_PLAN = 'pricing_plan',
}
