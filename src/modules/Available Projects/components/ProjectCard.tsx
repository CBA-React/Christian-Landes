import { JSX } from 'react';
import Image from 'next/image';

import ArrowUp from '../../../../public/icons/profile/arrow-up-large.svg';
import Location from '../../../../public/icons/profile/location.svg';

interface ProjectCardProps {
	id: string;
	title: string;
	location: string;
	description: string;
	price: string;
	imageUrl: string;
	category: string;
	onCardClick?: (id: string) => void;
	className?: string;
}

export const ProjectCard = ({
	id,
	title,
	location,
	description,
	price,
	imageUrl,
	category,
	onCardClick,
	className = '',
}: ProjectCardProps): JSX.Element => {
	const handleClick = () => {
		onCardClick?.(id);
	};

	return (
		<div
			className={`group relative cursor-pointer overflow-hidden ${className}`}
			onClick={handleClick}
		>
			{/* Image Container */}
			<div className="relative h-[200px] w-full overflow-hidden">
				<Image
					src={imageUrl}
					alt={title}
					fill
					className="object-cover transition-transform duration-300 group-hover:scale-105"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>

				{/* Category Badge */}
				<div className="absolute top-3 left-3">
					<div className="flex items-center gap-2 rounded-md bg-white/90 px-3 py-1.5 backdrop-blur-sm">
						{/* Kitchen Icon Placeholder - замени на свою иконку */}
						<div className="h-4 w-4 rounded-sm bg-gray-400"></div>
						<span className="text-sm font-medium text-gray-800">
							{category}
						</span>
					</div>
				</div>

				{/* Arrow Icon */}
				<div className="absolute top-3 right-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors group-hover:bg-white/30">
						<ArrowUp />
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="p-4">
				{/* Title */}
				<h3 className="mb-2 text-[20px] font-semibold text-[#242424]">
					{title}
				</h3>

				{/* Location */}
				<div className="mb-3 flex items-center gap-2">
					<Location />
					<span className="text-[16px] text-[#242424]">
						{location}
					</span>
				</div>

				{/* Description */}
				<p className="mb-3 line-clamp-1 text-[16px] text-[#242424]/50">
					{description}
				</p>

				{/* Price */}
				<div className="flex items-center gap-1">
					<span className="text-[20px] text-[#242424]">{price}</span>
					<span className="text-[16px] text-blue-600">
						open to bids
					</span>
				</div>
			</div>
		</div>
	);
};
