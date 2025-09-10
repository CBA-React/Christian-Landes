'use client';

import { JSX } from 'react';
import { ProfileStats } from './types';

interface StatsCardsProps {
	stats: ProfileStats;
}

export const StatsCards = ({ stats }: StatsCardsProps): JSX.Element => {
	const statsArray = [
		stats.primaryStat,
		stats.secondaryStat,
		stats.tertiaryStat,
		...(stats.totalSpent ? [stats.totalSpent] : []),
	];

	return (
		<div className="grid grid-cols-3 gap-5">
			{statsArray.slice(0, 3).map((stat, index) => (
				<div
					key={index}
					className="rounded-[10px] bg-[#F1F3F6] px-6 py-6 text-left"
				>
					<div className="font-chalet-1960 mb-1 text-[40px] leading-[100%] font-[500] tracking-[-1px] text-[#242424]">
						{stat.value}
					</div>
					<div className="font-chalet-1960 text-[20px] font-[500] tracking-[-1px]">
						{stat.label}
					</div>
				</div>
			))}
		</div>
	);
};
