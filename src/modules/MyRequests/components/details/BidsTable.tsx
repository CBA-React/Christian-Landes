import { JSX } from 'react';
import { BidDisplayData } from '../../types/requestDetails';
import { BidTableRow } from './BidTableRow';

interface BidsTableProps {
	bids: BidDisplayData[];
}

export const BidsTable = ({ bids }: BidsTableProps): JSX.Element => {
	if (bids.length === 0) {
		return (
			<div className="rounded-lg bg-[#F8F9FA] p-12 text-center">
				<p className="text-[#242424]/60">
					No bids submitted yet. Check back later!
				</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto lg:overflow-x-hidden">
			<div className="min-w-max lg:min-w-0">
				<div className="font-chalet-1960 grid min-w-[900px] grid-cols-[200px_220px_180px_120px_140px] gap-4 bg-[#F1F3F6] px-6 py-6 text-[16px] text-[#242424]/70 lg:min-w-0 lg:grid-cols-[2fr_2fr_1.5fr_1fr_1.2fr] lg:px-8 lg:py-8">
					<div>Full Name</div>
					<div>Email Address</div>
					<div>Specialization</div>
					<div>Bid Price</div>
					<div>Phone Number</div>
				</div>

				<div>
					{bids.map((bid, index) => (
						<BidTableRow key={bid.id} bid={bid} index={index} />
					))}
				</div>
			</div>
		</div>
	);
};
