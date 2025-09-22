'use client';

import { JSX, useState } from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

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
	revenueData: { name: string; amount: number }[];
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

	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const defaultIndex = new Date().getMonth();
	const idx =
		activeIndex ??
		Math.min(defaultIndex, Math.max(0, revenueData.length - 1));

	const barSize = 28;
	const chartWidth = 690;

	return (
		<div className="max-w-[747px] min-w-[335px] rounded-[16px] bg-white p-6 shadow-sm">
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
			</div>

			<div className="w-full overflow-x-auto">
				<div style={{ width: chartWidth, height: 300 }}>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={revenueData}
							barSize={barSize}
							onMouseMove={(state: any) => {
								if (
									typeof state?.activeTooltipIndex ===
									'number'
								) {
									setActiveIndex(state.activeTooltipIndex);
								}
							}}
							onMouseLeave={() => setActiveIndex(null)}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
							/>
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip
								formatter={(v: any) => [
									formatMoney(Number(v)),
									'Total',
								]}
								labelFormatter={(label: any) =>
									`${label} ${year}`
								}
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
		</div>
	);
};

//640
