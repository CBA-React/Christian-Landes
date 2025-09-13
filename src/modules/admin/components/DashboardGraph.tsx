'use client';

import { JSX } from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import { MONTHS } from '@/app/(admin)/admin/page';
import { RevenueInfo } from '../services/DashboardApi';

function formatMoney(n: number): string {
	return new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(n);
}

interface IDashboardGraph {
	revenue: RevenueInfo | null;
	revenueData: {
		name: string;
		amount: number;
	}[];
	year: number;
}

export const DashboardGraph = ({
	revenue,
	revenueData,
	year,
}: IDashboardGraph): JSX.Element => {
	const totalYear =
		revenue?.totalForYear ??
		revenueData.reduce((s: number, x) => s + x.amount, 0);

	return (
		<div className="max-w-[747px] rounded-[16px] bg-white p-6 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h3 className="font-chalet-1960 text-[24px] font-medium text-[#242424]">
						REVENUE INFORMATION
					</h3>
					<div className="mt-1 text-xs text-neutral-500">
						Total Amount For The Year
					</div>
					<div className="text-3xl font-semibold">
						{formatMoney(totalYear)}
					</div>
				</div>

				<div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm">
					<div className="text-[11px] text-neutral-500">
						{MONTHS[7]} {year}
					</div>
					<div className="flex items-center gap-2">
						<span className="text-neutral-500">Total</span>
						<span className="font-medium">
							{formatMoney(revenueData[7]?.amount || 0)}
						</span>
					</div>
				</div>
			</div>

			<div className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={revenueData} barSize={28}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip
							formatter={(v: any) => [
								formatMoney(Number(v)),
								'Total',
							]}
							cursor={{ fillOpacity: 0.08 }}
						/>
						<Bar
							dataKey="amount"
							fill="#003BFF"
							radius={[6, 6, 0, 0]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
