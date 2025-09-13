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

function pickNumber(value: any): number {
	if (typeof value === 'number') return value;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : 0;
}

function pickCount(payload: any): number {
	if (typeof payload === 'number') return payload;
	if (payload?.count != null) return pickNumber(payload.count);
	if (payload?.total != null) return pickNumber(payload.total);
	if (payload?.data?.count != null) return pickNumber(payload.data.count);
	if (payload?.data?.total != null) return pickNumber(payload.data.total);
	return 0;
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
	}): Promise<number> {
		const res = await axiosInstance.get(
			'admin/dashboard/getCountUserWithRole',
			{ params },
		);
		return pickCount(res.data);
	}

	static async getCountActiveProjects(params: {
		month: number;
		year: number;
	}): Promise<number> {
		const res = await axiosInstance.get(
			'admin/dashboard/getCountActiveProjects',
			{ params },
		);
		return pickCount(res.data);
	}

	static async getRevenueInformation(): Promise<RevenueInfo> {
		const res = await axiosInstance.get(
			'admin/dashboard/getRevenueInformation',
		);
		return normalizeRevenue(res.data);
	}
}
