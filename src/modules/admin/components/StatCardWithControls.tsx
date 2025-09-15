'use client';

import { JSX, useEffect, useMemo, useState } from 'react';

import { CountDelta } from '@/modules/admin/services/DashboardApi';
import { MONTHS } from '../contants';

import { StatCard } from './StatCard';

type Props = {
	title: string;
	fetcher: (params: { month: number; year: number }) => Promise<CountDelta>;
};

export function StatCardWithControls({ title, fetcher }: Props): JSX.Element {
	const now = useMemo(() => new Date(), []);
	const [month, setMonth] = useState(now.getMonth() + 1);
	const [year, setYear] = useState(now.getFullYear());
	const [data, setData] = useState<CountDelta | null>(null);
	const [loading, setLoading] = useState(false);

	const prevLabel = useMemo(() => {
		const pm = month === 1 ? 12 : month - 1;
		return MONTHS[pm - 1];
	}, [month]);

	useEffect(() => {
		let cancelled = false;
		(async (): Promise<void> => {
			setLoading(true);
			try {
				const res = await fetcher({ month, year });
				if (!cancelled) setData(res);
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return (): void => {
			cancelled = true;
		};
	}, [month, year, fetcher]);

	const current = data?.currentCount ?? null;
	const previous = data?.previousCount ?? null;
	const percent = data ? data.percentChange : null;

	return (
		<div className="w-full max-w-[358px] min-w-[308px]">
			<StatCard
				title={title}
				value={current}
				delta={percent}
				compareLabel={prevLabel}
				previous={previous}
				isLoading={loading}
				month={month}
				setMonth={setMonth}
				setYear={setYear}
				year={year}
				now={now}
			/>
		</div>
	);
}
