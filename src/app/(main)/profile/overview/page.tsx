'use client';

import { JSX } from 'react';
import { useAppSelector } from '@/shared/hooks/useStore';
import { useProfileData } from '@/modules/Profile/hooks/useProfile';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';
import { StatsCards } from '@/modules/Profile/components/StatsCards';
import { Information } from '@/modules/Profile/components/Information';
import { Portfolio } from '@/modules/Profile/components/Portfolio';
import { RecentProjects } from '@/modules/Profile/components/RecentProjects';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';

export default function OverviewPage(): JSX.Element {
	const authRole = useAppSelector((state) => state.auth.role);
	const { profile, stats, projects, isLoading, isError } =
		useProfileData(authRole);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isError || !profile || !stats) {
		return (
			<div className="flex min-h-[400px] items-center justify-center p-8 text-center">
				<div>
					<h2 className="mb-2 text-xl font-semibold text-red-600">
						Failed to load profile data
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
			<ProfileLayout showHeader={true} showSidebar={true}>
				<div className="space-y-6 lg:space-y-10">
					<StatsCards stats={stats} />

					<Information profileData={profile} />

					{profile.role === 'contractor' ? (
						<Portfolio />
					) : (
						<RecentProjects
							projects={projects?.displayData || []}
							isLoading={!projects}
						/>
					)}
				</div>
			</ProfileLayout>
		</ErrorBoundary>
	);
}
