export interface LoginPayload {
	email: string;
	password: string;
}

export type RegisterPayload = {
	full_name: string;
	email: string;
	phone?: string;
	location?: string;
	password: string;
	role: 1 | 2 | 3;
	google_id?: string;
	facebook_id?: string;
};

export type SocialRegisterPayload = {
	google_id?: string;
	facebook_id?: string;
	role: 1 | 2 | 3;
};

export type SocialLoginPayload = {
	google_id?: string;
	facebook_id?: string;
};
