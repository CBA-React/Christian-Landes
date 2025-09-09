import { axiosInstance } from '@/shared/lib/axiosInstance';
import { LoginPayload, RegisterPayload } from '../type';

type LoginResponse = {
	access_token: string;
	refresh_token: string;
};

export class AuthApi {
	static async login(data: LoginPayload): Promise<LoginResponse> {
		const res = await axiosInstance.post<LoginResponse>('auth/login', data);
		return res.data;
	}

	static async register(data: RegisterPayload): Promise<void> {
		await axiosInstance.post<void>('auth/register', data);
	}

	static async recoveryPassword(email: string): Promise<void> {
		await axiosInstance.post<void>('auth/recoveryPassword', { email });
	}

	static async verifyOtp(email: string, otp: string): Promise<void> {
		await axiosInstance.post<void>('auth/recoveryPasswordCheckOtp', {
			email,
			otp,
		});
	}

	static logout(): void {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		document.cookie = 'token=; Max-Age=0; path=/';
	}
}
