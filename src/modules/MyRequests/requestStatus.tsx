import OpenIcon from 'public/icons/profile/unlock.svg';
import ClosedIcon from 'public/icons/profile/lock.svg';
import AutoClosedIcon from 'public/icons/profile/clock.svg';
import OpenIconSmall from 'public/icons/profile/unlock-small.svg';
import ClosedIconSmall from 'public/icons/profile/lock-small.svg';
import AutoClosedIconSmall from 'public/icons/profile/clock-small.svg';

export const REQUEST_STATUSES = {
	OPEN: 'open',
	CLOSED: 'closed',
	AUTO_CLOSED: 'auto-closed',
	ALL: 'all',
} as const;

export const API_STATUS_MAP = {
	[REQUEST_STATUSES.OPEN]: '1',
	[REQUEST_STATUSES.CLOSED]: '2',
	[REQUEST_STATUSES.AUTO_CLOSED]: '3',
	[REQUEST_STATUSES.ALL]: '',
} as const;

export const STATUS_CONFIG = {
	[REQUEST_STATUSES.OPEN]: {
		label: 'Open',
		variant: 'open' as const,
		bgColor: 'bg-[#CFEDD9]',
		textColor: 'text-[#242424]',
		icon: <OpenIconSmall />,
		description: 'Request is active and accepting bids',
	},
	[REQUEST_STATUSES.CLOSED]: {
		label: 'Closed',
		variant: 'closed' as const,
		bgColor: 'bg-[#6B7280]',
		textColor: 'text-white',
		icon: <ClosedIconSmall />,
		description: 'Closed by client',
	},
	[REQUEST_STATUSES.AUTO_CLOSED]: {
		label: 'Auto-closed',
		variant: 'auto-closed' as const,
		bgColor: 'bg-[#F97316]',
		textColor: 'text-white',
		icon: <AutoClosedIconSmall />,
		description: 'Auto-closed after 30 days',
	},
} as const;

export const FILTER_STATUS_OPTIONS = [
	{
		id: 'all',
		name: 'All',
		slug: REQUEST_STATUSES.ALL,
		icon: 'grid',
	},
	{
		id: 'open',
		name: STATUS_CONFIG[REQUEST_STATUSES.OPEN].label,
		slug: REQUEST_STATUSES.OPEN,
		icon: <OpenIcon />,
	},
	{
		id: 'closed',
		name: STATUS_CONFIG[REQUEST_STATUSES.CLOSED].label,
		slug: REQUEST_STATUSES.CLOSED,
		icon: <ClosedIcon />,
	},
	{
		id: 'auto-closed',
		name: STATUS_CONFIG[REQUEST_STATUSES.AUTO_CLOSED].label,
		slug: REQUEST_STATUSES.AUTO_CLOSED,
		icon: <AutoClosedIcon />,
	},
] as const;

export type RequestStatus =
	(typeof REQUEST_STATUSES)[keyof typeof REQUEST_STATUSES];
export type RequestStatusVariant = keyof typeof STATUS_CONFIG;
export type StatusIconType = 'check' | 'x-circle' | 'clock' | 'grid';
