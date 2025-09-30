'use client';

import { JSX } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useRequestDetails } from '@/modules/MyRequests/hooks/useRequestDetails';
import { BidsSection } from '@/modules/MyRequests/components/details/BidsSection';
import { RequestImageGallery } from '@/modules/MyRequests/components/details/RequestImageGallery';
import { MobileImageCarousel } from '@/modules/MyRequests/components/details/MobileImageCarousel';
import { RequestDescription } from '@/modules/MyRequests/components/details/RequestDescription';
import { RequestDetailsHeader } from '@/modules/MyRequests/components/details/RequestDetailsHeader';
import { RequestDetailsPanel } from '@/modules/MyRequests/components/details/RequestDetailsPanel';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary';
import { LocationSection } from '@/modules/MyRequests/components/details/LocationSection';

const LoadingState = () => (
	<div className="flex justify-center py-20" role="status" aria-live="polite">
		<div className="flex items-center gap-3">
			<div
				className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
				aria-hidden="true"
			/>
			<span className="text-gray-600">Loading request...</span>
		</div>
	</div>
);

const ErrorState = ({
	error,
	onRetry,
}: {
	error: string;
	onRetry: () => void;
}) => (
	<section
		className="flex flex-col items-center justify-center py-12 text-center"
		role="alert"
		aria-live="polite"
	>
		<h2 className="mb-2 text-lg font-medium text-[#242424]">
			Error loading request
		</h2>
		<p className="mb-4 text-[#242424]/50">{error}</p>
		<button
			onClick={onRetry}
			className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		>
			Try Again
		</button>
	</section>
);

export default function RequestDetailsPage(): JSX.Element {
	const params = useParams();
	const router = useRouter();
	const requestId = params.id as string;

	const {
		data: request,
		isLoading,
		error,
		refetch,
	} = useRequestDetails(requestId);

	if (isLoading) {
		return (
			<ErrorBoundary>
				<ProfileLayout showHeader={true} showSidebar={true}>
					<section className="mb-10 w-full max-w-full overflow-hidden">
						<div className="mb-6">
							<button
								onClick={() => router.back()}
								className="mb-4 text-blue-600 hover:underline"
							>
								← Back to My Requests
							</button>
						</div>

						<LoadingState />
					</section>
				</ProfileLayout>
			</ErrorBoundary>
		);
	}

	if (error || !request) {
		return (
			<ErrorBoundary>
				<ProfileLayout showHeader={true} showSidebar={true}>
					<section className="mb-10 w-full max-w-full overflow-hidden">
						<div className="mb-6">
							<button
								onClick={() => router.back()}
								className="mb-4 text-blue-600 hover:underline"
							>
								← Back to My Requests
							</button>
						</div>

						<ErrorState
							error={
								error instanceof Error
									? error.message
									: 'Request not found or has been deleted'
							}
							onRetry={() => refetch()}
						/>
					</section>
				</ProfileLayout>
			</ErrorBoundary>
		);
	}

	const projectDetails = [
		{
			label: 'Desired start:',
			value: request.preferredStart,
			type: 'calendar' as const,
		},
		{
			label: '',
			value: request.completionWindow,
			type: 'clock' as const,
		},
	];

	return (
		<ErrorBoundary>
			<>
				<div className="block bg-[#F1F3F6] px-5 pt-17 lg:pt-89">
					<div className="flex items-center justify-center lg:hidden">
						<RequestDetailsHeader
							title={request.title}
							location={request.location}
							category={request.category}
							status={request.status}
							statusBadge={request.statusBadge}
						/>
					</div>
				</div>

				<div className="mx-auto px-5 lg:mt-[-210px] lg:max-w-[1285px]">
					<div className="hidden lg:block">
						<RequestDetailsHeader
							title={request.title}
							location={request.location}
							category={request.category}
							status={request.status}
							statusBadge={request.statusBadge}
						/>
					</div>

					<div className="my-6 block lg:hidden">
						<MobileImageCarousel images={request.images} />
					</div>

					<div className="hidden lg:block">
						<RequestImageGallery images={request.images} />
					</div>

					<div className="mb-14 grid grid-cols-1 gap-6 lg:mb-30 lg:grid-cols-[1fr_400px] lg:gap-12 lg:px-0">
						<div className="order-2 md:order-1">
							<RequestDescription
								description={request.description}
								bidsCount={request.bidsCount}
								postedDate={request.postedDate}
								budgetFormatted={request.budgetFormatted}
								status={request.status}
							/>
						</div>

						<RequestDetailsPanel
							className="order-1 md:order-2"
							details={projectDetails}
						/>
					</div>

					<div className="">
						<BidsSection
							bidsCount={request.bidsCount}
							bids={request.bids}
							status={request.status}
							daysActive={request.daysActive}
						/>

						<LocationSection location={request.location} />
					</div>
				</div>
			</>
		</ErrorBoundary>
	);
}
