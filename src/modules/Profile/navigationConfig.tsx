import { ProfileSection } from './services/constants';

import OverviewIcon from '../../../public/icons/profile/overview.svg';
import ProjectsIcon from '../../../public/icons/profile/plus.svg';
import MyBidsIcon from '../../../public/icons/profile/my-bids.svg';
import ReviewsIcon from '../../../public/icons/profile/reviews.svg';
import PriceIcon from '../../../public/icons/profile/dollar-icon.svg';
import ClipboardIcon from '../../../public/icons/profile/clipboard.svg';
import UsersIcon from '../../../public/icons/profile/users.svg';
import { JSX } from 'react';

export interface NavigationItem {
	id: ProfileSection;
	label: string;
	icon: JSX.Element;
}

export const NAVIGATION_CONFIG: Record<
	'contractor' | 'client',
	NavigationItem[]
> = {
	contractor: [
		{
			id: ProfileSection.OVERVIEW,
			label: 'Overview',
			icon: <OverviewIcon />,
		},
		{
			id: ProfileSection.AVAILABLE_PROJECTS,
			label: 'Available Projects',
			icon: <ProjectsIcon />,
		},
		{ id: ProfileSection.MY_BIDS, label: 'My Bids', icon: <MyBidsIcon /> },
		{ id: ProfileSection.REVIEWS, label: 'Reviews', icon: <ReviewsIcon /> },
		{
			id: ProfileSection.PRICING_PLAN,
			label: 'Pricing Plan',
			icon: <PriceIcon />,
		},
	],
	client: [
		{
			id: ProfileSection.OVERVIEW,
			label: 'Overview',
			icon: <OverviewIcon />,
		},
		{
			id: ProfileSection.MY_REQUESTS,
			label: 'My Requests',
			icon: <ClipboardIcon />,
		},
		{
			id: ProfileSection.CONTRACTORS,
			label: 'Contractors',
			icon: <UsersIcon />,
		},
		{ id: ProfileSection.REVIEWS, label: 'Reviews', icon: <ReviewsIcon /> },
	],
};
