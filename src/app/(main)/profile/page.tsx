'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';

import { ProfileLayout } from '@/modules/Profile/ProfileLayout';
import { PROFILE_MOCK_DATA } from '@/modules/Profile/constants';
import { useAppSelector } from '@/shared/hooks/useStore';
import { isContractor } from '@/shared/lib/roleMapper';

export default function ProfilePage(): JSX.Element {
	const router = useRouter();

	const authRole = useAppSelector((state) => state.auth.role);
	const token = useAppSelector((state) => state.auth.token);

	if (!token) {
		router.push('/login');
		return <div>Redirecting to login...</div>;
	}

	if (!authRole) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl text-red-500">
						Error: User role not found
					</h2>
					<p className="text-gray-600">Please try logging in again</p>
				</div>
			</div>
		);
	}

	const mockData = isContractor(authRole)
		? PROFILE_MOCK_DATA.contractor
		: PROFILE_MOCK_DATA.client;

	return (
		<ProfileLayout profileData={mockData.profile} stats={mockData.stats} />
	);
}
