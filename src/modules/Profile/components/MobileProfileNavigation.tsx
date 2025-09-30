'use client';

import { JSX, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavigationItem } from '@/modules/Profile/components/navigationConfig';
import { logout } from '@/modules/auth/slices/authSlice';
import { useAppDispatch } from '@/shared/hooks/useStore';
import { LogoutModal } from '@/modules/Profile/components/LogoutModal';

import LogOutIcon from 'public/icons/profile/log-out.svg';

interface MobileProfileNavigationProps {
	navigationItems: NavigationItem[];
}

export const MobileProfileNavigation = ({
	navigationItems,
}: MobileProfileNavigationProps): JSX.Element => {
	const [emblaRef] = useEmblaCarousel({
		align: 'start',
		dragFree: true,
	});
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const [logoutOpen, setLogoutOpen] = useState(false);

	return (
		<>
			<div className="embla overflow-hidden" ref={emblaRef}>
				<div className="embla__container flex gap-6">
					{navigationItems.map((item) => {
						const isActive =
							pathname === `/profile/${item.id}` ||
							(pathname === '/profile' && item.id === 'overview');

						return (
							<div
								key={item.id}
								className="embla__slide !w-auto !flex-none"
							>
								<Link
									href={`/profile/${item.id}`}
									className={`flex items-center gap-2 pt-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
										isActive
											? 'border-b-1 border-[#242424] text-[#242424]'
											: 'text-[#242424]/50 hover:text-[#242424]/70'
									}`}
								>
									<div className="flex flex-shrink-0 items-center justify-center">
										{item.icon}
									</div>
									<span>{item.label}</span>
								</Link>
							</div>
						);
					})}

					<div className="embla__slide !w-auto !flex-none">
						<button
							onClick={() => setLogoutOpen(true)}
							className="flex items-center gap-2 pt-2 pb-3 text-sm font-medium whitespace-nowrap text-[#FF4242] transition-colors hover:text-[#FF4242]/80"
						>
							<div className="flex flex-shrink-0 items-center justify-center">
								<LogOutIcon className="text-[#FF4242]" />
							</div>
							<span>Log Out</span>
						</button>
					</div>
				</div>
			</div>

			<LogoutModal
				open={logoutOpen}
				onClose={() => setLogoutOpen(false)}
				onConfirm={() => {
					dispatch(logout());
					window.location.href = '/login';
				}}
			/>
		</>
	);
};
