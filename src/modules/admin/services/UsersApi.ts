import { axiosInstance } from '@/shared/lib/axiosInstance';

export type UserRole = 1 | 2 | 3;

export type ApiUser = {
	id: number;
	full_name: string;
	phone: string | null;
	email: string;
	role: UserRole;
	created_at: string;
	logo: { url: string } | null;
	// status?: 'blocked' | 'unblocked';
};

export type UsersResponse = {
	data: ApiUser[];
	page?: number;
	perPage?: number;
	total?: number;
};

export class UsersApi {
	static async getUsers(params?: {
		page?: number;
		perPage?: number;
		role?: UserRole | '';
		search?: string;
		sort?: 'name' | 'date' | 'role';
		order?: 'asc' | 'desc';
	}): Promise<UsersResponse> {
		const {
			page = 1,
			perPage = 10,
			role = '',
			search = '',
			sort = 'date',
			order = 'desc',
		} = params || {};
		const url = `/admin/users/getUsers?page=${page}&perPage=${perPage}${
			role ? `&role=${role}` : ''
		}${search ? `&search=${encodeURIComponent(search)}` : ''}${
			sort ? `&sort=${sort}&order=${order}` : ''
		}`;
		const res = await axiosInstance.get<UsersResponse>(url);
		return res.data;
	}

	static async toggleBlock(id: number): Promise<Axios.AxiosXHR<unknown>> {
		return axiosInstance.post(`/admin/users/blockUnblockUser`, { id });
	}

	static async deleteUser(id: number): Promise<Axios.AxiosXHR<unknown>> {
		return axiosInstance.post(`/admin/users/deleteUser`, { id });
	}
}
