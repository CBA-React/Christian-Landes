'use client';

import { JSX } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavigationItem } from '@/modules/Profile/components/navigationConfig';

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

	return (
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
								className={`flex items-center gap-2 px-1 pt-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
									isActive
										? 'border-b-1 border-[#242424] text-[#242424]'
										: 'text-[#242424]/50 hover:text-[#242424]/70'
								}`}
							>
								<div className="flex h-7 w-7 flex-shrink-0 items-center justify-center">
									{item.icon}
								</div>
								<span>{item.label}</span>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};
