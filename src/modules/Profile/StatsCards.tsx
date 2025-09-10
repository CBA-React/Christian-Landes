'use client';

import { useCarouselDot } from '@/shared/hooks/useCarouselDot';
import useEmblaCarousel from 'embla-carousel-react';
import { JSX } from 'react';
import { ProfileStats } from './types';

interface StatsCardsProps {
	stats: ProfileStats;
}

const StatCard = ({
	stat,
}: {
	stat: { label: string; value: string | number };
}) => (
	<div className="h-full min-w-[280px] rounded-[10px] bg-[#F1F3F6] px-6 py-6 text-left md:min-w-0">
		<div className="font-chalet-1960 mb-1 text-[40px] leading-[100%] tracking-[-1px] text-[#242424]">
			{stat.value}
		</div>
		<div className="font-chalet-1960 text-[20px] tracking-[-1px]">
			{stat.label}
		</div>
	</div>
);

export const StatsCards = ({ stats }: StatsCardsProps): JSX.Element => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		dragFree: true,
	});

	const { selectedIndex } = useCarouselDot(emblaApi);

	const statsArray = [
		stats.primaryStat,
		stats.secondaryStat,
		stats.tertiaryStat,
		...(stats.totalSpent ? [stats.totalSpent] : []),
	];

	const visibleStats = statsArray.slice(0, 3);

	return (
		<div>
			{/* Mobile */}
			<div className="block overflow-hidden md:hidden">
				<div className="embla overflow-hidden" ref={emblaRef}>
					<div className="embla__container flex gap-7">
						{visibleStats.map((stat, index) => (
							<div
								key={index}
								className="embla__slide !w-[70vw] !flex-none"
							>
								<StatCard stat={stat} />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Desktop: Grid */}
			<div className="hidden grid-cols-3 gap-5 md:grid">
				{visibleStats.map((stat, index) => (
					<StatCard key={index} stat={stat} />
				))}
			</div>
		</div>
	);
};
