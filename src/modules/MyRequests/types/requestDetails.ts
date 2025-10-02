import type { ApiImage } from './type';

export interface ApiBidUser {
	id: number;
	full_name: string;
	email: string;
	phone: string;
	speciality: {
		id: number;
		user_id: number;
		value: string;
		created_at: string;
	}[];
	logo: {
		id: number;
		url: string;
		type: string;
		created_at: string;
	} | null;
}

export interface ApiBid {
	id: number;
	bid: number;
	user_id: number;
	project_id: number;
	begin_work: string;
	estimate: string;
	message: string;
	status: number;
	created_at: string;
	user: ApiBidUser;
}

export interface ApiRequestDetails {
	id: number;
	user_id: number;
	title: string;
	category: string;
	location: string;
	budget: number;
	preferred_start: string;
	completion_window: string;
	description: string;
	images: ApiImage[];
	status: number;
	created_at: string;
	bids: ApiBid[];
}

export interface BidDisplayData {
	id: string;
	amount: number;
	amountFormatted: string;
	contractorId: string;
	contractorName: string;
	contractorEmail: string;
	contractorPhone: string;
	contractorLogo: string | null;
	specialities: string[];
	beginWork: string;
	estimate: string;
	message: string;
	status: number;
	createdAt: string;
	postedDate: string;
}

export interface RequestDetailsDisplayData {
	id: string;
	title: string;
	category: string;
	location: string;
	budget: number;
	budgetFormatted: string;
	preferredStart: string;
	completionWindow: string;
	description: string;
	images: string[];
	status: 'open' | 'closed' | 'auto-closed';
	statusBadge: {
		text: string;
		variant: string;
	};
	createdAt: string;
	postedDate: string;
	bidsCount: number;
	bids: BidDisplayData[];
	daysActive?: number;
}


export interface CloseRequestFormData {
	bid_id: string;
	contractor_id: string;
	text: string;
	rating: number;
}

export interface CloseRequestPayload {
	project_id: number;
	bid_id: number;
	contractor_id: number;
	text: string;
	rating: number;
}

export interface CloseRequestResponse {
	id: number;
	user_id: number;
	title: string;
	category: string;
	location: string;
	budget: number;
	preferred_start: string;
	completion_window: string;
	description: string;
	images: Array<{
		id: number;
		url: string;
		type: string;
		created_at: string;
	}>;
	status: number;
	created_at: string;
	bids: ApiBid[]; 
}

export interface ContractorOption {
	value: string;
	label: string;
	bidId: string;
}