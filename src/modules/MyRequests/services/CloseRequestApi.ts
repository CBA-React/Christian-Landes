import { axiosInstance } from '@/shared/lib/axiosInstance';
import type {
	CloseRequestPayload,
	CloseRequestResponse,
} from '../types/requestDetails';

export class CloseRequestApi {
	static async closeRequest(
		data: CloseRequestPayload,
	): Promise<CloseRequestResponse> {
		const response = await axiosInstance.post<CloseRequestResponse>(
			'/homeowner/project/closeProject',
			data,
		);
		return response.data;
	}
}