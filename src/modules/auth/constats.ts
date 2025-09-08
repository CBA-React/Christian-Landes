import { RegisterPayload } from './type';

export const ROLE_BY_PATH: Record<string, RegisterPayload['role']> = {
	homeowner: '1',
	contractor: '2',
};
