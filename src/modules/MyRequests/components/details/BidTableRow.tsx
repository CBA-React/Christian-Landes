import { JSX } from 'react';
import Image from 'next/image';
import { BidDisplayData } from '../../types/requestDetails';
import { SpecialityTag } from '@/shared/components/SpecialityTag/SpecialityTag';

interface BidTableRowProps {
	bid: BidDisplayData;
}

export const BidTableRow = ({ bid }: BidTableRowProps): JSX.Element => {
	return (
		<div className="grid grid-cols-[1fr_2fr_1.5fr_1fr_1.2fr] gap-4 bg-white px-6 py-4 transition-colors hover:bg-gray-50">
			<div className="flex items-center gap-3">
				<div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
					{bid.contractorLogo ? (
						<Image
							src={bid.contractorLogo}
							alt={bid.contractorName}
							fill
							className="object-cover"
						/>
					) : (
						<div className="flex h-full items-center justify-center text-lg font-bold text-gray-400">
							{bid.contractorName.charAt(0).toUpperCase()}
						</div>
					)}
				</div>
				<span className="text-sm font-medium text-[#242424]">
					{bid.contractorName}
				</span>
			</div>

			<div className="flex items-center">
				<span className="text-sm text-[#242424]/80">
					{bid.contractorEmail}
				</span>
			</div>

			<div className="flex items-center">
				<div className="flex flex-wrap gap-2">
					{bid.specialities.slice(0, 2).map((spec, idx) => (
						<SpecialityTag key={idx} variant="readonly" size="sm">
							{spec}
						</SpecialityTag>
					))}
					{bid.specialities.length > 2 && (
						<span className="text-xs text-[#242424]/60">
							+{bid.specialities.length - 2}
						</span>
					)}
				</div>
			</div>

			<div className="flex items-center">
				<span className="text-sm font-semibold text-[#242424]">
					{bid.amountFormatted}
				</span>
			</div>

			<div className="flex items-center">
				<a
					href={`tel:${bid.contractorPhone}`}
					className="text-sm font-medium text-[#003BFF] hover:underline"
				>
					{bid.contractorPhone}
				</a>
			</div>
		</div>
	);
};
