import { JSX } from 'react';
import { CategoryBadge } from '@/modules/AvailableProjects/components/list/CategoryBadge';
import Location from 'public/icons/profile/location.svg';
import Arrow from 'public/icons/arrow-up-right-white-big.svg';
import { Button } from '@/shared/components/Button/Button';

interface ProjectDetailsHeaderProps {
	title: string;
	location: string;
	category: string;
	onApplyClick: () => void;
}

export const ProjectDetailsHeader = ({
	title,
	location,
	category,
	onApplyClick,
}: ProjectDetailsHeaderProps): JSX.Element => {
	return (
		<>
			{/* Mobile Layout */}
			<div className="mb-3 block pt-10 lg:hidden lg:p-0">
				<div className="mb-3.5 flex items-center justify-center">
					<CategoryBadge categoryName={category} />
				</div>

				<h1 className="font-chalet-1960 mb-3 text-center text-[36px] leading-[100%] tracking-[-1px] text-[#242424]">
					{title}
				</h1>

				<div className="mb-5 flex flex-col items-center justify-center gap-5">
					<div className="flex items-center gap-2">
						<Location />
						<span className="font-chalet-1960 text-[16px] text-[#242424]">
							{location}
						</span>
					</div>

					<Button
						variant="solid"
						iconPosition="right"
						color="primary"
						icon={<Arrow />}
						onClick={onApplyClick}
						className="!w-full !justify-between !rounded-none !px-7 !py-5 !text-[20px]"
					>
						Apply Now
					</Button>
				</div>
			</div>

			{/* Desktop Layout */}
			<div className="mb-8 hidden items-start justify-between lg:flex">
				<div className="flex-1">
					<h1 className="font-chalet-1960 text-[40px] leading-[100%] tracking-[-1px] text-[#242424]">
						{title}
					</h1>

					<div className="mb-1 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Location />
							<span className="font-chalet-1960 text-[16px] text-[#242424]">
								{location}
							</span>
						</div>

						<Button
							variant="solid"
							iconPosition="right"
							color="primary"
							icon={<Arrow />}
							onClick={onApplyClick}
							className="!gap-7 !rounded-none !px-7 !py-5 !text-[20px]"
						>
							Apply Now
						</Button>
					</div>

					<CategoryBadge categoryName={category} />
				</div>
			</div>
		</>
	);
};
