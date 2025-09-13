'use client';

import { JSX, useEffect, useMemo, useState } from 'react';

import { DashboardGraph } from '@/modules/admin/components/DashboardGraph';
import {
	DashboardApi,
	RevenueInfo,
	UserRole,
} from '@/modules/admin/services/DashboardApi';

const ROLE_CLIENT: UserRole = 1;
const ROLE_CONTRACTOR: UserRole = 2;

export const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

function prevMonthYear(month: number, year: number) {
	if (month === 1) return { month: 12, year: year - 1 };
	return { month: month - 1, year };
}

function percentDelta(prev: number, current: number) {
	if (prev === 0) return current === 0 ? 0 : 100;
	return ((current - prev) / Math.abs(prev)) * 100;
}

function formatNumber(n: number) {
	return new Intl.NumberFormat().format(n);
}

function StatCard({
	title,
	value,
	delta,
	compareLabel,
	isLoading,
}: {
	title: string;
	value: number | null;
	delta: number | null;
	compareLabel: string;
	isLoading?: boolean;
}) {
	const up = (delta ?? 0) >= 0;
	return (
		<div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
			<div className="mb-2 flex items-center justify-between">
				<div className="text-xs text-neutral-500">{title}</div>
			</div>

			<div className="mb-3 text-3xl font-semibold">
				{isLoading ? '—' : value !== null ? formatNumber(value) : '0'}
			</div>

			<div className="flex items-center gap-2 text-sm">
				<span
					className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${
						up
							? 'bg-emerald-50 text-emerald-600'
							: 'bg-rose-50 text-rose-600'
					}`}
				>
					<svg
						width="12"
						height="12"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						{up ? (
							<path
								d="M4 14l6-6 6 6"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						) : (
							<path
								d="M4 10l6 6 6-6"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						)}
					</svg>
					{isLoading
						? '—'
						: `${Math.abs(Math.round((delta ?? 0) * 10) / 10)}%`}
				</span>
				<span className="text-neutral-500">
					{up ? 'Up from ' : 'Drop from '}
					{compareLabel}
				</span>
			</div>
		</div>
	);
}

export default function AdminDashboardPage(): JSX.Element {
	const now = useMemo(() => new Date(), []);
	const [month, setMonth] = useState<number>(now.getMonth() + 1); // 1-12
	const [year, setYear] = useState<number>(now.getFullYear());

	const [clientCount, setClientCount] = useState<number | null>(null);
	const [clientPrev, setClientPrev] = useState<number | null>(null);

	const [contractorCount, setContractorCount] = useState<number | null>(null);
	const [contractorPrev, setContractorPrev] = useState<number | null>(null);

	const [projectCount, setProjectCount] = useState<number | null>(null);
	const [projectPrev, setProjectPrev] = useState<number | null>(null);

	const [revenue, setRevenue] = useState<RevenueInfo | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		let cancelled = false;
		async function run() {
			setLoading(true);
			try {
				const pm = prevMonthYear(month, year);

				const [
					clientsNow,
					clientsPrev,
					contractorsNow,
					contractorsPrev,
					projectsNow,
					projectsPrev,
					revenueInfo,
				] = await Promise.all([
					DashboardApi.getCountUserWithRole({
						month,
						year,
						role: ROLE_CLIENT,
					}),
					DashboardApi.getCountUserWithRole({
						month: pm.month,
						year: pm.year,
						role: ROLE_CLIENT,
					}),
					DashboardApi.getCountUserWithRole({
						month,
						year,
						role: ROLE_CONTRACTOR,
					}),
					DashboardApi.getCountUserWithRole({
						month: pm.month,
						year: pm.year,
						role: ROLE_CONTRACTOR,
					}),
					DashboardApi.getCountActiveProjects({ month, year }),
					DashboardApi.getCountActiveProjects({
						month: pm.month,
						year: pm.year,
					}),
					DashboardApi.getRevenueInformation(),
				]);

				if (cancelled) return;

				setClientCount(clientsNow);
				setClientPrev(clientsPrev);

				setContractorCount(contractorsNow);
				setContractorPrev(contractorsPrev);

				setProjectCount(projectsNow);
				setProjectPrev(projectsPrev);

				setRevenue(revenueInfo);
			} catch (e) {
				console.error(e);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		run();
		return () => {
			cancelled = true;
		};
	}, [month, year]);

	const monthLabel = useMemo(() => MONTHS[month - 1], [month]);
	const prevLabel = useMemo(() => {
		const pm = prevMonthYear(month, year);
		return MONTHS[pm.month - 1];
	}, [month, year]);

	const clientDelta =
		clientPrev === null || clientCount === null
			? null
			: percentDelta(clientPrev, clientCount);

	const contractorDelta =
		contractorPrev === null || contractorCount === null
			? null
			: percentDelta(contractorPrev, contractorCount);

	const projectDelta =
		projectPrev === null || projectCount === null
			? null
			: percentDelta(projectPrev, projectCount);

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
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-2">
					<div className="relative">
						<select
							value={month}
							onChange={(e) => setMonth(Number(e.target.value))}
							className="h-9 rounded-xl border border-neutral-200 bg-white px-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
							aria-label="Month"
						>
							{MONTHS.map((m, i) => (
								<option key={m} value={i + 1}>
									{m}
								</option>
							))}
						</select>
						<span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-neutral-400">
							▼
						</span>
					</div>

					<div className="relative">
						<select
							value={year}
							onChange={(e) => setYear(Number(e.target.value))}
							className="h-9 rounded-xl border border-neutral-200 bg-white px-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
							aria-label="Year"
						>
							{Array.from(
								{ length: 5 },
								(_, i) => now.getFullYear() - 2 + i,
							).map((y) => (
								<option key={y} value={y}>
									{y}
								</option>
							))}
						</select>
						<span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-neutral-400">
							▼
						</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<StatCard
					title={`NEW CLIENTS — ${monthLabel}`}
					value={clientCount}
					delta={clientDelta}
					compareLabel={prevLabel}
					isLoading={loading}
				/>
				<StatCard
					title={`NEW CONTRACTORS — ${monthLabel}`}
					value={contractorCount}
					delta={contractorDelta}
					compareLabel={prevLabel}
					isLoading={loading}
				/>
				<StatCard
					title={`ACTIVE PROJECTS — ${monthLabel}`}
					value={projectCount}
					delta={projectDelta}
					compareLabel={prevLabel}
					isLoading={loading}
				/>
			</div>
			<DashboardGraph
				revenue={revenue}
				revenueData={revenueData}
				year={year}
			/>
		</div>
	);
}
