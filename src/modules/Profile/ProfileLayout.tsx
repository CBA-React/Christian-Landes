import { JSX } from 'react';

import { ProfileData, StatItem, ProjectDisplayData } from './services/types';
import { ProfileHeader } from './ProfileHeader';
import { ProfileContent } from './ProfileContent';

interface ProfileLayoutProps {
	profileData: ProfileData;
	stats: StatItem[];
	projects?: ProjectDisplayData[];
	isLoadingProjects?: boolean;
}

export const ProfileLayout = ({
	profileData,
	stats,
	projects = [],
	isLoadingProjects = false,
}: ProfileLayoutProps): JSX.Element => {
	return (
		<div className="min-h-screen bg-white">
			<ProfileHeader profileData={profileData} />

			<div className="mx-auto max-w-[1240px] pb-8">
				<ProfileContent
					profileData={profileData}
					stats={stats}
					projects={projects}
					isLoadingProjects={isLoadingProjects}
				/>
			</div>
		</div>
	);
};
