import { AuthRole } from '@/shared/lib/roleMapper';

export const API_ENDPOINTS: Record<AuthRole, string> = {
	1: 'homeowner',
	2: 'contractor',
	3: 'homeowner', // fallback
} as const;

export const CONTRACTOR_SPECIALITIES = [
	'Handyperson',
	'Landscaping',
	'Plumbing',
	'Remodeling',
	'Electrical',
	'Painting',
	'Roofing',
	'Flooring',
	'Renovation',
	'Electrical Plumbing',
] as const;

export const CLIENT_TYPICAL_PROJECTS = [
	'Home Renovation',
	'Bathroom Remodel',
	'Kitchen Remodeling',
	'Landscaping',
	'Roof Repair',
	'Flooring Installation',
	'Painting Services',
	'Electrical Work',
	'Plumbing Services',
] as const;

export const PROFILE_CACHE_CONFIG = {
	PROFILE_STALE_TIME: 5 * 60 * 1000,
} as const;
