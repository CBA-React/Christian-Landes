import { axiosInstance } from '@/shared/lib/axiosInstance';
import { AuthRole } from '@/shared/lib/roleMapper';
import type {
	ApiProfileData,
	ProfileData,
	ApiSpecialityItem,
} from '../types/profile';
import { API_ENDPOINTS } from '../constants/profile';

export class ProfileApi {
	private static getEndpoint(authRole: AuthRole): string {
		return API_ENDPOINTS[authRole] || API_ENDPOINTS[1];
	}

	static async getProfile(authRole: AuthRole): Promise<ProfileData> {
		const endpoint = this.getEndpoint(authRole);

		const response = await axiosInstance.get<ApiProfileData>(
			`/${endpoint}/profile`,
		);

		return this.transformProfileData(response.data, authRole);
	}

	static transformProfileData(
		apiData: ApiProfileData,
		authRole: AuthRole,
	): ProfileData {
		const specialities = this.transformSpecialities(apiData.speciality);

		return {
			profile_id: apiData.id,
			name: apiData.full_name,
			email: apiData.email,
			avatar: apiData.logo?.url || '/images/Profile/mock-avatar.jpg',
			role: authRole === 2 ? 'contractor' : 'client',
			rating: apiData.avg_reviews || 0,
			reviewsCount: apiData._count?.reviews || 0,
			phone: apiData.phone || '',
			location: apiData.location || '',
			about: apiData.about || null,
			specialities,
		};
	}

	private static transformSpecialities(
		speciality: ApiSpecialityItem[] | undefined,
	): string[] {
		if (!speciality || !Array.isArray(speciality)) {
			return [];
		}

		return speciality
			.map((item: ApiSpecialityItem) => item.value)
			.filter(Boolean);
	}
}
