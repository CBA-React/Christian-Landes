import { axiosInstance } from '@/shared/lib/axiosInstance';
import { AuthRole } from '@/shared/lib/roleMapper';
import { API_ENDPOINTS } from '@/shared/constants/profile';
import type { ApiProfileData } from '@/shared/types/profile';
import type { UpdateProfilePayload, UpdateProfileFormData } from '../types';

export class ProfileEditApi {
	private static getEndpoint(authRole: AuthRole): string {
		return API_ENDPOINTS[authRole] || API_ENDPOINTS[1];
	}

	static async updateProfile(
		authRole: AuthRole,
		data: UpdateProfilePayload,
	): Promise<ApiProfileData> {
		const endpoint = this.getEndpoint(authRole);

		const response = await axiosInstance.post<ApiProfileData>(
			`/${endpoint}/profile/update`,
			data,
		);

		return response.data;
	}

	static transformToApiFormat(
		formData: UpdateProfileFormData,
		userId: number,
		uploadedFile?: {
			id: number;
			url: string;
			type: string;
			created_at: string;
		},
	): UpdateProfilePayload {
		const logoData = uploadedFile
			? {
					id: uploadedFile.id,
					url: uploadedFile.url,
					type: uploadedFile.type,
					created_at: uploadedFile.created_at,
				}
			: null;

		return {
			id: userId,
			full_name: formData.fullName,
			email: formData.email,
			phone: formData.phone,
			location: formData.location,
			about:
				formData.about === '' || !formData.about
					? null
					: formData.about,
			speciality: (formData.specialities || []).map((value) => ({
				value,
			})),
			logo: logoData,
		};
	}

	static transformToFormFormat(
		apiData: ApiProfileData,
	): UpdateProfileFormData {
		const specialities = this.transformSpecialities(apiData.speciality);

		return {
			fullName: apiData.full_name,
			email: apiData.email,
			phone: apiData.phone || '',
			location: apiData.location || '',
			about: apiData.about || '',
			specialities,
		};
	}

	private static transformSpecialities(
		speciality: any[] | undefined,
	): string[] {
		if (!speciality || !Array.isArray(speciality)) {
			return [];
		}

		return speciality.map((item: any) => item.value).filter(Boolean);
	}
}
