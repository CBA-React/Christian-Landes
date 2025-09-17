import { axiosInstance } from '@/shared/lib/axiosInstance';
import type {
	UploadResponse,
	UploadFileParams,
	UploadedFile,
} from '@/shared/types/upload';

export class UploadApi {
	static async uploadFile({
		file,
		type,
	}: UploadFileParams): Promise<UploadedFile> {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('type', type);

		const response = await axiosInstance.post<UploadResponse>(
			'/upload/uploadFile',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);

		console.log(response.data.result);

		return response.data.result;
	}

	static validateImageFile(file: File): { isValid: boolean; error?: string } {
		if (!file.type.startsWith('image/')) {
			return {
				isValid: false,
				error: 'Please select a valid image file',
			};
		}

		if (file.size > 5 * 1024 * 1024) {
			return {
				isValid: false,
				error: 'Image size should be less than 5MB',
			};
		}

		const validExtensions = ['jpg', 'jpeg', 'png'];
		const fileExtension = file.name.split('.').pop()?.toLowerCase();

		if (!fileExtension || !validExtensions.includes(fileExtension)) {
			return {
				isValid: false,
				error: 'Please select a valid image file (jpg, jpeg, png)',
			};
		}

		return { isValid: true };
	}
}
