'use client';

import { JSX } from 'react';
import { useAppSelector } from '@/shared/hooks/useStore';
import { useProfileData } from '@/modules/Profile/hooks/useProfile';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage/ErrorMessage';
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

	if (isLoading || (!profile && !isError)) {
		return <LoadingSpinner />;
	}

	if (isError || !profile || !stats) {
		return <ErrorMessage message="Failed to load profile data" />;
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
