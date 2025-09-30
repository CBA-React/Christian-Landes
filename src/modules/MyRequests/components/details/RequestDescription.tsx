import { JSX } from 'react';
import Separator from 'public/icons/profile/separator.svg';
import LockLargeIcon from 'public/icons/profile/lock-large.svg';
import ClockLargeIcon from 'public/icons/profile/clock-large.svg';
import Clock from 'public/icons/profile/clock-white.svg';
import Lock from 'public/icons/profile/lock-white.svg';

interface RequestDescriptionProps {
	description: string;
	bidsCount: number;
	postedDate: string;
	budgetFormatted: string;
	status: 'open' | 'closed' | 'auto-closed';
}

export const RequestDescription = ({
	description,
	bidsCount,
	postedDate,
	budgetFormatted,
	status,
}: RequestDescriptionProps): JSX.Element => {
	return (
		<div className="">
			<h2 className="font-chalet-1960 mb-3 text-[36px] font-medium tracking-[-1px] text-[#242424] md:text-[40px] lg:mb-6">
				Description
			</h2>

			<p className="font-chalet-1960 text-[16px] whitespace-pre-wrap text-[#242424] md:mb-6">
				{description}
			</p>

			<div className="mt-2 flex flex-col items-start text-[16px] sm:flex-row sm:flex-wrap sm:items-center">
				<hr className="my-1 w-full sm:hidden" />

				<div className="flex flex-col sm:flex-row sm:items-center">
					<span>
						<span className="text-[#242424]">Bids: </span>
						<span className="text-[#003BFF]">{bidsCount}</span>

						<Separator className="mx-2 hidden h-5 border-1 sm:inline" />
					</span>
				</div>
				<hr className="my-1 w-full sm:hidden" />
				<div className="sm:flex sm:items-center">
					<span>
						<span className="text-[#242424]">Posted: </span>
						<span className="text-[#003BFF]">
							{postedDate}
							<Separator className="mx-2 hidden h-5 border-1 sm:inline" />
						</span>
					</span>
				</div>
				<hr className="my-1 w-full sm:hidden" />
				<div>
					<span>
						<span className="text-[#242424]">Budget: </span>
						<span className="text-[#003BFF]">
							{budgetFormatted}
						</span>
					</span>
				</div>
			</div>

			{status === 'closed' && (
				<div className="mt-6 inline-flex w-full items-center gap-2 rounded-md bg-[#6B7280] px-5 py-5 text-white md:w-fit lg:text-[18px]">
					<Lock className="md:hidden" />
					<LockLargeIcon className="hidden md:inline" />
					<span className="font-chalet-1960 text-center text-[17px]">
						This Request Was Closed By Client
					</span>
				</div>
			)}

			{status === 'auto-closed' && (
				<div className="mt-6 inline-flex w-full items-center gap-2 rounded-md bg-[#F97316] px-5 py-5 text-white md:w-fit">
					<Clock className="md:hidden" />
					<ClockLargeIcon className="hidden md:inline" />
					<span className="font-chalet-1960 text-center text-[17px] lg:text-[18px]">
						Auto-Closed After 30 Days
					</span>
				</div>
			)}
		</div>
	);
};
