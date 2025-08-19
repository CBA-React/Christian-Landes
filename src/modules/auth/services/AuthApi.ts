import { axiosInstance } from '@/shared/lib/axiosInstance';
import { LoginPayload, RegisterPayload } from '../type';

export class AuthApi {
	static async login(
		data: LoginPayload,
	): Promise<{ token: string; email: string }> {
		const response = await axiosInstance.post('/api/auth/login', data);
		return response.data;
	}

	static async register(data: RegisterPayload): Promise<void> {
		await axiosInstance.post('/api/auth/register', data);
	}

	static logout(): void {
		document.cookie = 'token=; Max-Age=0; path=/';
	}
}
