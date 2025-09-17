import { AuthRole } from '@/shared/lib/roleMapper';
import { ProjectStatus } from './types';

export const API_ENDPOINTS: Record<AuthRole, string> = {
	1: 'homeowner',
	2: 'contractor',
	3: 'homeowner', //fallback
} as const;

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

/**
 * Cache Time for React Query
 */
export const CACHE_CONFIG = {
	PROFILE_STALE_TIME: 5 * 60 * 1000,
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
