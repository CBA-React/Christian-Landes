import { JSX } from 'react';
import { BidsTable } from './BidsTable';
import { BidDisplayData } from '../../types/requestDetails';

interface BidsSectionProps {
	bidsCount: number;
	bids: BidDisplayData[];
	status: 'open' | 'closed';
}

export const BidsSection = ({
	bidsCount,
	bids,
	status,
}: BidsSectionProps): JSX.Element => {
	return (
		<div className="mt-8">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-[24px] font-normal text-[#242424]">
					Submitted Bids{' '}
					<span className="text-[#003BFF]">({bidsCount})</span>
				</h2>

				{status === 'open' && (
					<button
						onClick={() => console.log('Close request')}
						className="rounded-lg bg-[#003BFF] px-6 py-2 text-white transition-colors hover:bg-[#0031CC]"
					>
						Close Request
					</button>
				)}
			</div>

			{status === 'open' && (
				<p className="mb-4 text-sm text-[#242424]/60">
					This request will auto-close in 27 days. You can close it
					anytime once work is agreed.
				</p>
			)}

			<BidsTable bids={bids} />
		</div>
	);
};
