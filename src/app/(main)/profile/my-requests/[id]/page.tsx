'use client';

import { JSX } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';
import { useRequestDetails } from '@/modules/MyRequests/hooks/useRequestDetails';
import { BidsSection } from '@/modules/MyRequests/components/details/BidsSection';
import { RequestImageGallery } from '@/modules/MyRequests/components/details/RequestImageGallery';
import { RequestDescription } from '@/modules/MyRequests/components/details/RequestDescription';
import { RequestDetailsHeader } from '@/modules/MyRequests/components/details/RequestDetailsHeader';
import { RequestDetailsPanel } from '@/modules/MyRequests/components/details/RequestDetailsPanel';

export default function RequestDetailsPage(): JSX.Element {
	const params = useParams();
	const router = useRouter();
	const requestId = params.id as string;

	const { data: request, isLoading, error } = useRequestDetails(requestId);

	if (isLoading) {
		return (
			<ProfileLayout showHeader={false} showSidebar={false}>
				<div className="flex justify-center py-20">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
				</div>
			</ProfileLayout>
		);
	}

	if (error || !request) {
		return (
			<ProfileLayout showHeader={false} showSidebar={false}>
				<div className="py-20 text-center">
					<h2 className="mb-4 text-2xl font-bold">
						Request not found
					</h2>
					<button
						onClick={() => router.back()}
						className="text-blue-600 hover:underline"
					>
						← Back to My Requests
					</button>
				</div>
			</ProfileLayout>
		);
	}

	// Prepare details for the panel
	const projectDetails = [
		{
			icon: (
				<svg
					className="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
					/>
				</svg>
			),
			label: '',
			value: '1234 Sqft',
		},
		{
			icon: (
				<svg
					className="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
					/>
				</svg>
			),
			label: '',
			value: 'Materials already purchased',
		},
		{
			icon: (
				<svg
					className="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			),
			label: 'Desired start:',
			value: request.preferredStart,
		},
		{
			icon: (
				<svg
					className="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			),
			label: '',
			value: request.completionWindow,
		},
		{
			icon: (
				<svg
					className="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			),
			label: '',
			value: 'Private house',
		},
	];

	return (
		<>
			<div className="h-[380px] bg-[#F1F3F6]"></div>
			<ProfileLayout showHeader={false} showSidebar={false}>
				<div className="mx-auto py-6">
					<RequestDetailsHeader
						title={request.title}
						location={request.location}
						category={request.category}
						status={request.status}
						statusBadge={request.statusBadge}
					/>

					<RequestImageGallery images={request.images} />

					<div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
						<div className="rounded-lg bg-white p-6">
							<RequestDescription
								description={request.description}
								bidsCount={request.bidsCount}
								postedDate={request.postedDate}
								budgetFormatted={request.budgetFormatted}
							/>
						</div>

						<RequestDetailsPanel details={projectDetails} />
					</div>

					<BidsSection
						bidsCount={request.bidsCount}
						bids={request.bids}
						status={request.status}
					/>
				</div>
			</ProfileLayout>
		</>
	);
}
