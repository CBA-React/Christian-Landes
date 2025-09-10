// page.tsx - обновленная версия
import { JSX } from 'react';

import { ProfileLayout } from '@/modules/Profile/ProfileLayout';
import { ProfileData, ProfileStats } from '@/modules/Profile/types';

export default function ContractorProfilePage(): JSX.Element {
	const profileData: ProfileData = {
		id: '1',
		name: 'Mark Stevens',
		email: 'mark@example.com',
		avatar: '/images/Profile/mock-avatar.jpg',
		role: 'contractor',
		rating: 4.8,
		reviewsCount: 34,
	};

	const stats: ProfileStats = {
		primaryStat: {
			label: 'Active Projects',
			value: 3,
		},
		secondaryStat: {
			label: 'Submitted Bids',
			value: 12,
		},
		tertiaryStat: {
			label: 'Total Earnings',
			value: '$24,500',
		},
		totalSpent: {
			label: 'Projects Completed',
			value: '30',
		},
	};

	return <ProfileLayout profileData={profileData} stats={stats} />;
}
