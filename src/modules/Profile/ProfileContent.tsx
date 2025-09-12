'use client';

import { JSX, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ProfileData, StatItem, ProjectDisplayData } from './services/types';
import { ProfileSection } from './services/constants';
import { NAVIGATION_CONFIG } from './navigationConfig';
import { ProfileSidebar } from './ProfileSidebar';
import { StatsCards } from './StatsCards';
import { Information } from './Information';
import { Portfolio } from './Portfolio';
import { RecentProjects } from './RecentProjects';

interface ProfileContentProps {
	profileData: ProfileData;
	stats: StatItem[];
	projects?: ProjectDisplayData[]; 
	isLoadingProjects?: boolean;
}

export const ProfileContent = ({
	profileData,
	stats,
	projects = [], 
	isLoadingProjects = false, 
}: ProfileContentProps): JSX.Element => {
	const [activeSection, setActiveSection] = useState<ProfileSection>(
		ProfileSection.OVERVIEW,
	);

	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		dragFree: true,
	});

	const navigationItems = NAVIGATION_CONFIG[profileData.role];

	const renderSectionContent = () => {
		switch (activeSection) {
			case ProfileSection.OVERVIEW:
				return (
					<>
						<StatsCards stats={stats} />
						<Information profileData={profileData} />
						{profileData.role === 'contractor' ? (
							<Portfolio />
						) : (
							<RecentProjects
								projects={projects}
								isLoading={isLoadingProjects}
							/>
						)}
					</>
				);

			case ProfileSection.AVAILABLE_PROJECTS:
				return (
					<div className="rounded-lg bg-[#F1F3F6] p-4 shadow-sm md:p-6">
						<h2 className="text-lg font-semibold text-[#242424]">
							Available Projects
						</h2>
						<p className="mt-2 text-[#242424] opacity-70">
							Browse and bid on new projects...
						</p>
					</div>
				);

			case ProfileSection.MY_BIDS:
				return (
					<div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
						<h2 className="text-lg font-semibold text-[#242424]">
							My Bids
						</h2>
						<p className="mt-2 text-[#242424] opacity-70">
							Track your submitted bids...
						</p>
					</div>
				);

			case ProfileSection.MY_REQUESTS:
				return (
					<div className="rounded-lg bg-[#F1F3F6] p-4 shadow-sm md:p-6">
						<h2 className="text-lg font-semibold text-[#242424]">
							My Requests
						</h2>
						<p className="mt-2 text-[#242424] opacity-70">
							Manage your posted project requests...
						</p>
					</div>
				);

			case ProfileSection.CONTRACTORS:
				return (
					<div className="rounded-lg bg-[#F1F3F6] p-4 shadow-sm md:p-6">
						<h2 className="text-lg font-semibold text-[#242424]">
							Contractors
						</h2>
						<p className="mt-2 text-[#242424] opacity-70">
							Browse and contact contractors...
						</p>
					</div>
				);

			case ProfileSection.REVIEWS:
				return (
					<div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
						<h2 className="text-lg font-semibold text-[#242424]">
							Reviews
						</h2>
						<p className="mt-2 text-[#242424] opacity-70">
							{profileData.role === 'contractor'
								? 'Reviews from clients...'
								: 'Reviews of contractors...'}
						</p>
					</div>
				);

			case ProfileSection.PRICING_PLAN:
				return (
					<div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
						<h2 className="text-lg font-semibold text-[#242424]">
							Pricing Plan
						</h2>
						<p className="mt-2 text-[#242424] opacity-70">
							Manage your subscription...
						</p>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="px-5 md:px-0">
			<div className="flex flex-col gap-6 pt-6 md:flex-row md:gap-10 md:pt-10">
				<div className="hidden md:block">
					<ProfileSidebar
						activeSection={activeSection}
						onSectionChange={setActiveSection}
						navigationItems={navigationItems}
					/>
				</div>

				<div className="block md:hidden">
					<div className="embla overflow-hidden" ref={emblaRef}>
						<div className="embla__container flex gap-6">
							{navigationItems.map((item) => {
								const isActive = activeSection === item.id;

								return (
									<div
										key={item.id}
										className="embla__slide !w-auto !flex-none"
									>
										<button
											onClick={() =>
												setActiveSection(item.id)
											}
											className={`flex items-center gap-2 px-1 pt-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
												isActive
													? 'border-b-1 border-[#242424] text-[#242424]'
													: 'text-[#242424]/50 hover:text-[#242424]/70'
											}`}
										>
											<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
												{item.icon}
											</div>
											<span>{item.label}</span>
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div className="flex-1 space-y-6 md:space-y-10">
					{renderSectionContent()}
				</div>
			</div>
		</div>
	);
};
