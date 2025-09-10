'use client';

import { JSX, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ProfileData, ProfileStats } from './types';
import { ProfileSidebar } from './ProfileSidebar';
import { StatsCards } from './StatsCards';
import { BusinessInformation } from './BusinessInformation';
import { Portfolio } from './Portfolio';
import { useCarouselDot } from '@/shared/hooks/useCarouselDot';

// Импорты иконок
import OverviewIcon from '../../../public/icons/profile/overview.svg';
import ProjectsIcon from '../../../public/icons/profile/plus.svg';
import MyBidsIcon from '../../../public/icons/profile/my-bids.svg';
import ReviewsIcon from '../../../public/icons/profile/reviews.svg';
import PriceIcon from '../../../public/icons/profile/dollar-icon.svg';

interface ProfileContentProps {
	profileData: ProfileData;
	stats?: ProfileStats;
}

export const ProfileContent = ({ stats }: ProfileContentProps): JSX.Element => {
	const [activeSection, setActiveSection] = useState('overview');

	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		dragFree: true,
	});

	const { selectedIndex } = useCarouselDot(emblaApi);

	const navigationItems = [
		{ id: 'overview', label: 'Overview', icon: <OverviewIcon /> },
		{
			id: 'available-projects',
			label: 'Available Projects',
			icon: <ProjectsIcon />,
		},
		{ id: 'my-bids', label: 'My Bids', icon: <MyBidsIcon /> },
		{ id: 'reviews', label: 'Reviews', icon: <ReviewsIcon /> },
		{ id: 'pricing-plan', label: 'Pricing Plan', icon: <PriceIcon /> },
	];

	return (
		<div className="px-5 md:px-0">
			<div className="flex flex-col gap-6 pt-6 md:flex-row md:gap-10 md:pt-10">
				{/* Desktop Sidebar*/}
				<div className="hidden md:block">
					<ProfileSidebar
						activeSection={activeSection}
						onSectionChange={setActiveSection}
					/>
				</div>

				{/* Mobile Navigation*/}
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
											<div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
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

				{/* Main Content */}
				<div className="flex-1 space-y-6 md:space-y-10">
					{activeSection === 'overview' && (
						<>
							{stats && <StatsCards stats={stats} />}

							<BusinessInformation />

							<Portfolio />
						</>
					)}

					{activeSection === 'available-projects' && (
						<div className="rounded-lg bg-[#F1F3F6] p-4 shadow-sm md:p-6">
							<h2 className="text-lg font-semibold text-[#242424]">
								Available Projects
							</h2>
							<p className="mt-2 text-[#242424] opacity-70">
								Projects content will be here...
							</p>
						</div>
					)}

					{activeSection === 'my-bids' && (
						<div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
							<h2 className="text-lg font-semibold text-[#242424]">
								My Bids
							</h2>
							<p className="mt-2 text-[#242424] opacity-70">
								Bids content will be here...
							</p>
						</div>
					)}

					{activeSection === 'reviews' && (
						<div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
							<h2 className="text-lg font-semibold text-[#242424]">
								Reviews
							</h2>
							<p className="mt-2 text-[#242424] opacity-70">
								Reviews content will be here...
							</p>
						</div>
					)}

					{activeSection === 'pricing-plan' && (
						<div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
							<h2 className="text-lg font-semibold text-[#242424]">
								Pricing Plan
							</h2>
							<p className="mt-2 text-[#242424] opacity-70">
								Pricing plan content will be here...
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
