import { JSX } from 'react';
import { Button } from '@/shared/components/Button/Button';
import Arrow from 'public/icons/arrow-up-right-white-big.svg';

interface ProjectDescriptionProps {
	description: string;
	budgetFormatted: string;
	onApplyClick: () => void;
}

export const ProjectDescription = ({
	description,
	budgetFormatted,
	onApplyClick,
}: ProjectDescriptionProps): JSX.Element => {
	return (
		<div className="">
			<h2 className="font-chalet-1960 mb-3 text-[36px] font-medium tracking-[-1px] text-[#242424] md:text-[40px] lg:mb-6">
				Description
			</h2>

			<p className="font-chalet-1960 mb-6 text-[16px] whitespace-pre-wrap text-[#242424]">
				{description}
			</p>

			<div className="mb-6 flex items-end gap-2">
				<span className="font-chalet-1960 text-[20px] leading-[155%] font-medium text-[#242424]">
					{budgetFormatted}
				</span>
				<span className="font-chalet-1960 text-[20px]  font-medium text-blue-600">
					open to bids
				</span>
			</div>

			<Button
				variant="solid"
				iconPosition="right"
				color="dark"
				icon={<Arrow />}
				onClick={onApplyClick}
				className="!w-full !gap-7 !rounded-none !px-7 !py-5 !text-[20px] md:!w-fit"
			>
				Apply Now
			</Button>
		</div>
	);
};
