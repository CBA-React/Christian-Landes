'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';

import { ProfileLayout } from '@/modules/Profile/ProfileLayout';
import { useAppSelector } from '@/shared/hooks/useStore';
import { useProfileData } from '@/modules/Profile/hooks/useProfile';

export default function ProfilePage(): JSX.Element {
	const router = useRouter();
	const authRole = useAppSelector((state) => state.auth.role);
	const token = useAppSelector((state) => state.auth.token);

	if (!token) {
		router.push('/login');
		return <div>Redirecting to login...</div>;
	}

	const { profile, stats, projects, isLoading, isError } =
		useProfileData(authRole);

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<p className="mt-4 text-[#242424]">Loading profile...</p>
				</div>
			</div>
		);
	}

	if (isError || !profile || !stats) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl text-red-500">
						Failed to load profile
					</h2>
					<p className="text-[#242424]">
						Please try refreshing the page
					</p>
				</div>
			</div>
		);
	}

	return (
		<ProfileLayout
			profileData={profile}
			stats={stats}
			projects={projects?.displayData || []}
			isLoadingProjects={!projects}
		/>
	);
}
