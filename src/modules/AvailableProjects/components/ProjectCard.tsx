import { JSX } from 'react';
import Image from 'next/image';

import { CategoryBadge } from './CategoryBadge';

import ArrowUp from 'public/icons/profile/arrow-up-large.svg';
import Location from 'public/icons/profile/location.svg';

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
		<article
			className={`group relative cursor-pointer ${className}`}
			onClick={handleClick}
		>
			<div className="relative h-[225px] w-full md:h-[260px]">
				<Image
					src={imageUrl}
					alt={title}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>

				<div className="absolute top-4.5 left-4.5">
					<CategoryBadge
						categoryName={category}
						variant="default"
						showIcon={true}
					/>
				</div>

				<div className="absolute top-4.5 right-4.5">
					<div className="flex h-8 w-8 items-center justify-center">
						<ArrowUp />
					</div>
				</div>
			</div>

			<section className="pt-3">
				<div>
					<h3 className="font-chalet-1960 line-clamp-2 text-[20px] leading-[155%] font-medium text-[#242424]">
						{title}
					</h3>

					<div className="flex items-center gap-2">
						<Location />
						<span className="font-chalet-1960 truncate text-[16px] text-[#242424]">
							{location}
						</span>
					</div>
				</div>

				<p className="font-chalet-1960 line-clamp-2 text-[16px] leading-[155%] text-[#242424]/50">
					{description}
				</p>

				<hr className="my-1 border-t border-[#242424]/15 md:my-3" />

				<div className="flex items-center justify-between">
					<div className="flex items-end gap-2">
						<span className="font-chalet-1960 text-[20px] leading-[120%] font-medium text-[#242424]">
							{price}
						</span>
						<span className="font-chalet-1960 text-[14px] font-medium text-blue-600">
							open to bids
						</span>
					</div>
				</div>
			</section>
		</article>
	);
};
