export interface ProfileData {
	id: string;
	name: string;
	email: string;
	avatar: string;
	role: 'contractor' | 'client';
	rating?: number;
	reviewsCount?: number;
}

export interface StatItem {
	label: string;
	value: string | number;
}
