import { axiosInstance } from '@/shared/lib/axiosInstance';

export type UserRole = 1 | 2;

const MONTH_NAME_TO_NUM: Record<string, number> = {
	january: 1,
	february: 2,
	march: 3,
	april: 4,
	may: 5,
	june: 6,
	july: 7,
	august: 8,
	september: 9,
	october: 10,
	november: 11,
	december: 12,
};

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
		const raw = res.data as { month: string; sum: number }[];

		const months: RevenueMonth[] = (raw ?? raw).map((m: any) => {
			if (typeof m?.month === 'number') {
				return { month: m.month, sum: pickNumber(m.sum) };
			}
			const dateStr = String(m?.date ?? '').trim();
			const monthName = dateStr.split(' ')[0]?.toLowerCase() ?? '';
			const month = MONTH_NAME_TO_NUM[monthName] ?? 0;
			return { month, sum: pickNumber(m?.sum) };
		});

		const totalForYear = months.reduce((acc, x) => acc + (x.sum || 0), 0);

		return { totalForYear, months };
	}
}
