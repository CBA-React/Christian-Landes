'use client';

import { JSX, useState } from 'react';
import { ProfileData, ProfileStats } from './types';
import { ProfileSidebar } from './ProfileSidebar';
import { StatsCards } from './StatsCards';
import { BusinessInformation } from './BusinessInformation';
import { Portfolio } from './Portfolio';

interface ProfileContentProps {
	profileData: ProfileData;
	stats?: ProfileStats;
}

export const ProfileContent = ({ stats }: ProfileContentProps): JSX.Element => {
	const [activeSection, setActiveSection] = useState('overview');

	return (
		<div className="flex gap-10 pt-10">
			<ProfileSidebar
				activeSection={activeSection}
				onSectionChange={setActiveSection}
			/>

			<div className="flex-1 space-y-10">
				{activeSection === 'overview' && (
					<>
						{stats && <StatsCards stats={stats} />}

						<BusinessInformation />

						<Portfolio />
					</>
				)}

				{activeSection === 'available-projects' && (
					<div className="rounded-lg bg-gray-100 p-6 shadow-sm">
						<h2 className="text-lg font-semibold text-gray-900">
							Available Projects
						</h2>
						<p className="mt-2 text-gray-600">
							Projects content will be here...
						</p>
					</div>
				)}

				{activeSection === 'my-bids' && (
					<div className="rounded-lg bg-white p-6 shadow-sm">
						<h2 className="text-lg font-semibold text-gray-900">
							My Bids
						</h2>
						<p className="mt-2 text-gray-600">
							Bids content will be here...
						</p>
					</div>
				)}

				{activeSection === 'reviews' && (
					<div className="rounded-lg bg-white p-6 shadow-sm">
						<h2 className="text-lg font-semibold text-gray-900">
							Reviews
						</h2>
						<p className="mt-2 text-gray-600">
							Reviews content will be here...
						</p>
					</div>
				)}

				{activeSection === 'pricing-plan' && (
					<div className="rounded-lg bg-white p-6 shadow-sm">
						<h2 className="text-lg font-semibold text-gray-900">
							Pricing Plan
						</h2>
						<p className="mt-2 text-gray-600">
							Pricing plan content will be here...
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
