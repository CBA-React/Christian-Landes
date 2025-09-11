'use client';

import { JSX } from 'react';
import { ProfileSection } from './constants';
import { NavigationItem } from './navigationConfig';

import ActiveArrow from '../../../public/icons/profile/sidebar-arrow-right-white.svg';

interface ProfileSidebarProps {
	activeSection: ProfileSection;
	onSectionChange: (section: ProfileSection) => void;
	navigationItems: NavigationItem[];
}

export const ProfileSidebar = ({
	activeSection,
	onSectionChange,
	navigationItems,
}: ProfileSidebarProps): JSX.Element => {
	return (
		<aside className="w-[240px] flex-shrink-0">
			<div className="rounded-lg">
				<nav>
					<ul className="space-y-1">
						{navigationItems.map((item) => {
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
											<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
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