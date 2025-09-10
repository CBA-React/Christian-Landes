export interface ProfileData {
	id: string;
	name: string;
	email: string;
	avatar: string;
	role: 'contractor' | 'client';
	rating?: number;
	reviewsCount?: number;
}

export interface ProfileStats {
	primaryStat: {
		label: string;
		value: string | number;
	};
	secondaryStat: {
		label: string;
		value: string | number;
	};
	tertiaryStat: {
		label: string;
		value: string | number;
	};
	totalSpent?: {
		label: string;
		value: string;
	};
}
