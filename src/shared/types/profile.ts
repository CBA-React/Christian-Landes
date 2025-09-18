export interface ApiSpecialityItem {
	id: number;
	user_id: number;
	value: string;
	created_at: string;
}

export interface ApiProfileData {
	id: number;
	full_name: string;
	email: string;
	phone?: string;
	location?: string;
	about?: string | null;
	speciality?: ApiSpecialityItem[];
	google_id?: string | null;
	facebook_id?: string | null;
	apple_id?: string | null;
	windows_id?: string | null;
	logo?: {
		id: number;
		url: string;
		type: string;
		created_at: string;
	} | null;
	avg_reviews?: number;
	_count?: {
		reviews?: number;
	};
}

export interface ProfileData {
	profile_id: number;
	name: string;
	email: string;
	avatar: string;
	role: 'contractor' | 'client';
	rating: number;
	reviewsCount: number;
	phone: string;
	location: string;
	about: string | null;
	specialities: string[];
}
