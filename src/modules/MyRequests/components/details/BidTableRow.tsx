import { JSX } from 'react';
import Image from 'next/image';
import { BidDisplayData } from '../../types/requestDetails';
import { SpecialityTag } from '@/shared/components/SpecialityTag/SpecialityTag';

interface BidTableRowProps {
	bid: BidDisplayData;
	index: number;
}

export const BidTableRow = ({ bid, index }: BidTableRowProps): JSX.Element => {
	return (
		<div
			className={`grid min-w-[900px] grid-cols-[200px_220px_180px_120px_140px] gap-4 px-6 py-3 lg:min-w-0 lg:grid-cols-[2fr_2fr_1.5fr_1fr_1.2fr] lg:px-7 lg:py-4 ${
				index % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'
			}`}
		>
			<div className="flex min-w-0 items-center gap-2 lg:gap-3">
				<div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
					{bid.contractorLogo ? (
						<Image
							src={bid.contractorLogo}
							alt={bid.contractorName}
							fill
							className="object-cover"
						/>
					) : (
						<div className="flex h-full items-center justify-center text-base font-bold text-gray-400 lg:text-lg">
							{bid.contractorName.charAt(0).toUpperCase()}
						</div>
					)}
				</div>
				<span
					className="font-chalet-1960 min-w-0 truncate text-[16px] text-[#242424]"
					title={bid.contractorName}
				>
					{bid.contractorName}
				</span>
			</div>

			<div className="flex min-w-0 items-center">
				<span
					className="font-chalet-1960 min-w-0 truncate text-[16px] text-[#242424]"
					title={bid.contractorEmail}
				>
					{bid.contractorEmail}
				</span>
			</div>

			<div className="flex min-w-0 items-center">
				<div className="flex min-w-0 flex-wrap gap-1 lg:gap-2">
					{bid.specialities.slice(0, 2).map((spec, idx) => (
						<SpecialityTag key={idx} variant="readonly" size="md">
							{spec}
						</SpecialityTag>
					))}
					{bid.specialities.length > 2 && (
						<span className="font-chalet-1960 text-[16px] text-[#242424]">
							+{bid.specialities.length - 2}
						</span>
					)}
				</div>
			</div>

			<div className="flex min-w-0 items-center">
				<span className="font-chalet-1960 min-w-0 truncate pl-1 text-[16px] text-[#242424] lg:pl-2">
					{bid.amountFormatted}
				</span>
			</div>

			<div className="flex min-w-0 items-center">
				<a
					href={`tel:${bid.contractorPhone}`}
					className="min-w-0 truncate text-[16px] text-[#003BFF] hover:underline"
					title={bid.contractorPhone}
				>
					{bid.contractorPhone}
				</a>
			</div>
		</div>
	);
};
