import { axiosInstance } from '@/shared/lib/axiosInstance';
import type {
	RespondToProjectPayload,
	RespondToProjectResponse,
} from '../types/type';

export class RespondToProjectApi {
	static async respondToProject(
		data: RespondToProjectPayload,
	): Promise<RespondToProjectResponse> {
		const response = await axiosInstance.post<RespondToProjectResponse>(
			'/contractor/project/respondToProject',
			data,
		);
		return response.data;
	}
}