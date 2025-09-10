'use client';

import { JSX } from 'react';

interface SidebarItem {
	id: string;
	label: string;
	icon: JSX.Element;
}

import OverviewIcon from '../../../public/icons/profile/overview.svg';
import ProjectsIcon from '../../../public/icons/profile/plus.svg';
import MyBidsIcon from '../../../public/icons/profile/my-bids.svg';
import ReviewsIcon from '../../../public/icons/profile/reviews.svg';
import PriceIcon from '../../../public/icons/profile/dollar-icon.svg';
import ActiveArrow from '../../../public/icons/profile/sidebar-arrow-right-white.svg';

const sidebarItems: SidebarItem[] = [
	{
		id: 'overview',
		label: 'Overview',
		icon: <OverviewIcon />,
	},
	{
		id: 'available-projects',
		label: 'Available Projects',
		icon: <ProjectsIcon />,
	},
	{
		id: 'my-bids',
		label: 'My Bids',
		icon: <MyBidsIcon />,
	},
	{
		id: 'reviews',
		label: 'Reviews',
		icon: <ReviewsIcon />,
	},
	{
		id: 'pricing-plan',
		label: 'Pricing Plan',
		icon: <PriceIcon />,
	},
];

interface ProfileSidebarProps {
	activeSection: string;
	onSectionChange: (section: string) => void;
}

export const ProfileSidebar = ({
	activeSection,
	onSectionChange,
}: ProfileSidebarProps): JSX.Element => {
	return (
		<aside className="w-[240px] flex-shrink-0">
			<div className="rounded-lg">
				<nav>
					<ul className="space-y-1">
						{sidebarItems.map((item) => {
							const isActive = activeSection === item.id;

							return (
								<li key={item.id}>
									<button
										onClick={() => onSectionChange(item.id)}
										className={`flex w-full items-center justify-between px-4 py-3 text-left text-[16px] font-[400] transition-colors ${
											isActive
												? 'bg-gray-900 text-white'
												: 'text-[#242424]/50 hover:bg-gray-100'
										}`}
									>
										<div className="flex items-center gap-3">
											<div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
												{item.icon}
											</div>
											{item.label}
										</div>
										{isActive && <ActiveArrow />}
									</button>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</aside>
	);
};
