import ClockIcon from 'public/icons/profile/clock.svg';
import CancellIcon from 'public/icons/profile/cancell-black.svg';
import WatchIcon from 'public/icons/profile/watch.svg';
import ClockIconSmall from 'public/icons/profile/clock.svg';
import CancellIconSmall from 'public/icons/profile/cancell-black.svg';
import WatchIconSmall from 'public/icons/profile/watch.svg';

export const BID_STATUSES = {
	WAITING: 'waiting',
	CLOSED: 'closed',
	AUTO_CLOSED: 'auto-closed',
	ALL: 'all',
} as const;

export const API_BID_STATUS_MAP = {
	[BID_STATUSES.WAITING]: '1',
	[BID_STATUSES.CLOSED]: '2',
	[BID_STATUSES.AUTO_CLOSED]: '3',
	[BID_STATUSES.ALL]: '',
} as const;

export const BID_STATUS_CONFIG = {
	[BID_STATUSES.WAITING]: {
		label: 'Waiting for Client',
		variant: 'waiting' as const,
		bgColor: 'bg-[#64DEFD]',
		textColor: 'text-[#242424]',
		icon: <ClockIconSmall />,
		description: 'Awaiting client response',
	},
	[BID_STATUSES.CLOSED]: {
		label: 'Request Closed',
		variant: 'closed' as const,
		bgColor: 'bg-[#FD6464]',
		textColor: 'text-[#242424]',
		icon: <CancellIconSmall />,
		description: 'Request closed by client',
	},
	[BID_STATUSES.AUTO_CLOSED]: {
		label: 'Auto-Closed',
		variant: 'auto-closed' as const,
		bgColor: 'bg-[#FDCA64]',
		textColor: 'text-[#242424]',
		icon: <WatchIconSmall />,
		description: 'Auto-closed after 30 days',
	},
} as const;

export const FILTER_BID_STATUS_OPTIONS = [
	{
		id: 'all',
		name: 'All',
		slug: BID_STATUSES.ALL,
		icon: 'grid',
	},
	{
		id: 'waiting',
		name: BID_STATUS_CONFIG[BID_STATUSES.WAITING].label,
		slug: BID_STATUSES.WAITING,
		icon: <ClockIcon />,
	},
	{
		id: 'closed',
		name: BID_STATUS_CONFIG[BID_STATUSES.CLOSED].label,
		slug: BID_STATUSES.CLOSED,
		icon: <CancellIcon />,
	},
	{
		id: 'auto-closed',
		name: BID_STATUS_CONFIG[BID_STATUSES.AUTO_CLOSED].label,
		slug: BID_STATUSES.AUTO_CLOSED,
		icon: <WatchIcon />,
	},
] as const;

export type BidStatus = (typeof BID_STATUSES)[keyof typeof BID_STATUSES];
export type BidStatusVariant = keyof typeof BID_STATUS_CONFIG;
