import { axiosInstance } from '@/shared/lib/axiosInstance';

export type UserRole = 1 | 2;

export type RevenueMonth = {
	month: number;
	sum: number;
};

export type RevenueInfo = {
	totalForYear: number;
	months: RevenueMonth[];
};

export type CountDelta = {
	month: number;
	year: number;
	currentCount: number;
	previousCount: number;
	percentChange: number;
};

function normalizeCount(payload: any): CountDelta {
	const month = Number(payload?.month) || 0;
	const year = Number(payload?.year) || 0;
	const currentCount = Number(payload?.currentCount) || 0;
	const previousCount = Number(payload?.previousCount) || 0;

	const computed =
		previousCount === 0
			? currentCount === 0
				? 0
				: 100
			: ((currentCount - previousCount) / Math.abs(previousCount)) * 100;

	const percentChange =
		typeof payload?.percentChange === 'number'
			? payload.percentChange
			: computed;

	return { month, year, currentCount, previousCount, percentChange };
}

function pickNumber(value: any): number {
	if (typeof value === 'number') return value;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeRevenue(payload: any): RevenueInfo {
	const total =
		pickNumber(payload?.totalForYear) ||
		pickNumber(payload?.yearTotal) ||
		pickNumber(payload?.total) ||
		pickNumber(payload?.data?.totalForYear);

	const rawMonths =
		payload?.months ??
		payload?.data?.months ??
		payload?.monthly ??
		payload?.data?.monthly ??
		[];

	const months: RevenueMonth[] = Array.isArray(rawMonths)
		? rawMonths.map((m: any) => ({
				month:
					pickNumber(m.month) ||
					pickNumber(m.monthIndex) ||
					pickNumber(m.m),
				sum: pickNumber(m.total ?? m.amount ?? m.value),
			}))
		: [];

	const fallbackTotal =
		total || months.reduce((acc, m) => acc + (m.sum || 0), 0);

	const cleaned = months.filter((m) => m.month >= 1 && m.month <= 12);

	return { totalForYear: fallbackTotal, months: cleaned };
}

export class DashboardApi {
	static async getCountUserWithRole(params: {
		month: number;
		year: number;
		role: UserRole;
	}): Promise<CountDelta> {
		const res = await axiosInstance.get(
			'admin/dashboard/getCountUserWithRole',
			{ params },
		);
		return normalizeCount(res.data);
	}

	static async getCountActiveProjects(params: {
		month: number;
		year: number;
	}): Promise<CountDelta> {
		const res = await axiosInstance.get(
			'admin/dashboard/getCountActiveProjects',
			{ params },
		);
		return normalizeCount(res.data);
	}

	static async getRevenueInformation(): Promise<RevenueInfo> {
		const res = await axiosInstance.get(
			'admin/dashboard/getRevenueInformation',
		);
		return normalizeRevenue(res.data);
	}
}
