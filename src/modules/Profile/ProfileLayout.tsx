import { JSX } from 'react';

import { ProfileData, ProfileStats } from './types';
import { ProfileHeader } from './ProfileHeader';
import { ProfileContent } from './ProfileContent';

interface ProfileLayoutProps {
	profileData: ProfileData;
	stats?: ProfileStats;
}

export const ProfileLayout = ({
	profileData,
	stats,
}: ProfileLayoutProps): JSX.Element => {
	return (
		<div className="min-h-screen bg-white">
			<ProfileHeader profileData={profileData} />

			<div className="mx-auto max-w-[1240px] pb-8">
				<ProfileContent profileData={profileData} stats={stats} />
			</div>
		</div>
	);
};
