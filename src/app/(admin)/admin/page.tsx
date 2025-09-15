'use client';

import { JSX, useEffect, useMemo, useState } from 'react';

import { DashboardGraph } from '@/modules/admin/components/DashboardGraph';
import { StatCardWithControls } from '@/modules/admin/components/StatCardWithControls';
import { MONTHS } from '@/modules/admin/contants';
import {
	DashboardApi,
	RevenueInfo,
	UserRole,
} from '@/modules/admin/services/DashboardApi';

const ROLE_CLIENT: UserRole = 1;
const ROLE_CONTRACTOR: UserRole = 2;

export default function AdminDashboardPage(): JSX.Element {
	const now = useMemo(() => new Date(), []);

	const [revenue, setRevenue] = useState<RevenueInfo | null>(null);

	useEffect(() => {
		let cancelled = false;
		async function run(): Promise<void> {
			try {
				const [revenueInfo] = await Promise.all([
					DashboardApi.getRevenueInformation(),
				]);

				if (cancelled) return;

				setRevenue(revenueInfo);
			} catch (e) {
				console.error(e);
			}
		}
		run();
		return (): void => {
			cancelled = true;
		};
	}, []);

	const revenueData = useMemo(() => {
		const months: { name: string; amount: number }[] = Array.from(
			{ length: 12 },
			(_, i) => ({ name: MONTHS[i], amount: 0 }),
		);
		if (revenue) {
			for (const m of revenue.months) {
				if (m.month >= 1 && m.month <= 12) {
					months[m.month - 1].amount = m.sum || 0;
				}
			}
		}
		return months;
	}, [revenue]);

	return (
		<div className="flex flex-col gap-5 xl:gap-[31px]">
			<div className="flex flex-nowrap gap-3 xl:gap-[31px]">
				<StatCardWithControls
					title="NEW CLIENTS"
					fetcher={({ month, year }) =>
						DashboardApi.getCountUserWithRole({
							month,
							year,
							role: ROLE_CLIENT,
						})
					}
				/>
				<StatCardWithControls
					title="NEW CONTRACTORS"
					fetcher={({ month, year }) =>
						DashboardApi.getCountUserWithRole({
							month,
							year,
							role: ROLE_CONTRACTOR,
						})
					}
				/>
				<StatCardWithControls
					title="ACTIVE PROJECTS"
					fetcher={({ month, year }) =>
						DashboardApi.getCountActiveProjects({ month, year })
					}
				/>
			</div>
			<DashboardGraph
				revenue={revenue}
				revenueData={revenueData}
				year={now.getFullYear()}
			/>
		</div>
	);
}
