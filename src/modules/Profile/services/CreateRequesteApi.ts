import { axiosInstance } from '@/shared/lib/axiosInstance';
import type { CreateRequestPayload, CreateRequestResponse } from '../types';

export class CreateRequestApi {
	static async CreateRequest(
		data: CreateRequestPayload,
	): Promise<CreateRequestResponse> {
		const response = await axiosInstance.post<CreateRequestResponse>(
			'/homeowner/project/create',
			data,
		);
		return response.data;
	}
}
