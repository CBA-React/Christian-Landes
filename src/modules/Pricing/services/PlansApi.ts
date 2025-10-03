import { axiosInstance } from '@/shared/lib/axiosInstance';

export type RawPlan = {
	id: number;
	title: string | null;
	type: 1 | 2 | 3;
	amount_cents: number | null;
	stripe_price_id: string | null;
	created_at: string;
	position: number;
};

export type Plan = {
	id: number;
	name: string;
	type: 1 | 2 | 3;
	price: number;
	period: 'per month' | 'per year' | 'per state/month';
	features: string[];
	stripe_price_id: string | null;
	position: number;
};

export type MyPlanResponse = {
	plan_id: number | null;
	name: string | null;
	price: number | null;
	interval: 'month' | 'year' | null;
	tagline?: string | null;
} | null;

export type MyPlan = {
	plan_id: number | null;
	name: string;
	price: number;
	interval: 'month' | 'year';
	tagline?: string;
};

const featuresByType: Record<1 | 2 | 3, string[]> = {
	1: [
		'25-mile service radius',
		'Unlimited job bidding',
		'Professional profile',
		'Direct messaging',
		'Mobile app access',
		'Email support',
	],
	2: [
		'75-mile service radius',
		'Unlimited job bidding',
		'Featured profile listing',
		'Priority job notifications',
		'Advanced analytics',
		'Phone & email support',
	],
	3: [
		'Statewide coverage',
		'Unlimited job bidding',
		'Premium profile placement',
		'Instant job alerts',
		'Dedicated account manager',
		'24/7 priority support',
	],
};

const centsToDollars = (cents: number | null | undefined): number =>
	Math.max(0, Math.round((cents ?? 0) / 1)) / 100;

const normalizePlan = (p: RawPlan): Plan => {
	const name = p.title?.trim() || 'Free';
	const price = centsToDollars(p.amount_cents);
	const period = p.type === 3 ? 'per state/month' : 'per month';

	return {
		id: p.id,
		name,
		type: p.type,
		price,
		period,
		features: featuresByType[p.type],
		stripe_price_id: p.stripe_price_id,
		position: p.position,
	};
};

const normalizeMyPlan = (d: MyPlanResponse): MyPlan => ({
	plan_id: d?.plan_id ?? null,
	name: d?.name ?? 'Free',
	price: d?.price ?? 0,
	interval: (d?.interval as 'month' | 'year') ?? 'month',
	tagline: d?.tagline ?? '',
});

export class PlansApi {
	static async getPlans(): Promise<Plan[]> {
		const res = await axiosInstance.get<RawPlan[]>(
			'contractor/plans/getPlans',
		);
		const arr = (res.data ?? []).map(normalizePlan);
		return arr.sort((a, b) => a.position - b.position);
	}

	static async getMyPlan(): Promise<MyPlan> {
		const res = await axiosInstance.get<MyPlanResponse>(
			'contractor/plans/getMyPlan',
		);
		return normalizeMyPlan(res.data);
	}

	static async createSubscription(plan_id: number): Promise<{ url: string }> {
		const res = await axiosInstance.post<{ url: string }>(
			'contractor/plans/subscriptions',
			{ plan_id },
		);
		return res.data;
	}

	static async changePlan(plan_id: number): Promise<{ url: string }> {
		const res = await axiosInstance.post<{ url: string }>(
			'contractor/plans/changePlan',
			{ plan_id },
		);
		return res.data;
	}
}
