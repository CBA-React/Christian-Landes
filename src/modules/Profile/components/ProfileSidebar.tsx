'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationItem } from '@/modules/Profile/components/navigationConfig';

import ActiveArrow from 'public/icons/profile/sidebar-arrow-right-white.svg';

interface ProfileSidebarProps {
	navigationItems: NavigationItem[];
}

export const ProfileSidebar = ({
	navigationItems,
}: ProfileSidebarProps): JSX.Element => {
	const pathname = usePathname();

	return (
		<aside className="w-[240px] flex-shrink-0">
			<div className="rounded-lg">
				<nav>
					<ul className="space-y-1">
						{navigationItems.map((item) => {
							const isActive =
								pathname === `/profile/${item.id}` ||
								(pathname === '/profile' &&
									item.id === 'overview');

							return (
								<li key={item.id}>
									<Link
										href={`/profile/${item.id}`}
										className={`flex w-full items-center justify-between px-4 py-3 text-left text-[16px] font-[400] transition-colors ${
											isActive
												? 'bg-[#242424] text-white'
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
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</aside>
	);
};
