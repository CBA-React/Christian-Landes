export interface LoginPayload {
	email: string;
	password: string;
}

export interface RegisterPayload extends LoginPayload {
	full_name: string;
	phone: string;
	location: string;
	role: '1' | '2' | '3';
}
