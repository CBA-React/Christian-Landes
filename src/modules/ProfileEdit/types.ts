export interface UpdateProfilePayload {
	id: number;
	full_name: string;
	email: string;
	phone: string;
	location: string;
	about: string | null;
	speciality: Array<{ value: string }>;
	logo: { id: number; url: string; type: string; created_at: string } | null;
}
export interface UpdateProfileFormData {
	fullName: string;
	email: string;
	phone: string;
	location: string;
	about?: string;
	specialities?: string[];
}
export interface UploadedFile {
	id: number;
	url: string;
	type: string;
	created_at: string;
}
export interface UpdateProfileWithImageData extends UpdateProfileFormData {
	uploadedLogo?: UploadedFile;
}
