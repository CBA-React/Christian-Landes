'use client';

import { useRouter, useParams } from 'next/navigation';
import { useRequestDetails } from '@/modules/MyRequests/hooks/useRequestDetails';
import { CloseRequestForm } from '@/modules/MyRequests/components/details/CloseRequestForm';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';

export default function CloseRequestPage() {
	const router = useRouter();
	const params = useParams();
	const requestId = params.id as string;

	const { data: request, isLoading, error } = useRequestDetails(requestId);

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<LoadingSpinner />
			</div>
		);
	}

	if (error || !request) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<p className="text-red-500">Failed to load request details</p>
			</div>
		);
	}

	if (request.bids.length === 0) {
		return (
			<div className="flex min-h-screen items-center justify-center p-5">
				<div className="text-center">
					<p className="mb-4 text-lg text-[#242424]">
						No contractors have submitted bids yet.
					</p>
					<button
						onClick={() => router.back()}
						type="button"
						className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<header className="bg-[#F1F3F6] pt-28 pb-8 lg:pt-40">
				<div className="mx-auto max-w-[1280px] px-5">
					<h1 className="font-chalet-1960 mb-2 text-center text-[36px] tracking-[-1px] text-[#242424] md:text-[40px]">
						Project Closure
					</h1>
					<p className="text-center text-[16px] leading-relaxed text-[#242424]">
						Share your emotions from the contractor
					</p>
				</div>
			</header>

			<main className="mx-auto max-w-[1100px] px-5 pt-6 pb-14">
				<CloseRequestForm
					requestId={requestId}
					bids={request.bids}
					onSuccess={() => {
						router.push(`/profile/my-requests/${requestId}`);
					}}
				/>
			</main>
		</div>
	);
}
