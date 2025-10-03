'use client';

import { JSX, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BidsTable } from './BidsTable';
import { CloseRequestModal } from './CloseRequestModal';
import { BidDisplayData } from '../../types/requestDetails';

interface BidsSectionProps {
	requestId: string;
	bidsCount: number;
	bids: BidDisplayData[];
	status: 'open' | 'closed' | 'auto-closed';
	daysActive?: number;
}

export const BidsSection = ({
	requestId,
	bidsCount,
	bids,
	status,
	daysActive,
}: BidsSectionProps): JSX.Element => {
	const router = useRouter();
	const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const remainingDays = daysActive ? Math.max(0, 30 - daysActive) : 0;

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	if (status !== 'open') {
		return <></>;
	}

	const handleCloseRequest = () => {
		if (bids.length === 0) {
			alert(
				'No contractors have submitted bids yet. You cannot close this request without selecting a contractor.',
			);
			return;
		}

		if (isMobile) {
			router.push(`/profile/my-requests/${requestId}/close`);
		} else {
			setIsCloseModalOpen(true);
		}
	};

	return (
		<>
			<section className="mb-14 rounded-lg border-2 border-[#F3F4F6] bg-[#F3F4F6] lg:mb-30">
				<div className="p-6 lg:p-8">
					<div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
						<h2 className="font-chalet-1960 text-[36px] tracking-[-1px] text-[#242424] lg:text-[40px]">
							Submitted Bids{' '}
							<span className="text-[#003BFF]">
								({bidsCount})
							</span>
						</h2>

						<button
							onClick={handleCloseRequest}
							type="button"
							disabled={bids.length === 0}
							className="hidden bg-[#003BFF] px-6 py-4 text-[18px] text-white transition-colors hover:bg-[#0031CC] disabled:cursor-not-allowed disabled:bg-[#003BFF]/50 lg:block"
						>
							Close Request
						</button>
					</div>

					{daysActive !== undefined && (
						<p className="font-chalet-1960 text-[16px] text-[#242424]">
							This request will auto-close in{' '}
							<span className="text-[#003BFF]">
								{remainingDays}{' '}
							</span>
							days. You can close it anytime once work is agreed.
						</p>
					)}
				</div>

				<hr className="border-1" />

				<BidsTable bids={bids} />

				<div className="p-6 lg:hidden">
					<button
						onClick={handleCloseRequest}
						type="button"
						disabled={bids.length === 0}
						className="w-full bg-[#003BFF] px-6 py-4 text-[18px] text-white transition-colors hover:bg-[#0031CC] disabled:cursor-not-allowed disabled:bg-[#003BFF]/50"
					>
						Close Request
					</button>
				</div>
			</section>

			{!isMobile && (
				<CloseRequestModal
					isOpen={isCloseModalOpen}
					onClose={() => setIsCloseModalOpen(false)}
					requestId={requestId}
					bids={bids}
					onSuccess={() => {
						console.log('Request closed successfully!');
					}}
				/>
			)}
		</>
	);
};
