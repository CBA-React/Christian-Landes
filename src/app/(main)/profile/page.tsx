'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary';
import { ProfileLayout } from '@/modules/Profile/components/ProfileLayout';
import { useAppSelector } from '@/shared/hooks/useStore';
import { useProfileData } from '@/modules/Profile/hooks/useProfile';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';

export default function ProfilePage(): JSX.Element {
	const router = useRouter();
	const authRole = useAppSelector((state) => state.auth.role);
	const token = useAppSelector((state) => state.auth.token);

	if (!token) {
		router.push('/login');
		return <div>Redirecting...</div>;
	}

	const { profile, stats, projects, isLoading, isError } =
		useProfileData(authRole);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isError || !profile || !stats) {
		return (
			<div className="flex min-h-screen items-center justify-center p-8 text-center">
				<div>
					<h2 className="mb-2 text-xl font-semibold text-red-600">
						Failed to load profile
					</h2>
					<p className="mb-4 text-gray-600">
						Please try refreshing the page
					</p>
					<button
						onClick={() => window.location.reload()}
						className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						Refresh
					</button>
				</div>
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<ProfileLayout
				profileData={profile}
				stats={stats}
				projects={projects?.displayData || []}
				isLoadingProjects={!projects}
			/>
		</ErrorBoundary>
	);
}
