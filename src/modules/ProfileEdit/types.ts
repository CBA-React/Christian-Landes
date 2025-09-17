//API

export interface UpdateProfilePayload {
	id: number;
	full_name: string;
	email: string;
	phone: string;
	location: string;
	about: string | null;
	speciality: Array<{ value: string }>;
	logo?: any;
}



//LOCAL



export interface UpdateProfileFormData {
	fullName: string;
	email: string;
	phone: string;
	location: string;
	about?: string;
	specialities?: string[];
}