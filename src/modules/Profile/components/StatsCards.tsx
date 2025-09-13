'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { JSX } from 'react';

interface StatItem {
	label: string;
	value: string | number;
}

interface StatsCardsProps {
	stats: StatItem[];
}

const StatCard = ({ stat }: { stat: StatItem }) => (
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

	return (
		<div>
			{/* Mobile*/}
			<div className="block overflow-hidden md:hidden">
				<div className="embla overflow-hidden" ref={emblaRef}>
					<div className="embla__container flex gap-5">
						{stats.map((stat, index) => (
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

			{/* Desktop*/}
			<div
				className={`hidden gap-5 md:grid ${
					stats.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
				}`}
			>
				{stats.map((stat, index) => (
					<StatCard key={index} stat={stat} />
				))}
			</div>
		</div>
	);
};
