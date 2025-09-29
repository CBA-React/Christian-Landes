import { JSX } from 'react';

interface RequestDescriptionProps {
	description: string;
	bidsCount: number;
	postedDate: string;
	budgetFormatted: string;
}

export const RequestDescription = ({
	description,
	bidsCount,
	postedDate,
	budgetFormatted,
}: RequestDescriptionProps): JSX.Element => {
	return (
		<div className="rounded-lg bg-white">
			<h2 className="mb-4 text-[24px] font-normal text-[#242424]">
				Description
			</h2>

			<p className="mb-6 leading-relaxed whitespace-pre-wrap text-[#242424]/80">
				{description}
			</p>

			<div className="flex items-center gap-6 text-sm">
				<span className="font-semibold text-[#242424]">
					Bids: <span className="text-[#003BFF]">{bidsCount}</span>
				</span>

				<span className="text-[#242424]/60">Posted: {postedDate}</span>

				<span className="font-semibold text-[#242424]">
					Budget:{' '}
					<span className="text-[#003BFF]">{budgetFormatted}</span>
				</span>
			</div>
		</div>
	);
};
