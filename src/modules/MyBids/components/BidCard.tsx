import { JSX } from 'react';
import Image from 'next/image';
import { BidDisplayData } from '../bidTypes';
import { BID_STATUS_CONFIG } from '@/modules/MyBids/bidStatus';
import { getCategoryIcon } from '@/modules/AvailableProjects/projectCategories';
import Location from 'public/icons/profile/location.svg';
import ArrowUp from 'public/icons/profile/arrow-up-large.svg';

interface BidCardProps {
	bid: BidDisplayData;
	onCardClick?: (projectId: string) => void;
	className?: string;
}

export const BidCard = ({
	bid,
	onCardClick,
	className = '',
}: BidCardProps): JSX.Element => {
	const {
		projectId,
		projectTitle,
		projectLocation,
		projectImages,
		projectDescription,
		bidAmountFormatted,
		bidStatusBadge,
		projectCategory,
	} = bid;

	const handleClick = () => {
		onCardClick?.(projectId);
	};

	const statusConfig =
		BID_STATUS_CONFIG[
			bidStatusBadge.variant as keyof typeof BID_STATUS_CONFIG
		];

	const imageUrl = projectImages[0] || '/images/placeholder.jpg';
	const categoryIcon = getCategoryIcon(projectCategory);

	return (
		<article className={`overflow-hidden bg-white ${className}`}>
			<button
				className="w-full cursor-pointer text-left"
				onClick={handleClick}
			>
				<div className="relative flex flex-col md:h-[180px] md:flex-row md:gap-4">
					{/* Image Container */}
					<div className="relative h-[200px] w-full md:h-full md:w-[280px] md:flex-shrink-0">
						<Image
							src={imageUrl}
							alt={projectTitle}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 280px"
						/>

						{/* Category Badge */}
						<div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white px-2 py-1">
							{categoryIcon && (
								<span className="flex h-4 w-4 items-center justify-center">
									{categoryIcon}
								</span>
							)}
							<span className="text-[14px] text-[#242424]">
								{projectCategory}
							</span>
						</div>

						<ArrowUp className="absolute top-5 right-5" />
					</div>

					{/* Content Container */}
					<div className="flex flex-1 flex-col justify-between pt-4 md:pt-0 md:pr-4">
						<div className="mb-1 md:mb-0 md:hidden">
							<span
								className={`inline-flex items-center justify-center px-4 py-1.5 text-[14px] ${statusConfig?.bgColor} ${statusConfig?.textColor}`}
							>
								{statusConfig?.icon && (
									<span className="mr-1.5">
										{statusConfig.icon}
									</span>
								)}
								{statusConfig?.label || bidStatusBadge.text}
							</span>
						</div>

						<div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-3">
							<div className="min-w-0 flex-1">
								{/* Title */}
								<h3 className="font-chalet-1960 truncate text-[20px] leading-[155%] font-medium text-ellipsis text-[#242424]">
									{projectTitle}
								</h3>

								{/* Location */}
								<div className="flex min-w-0 items-center gap-1.5 md:mt-1">
									<Location className="flex-shrink-0" />
									<span className="font-chalet-1960 line-clamp-1 text-[16px] text-[#242424]">
										{projectLocation}
									</span>
								</div>

								{/* Description */}
								<p className="mt-1 line-clamp-2 text-[16px] text-[#242424]/50 md:mt-2">
									{projectDescription}
								</p>
							</div>

							{/* Status Badge */}
							<span
								className={`hidden flex-shrink-0 items-center justify-center px-3 py-1.5 text-[14px] md:flex ${statusConfig?.bgColor} ${statusConfig?.textColor}`}
							>
								{statusConfig?.icon && (
									<span className="mr-1.5">
										{statusConfig.icon}
									</span>
								)}
								{statusConfig?.label || bidStatusBadge.text}
							</span>
						</div>

						{/* Price */}
						<div className="mt-1 md:mt-0">
							<hr className="mb-3" />
							<span className="text-[20px] font-medium text-[#242424]">
								{bidAmountFormatted}
							</span>
						</div>
					</div>
				</div>
			</button>
		</article>
	);
};
