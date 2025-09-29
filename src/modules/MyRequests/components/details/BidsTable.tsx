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
		<div className="overflow-hidden rounded-lg bg-[#F8F9FA]">
			<div className="grid grid-cols-[1fr_2fr_1.5fr_1fr_1.2fr] gap-4 border-b border-[#E5E7EB] bg-white px-6 py-4 text-sm font-medium text-[#242424]/60">
				<div>Full Name</div>
				<div>Email Address</div>
				<div>Specialization</div>
				<div>Bid Price</div>
				<div>Phone Number</div>
			</div>

			<div className="divide-y divide-[#E5E7EB]">
				{bids.map((bid) => (
					<BidTableRow key={bid.id} bid={bid} />
				))}
			</div>
		</div>
	);
};
