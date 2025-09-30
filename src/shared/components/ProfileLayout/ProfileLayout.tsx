'use client';

import { JSX, ReactNode } from 'react';
import { useAppSelector } from '@/shared/hooks/useStore';
import { useProfile } from '@/modules/Profile/hooks/useProfile';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage/ErrorMessage';
import { ProfileHeader } from '@/modules/Profile/components/ProfileHeader';
import { ProfileSidebar } from '@/modules/Profile/components/ProfileSidebar';
import { NAVIGATION_CONFIG } from '@/modules/Profile/components/navigationConfig';
import { MobileProfileNavigation } from '@/modules/Profile/components/MobileProfileNavigation';

interface ProfileLayoutProps {
	children: ReactNode;
	showHeader?: boolean;
	showSidebar?: boolean;
	className?: string;
}

export default function ProfileLayout({
	children,
	showHeader = true,
	showSidebar = true,
	className = '',
}: ProfileLayoutProps): JSX.Element {
	const authRole = useAppSelector((state) => state.auth.role);
	const { data: profileData, isLoading, isError } = useProfile(authRole);

	if (showHeader && (isLoading || (!profileData && !isError))) {
		return <LoadingSpinner />;
	}

	if (showHeader && (isError || !profileData)) {
		return <ErrorMessage message="Failed to load profile" />;
	}

	const navigationItems = profileData
		? NAVIGATION_CONFIG[profileData.role]
		: [];

	return (
		<div className={`min-h-screen bg-white ${className}`}>
			{showHeader && profileData && (
				<ProfileHeader profileData={profileData} />
			)}

			<div className="mx-auto max-w-[1240px] pb-8">
				<div className="mx-5 xl:mx-0">
					<div
						className={`flex flex-col gap-6 pt-6 lg:gap-10 lg:pt-10 ${showSidebar ? 'lg:flex-row' : ''}`}
					>
						{showSidebar && (
							<>
								<div className="hidden lg:block lg:w-[240px] lg:flex-shrink-0">
									<ProfileSidebar
										navigationItems={navigationItems}
									/>
								</div>

								<div className="block lg:hidden">
									<MobileProfileNavigation
										navigationItems={navigationItems}
									/>
								</div>
							</>
						)}

						<div
							className={`w-full min-w-0 flex-1 space-y-6 lg:space-y-10 ${showSidebar ? 'lg:max-w-[calc(100%-240px-2.5rem)]' : 'lg:max-w-full'} overflow-hidden`}
						>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
