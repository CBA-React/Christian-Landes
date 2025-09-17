export interface UploadResponse {
	result: {
		id: number;
		url: string;
		type: string;
		created_at: string;
	};
}

export interface UploadFileParams {
	file: File;
	type: 'logo' | 'document' | 'image';
}

export interface UploadedFile {
	id: number;
	url: string;
	type: string;
	created_at: string;
}