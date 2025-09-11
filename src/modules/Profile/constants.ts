// modules/Profile/constants.ts

export enum ProfileSection {
	OVERVIEW = 'overview',
	AVAILABLE_PROJECTS = 'available-projects',
	MY_BIDS = 'my-bids',
	MY_REQUESTS = 'my-requests',
	CONTRACTORS = 'contractors',
	REVIEWS = 'reviews',
	PRICING_PLAN = 'pricing-plan',
}

interface ContractorBusinessInfo {
	businessName: string;
	email: string;
	phone: string;
	serviceArea: string;
	about: string;
	specialities: string[];
}

interface ClientBusinessInfo {
	fullName: string;
	email: string;
	phone: string;
	location: string;
	about: string;
	typicalProjects: string[];
}

export const PROFILE_MOCK_DATA = {
	contractor: {
		profile: {
			id: '1',
			name: 'Mark Stevens',
			email: 'mark@example.com',
			avatar: '/images/Profile/mock-avatar.jpg',
			role: 'contractor' as const,
			rating: 4.8,
			reviewsCount: 34,
		},
		stats: [
			{ label: 'Active Projects', value: 3 },
			{ label: 'Submitted Bids', value: 12 },
			{ label: 'Total Earnings', value: '$24,500' },
		],
		businessInfo: {
			businessName: 'Mark Stevens',
			email: 'contractor@example.com',
			phone: '(555) 123-4567',
			serviceArea: 'San Francisco Bay Area',
			about: "Hi, I'm Mark — a reliable handyman with 8+ years of experience in home repairs. I handle everything from minor fixes to full room updates. I show up on time, work clean, and get the job done right. Friendly, professional, and fully equipped. Let's make your home better, one task at a time.",
			specialities: ['Renovation', 'Electrical Plumbing'],
		} as ContractorBusinessInfo,
	},
	client: {
		profile: {
			id: '2',
			name: 'John Smith',
			email: 'john@example.com',
			avatar: '/images/Profile/mock-avatar.jpg',
			role: 'client' as const,
			rating: 4.5,
			reviewsCount: 12,
		},
		stats: [
			{ label: 'Projects Posted', value: 13 },
			{ label: 'Bids Received', value: 89 },
			{ label: 'Projects Completed', value: 30 },
			{ label: 'Total Spent', value: '$234,500' },
		],
		businessInfo: {
			fullName: 'John Smith',
			email: 'client@example.com',
			phone: '(555) 123-4567',
			location: 'Salt Lake City, UT',
			about: 'Updating an older home in the Sugar House area. Need help with small remodels, seasonal yard work and occasional emergency fixes. Prefer weekday mornings; text first if urgent',
			typicalProjects: ['Landscaping', 'Plumbing'],
		} as ClientBusinessInfo,
	},
};
