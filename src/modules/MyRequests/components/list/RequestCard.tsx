import { JSX } from 'react';
import Image from 'next/image';
import { RequestDisplayData } from '../../types/type';
import {
	STATUS_CONFIG,
	REQUEST_STATUSES,
} from '@/modules/MyRequests/requestStatus';
import Separator from 'public/icons/profile/separator.svg';
import Location from 'public/icons/profile/location.svg';

interface RequestCardProps {
	request: RequestDisplayData;
	onCardClick?: (id: string) => void;
	onCloseRequest?: (id: string) => void;
	className?: string;
}

export const RequestCard = ({
	request,
	onCardClick,
	onCloseRequest,
	className = '',
}: RequestCardProps): JSX.Element => {
	const {
		id,
		title,
		location,
		budgetFormatted,
		images,
		statusBadge,
		bidsCount,
		postedDate,
		daysActive,
	} = request;

	const handleClick = () => {
		onCardClick?.(id);
	};

	const handleCloseRequest = (e: React.MouseEvent) => {
		e.stopPropagation();
		onCloseRequest?.(id);
	};

	const statusConfig =
		STATUS_CONFIG[statusBadge.variant as keyof typeof STATUS_CONFIG];
	const remainingDays = daysActive ? Math.max(0, 30 - daysActive) : 0;

	return (
		<article className={`overflow-hidden ${className}`}>
			{/* Main card content */}
			<button
				className="w-full cursor-pointer text-left"
				onClick={handleClick}
			>
				<div className="relative h-[250px] w-full md:h-[260px]">
					<Image
						src={images[0]}
						alt={title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>

					{/* Status Badge */}
					<div className="absolute top-3 right-3">
						<span
							className={`flex items-center justify-center px-3.5 py-1.5 text-[14px] ${statusConfig?.bgColor} ${statusConfig?.textColor}`}
						>
							{statusConfig?.icon && (
								<span className="mr-1.5">
									{statusConfig.icon}
								</span>
							)}
							{statusConfig?.label || statusBadge.text}
						</span>
					</div>
				</div>

				{/* Card content */}
				<section className="pt-3">
					<div>
						<h3 className="font-chalet-1960 truncate text-[20px] leading-[155%] font-medium text-[#242424]">
							{title}
						</h3>

						<div className="flex items-center gap-2">
							<Location />
							<span className="font-chalet-1960 line-clamp-2 text-[16px] text-[#242424]">
								{location}
							</span>
						</div>
					</div>

					<hr className="my-1 border-t border-[#242424]/15 md:my-3" />

					<div className="mt-2 flex flex-col items-start text-[16px] sm:flex-row sm:flex-wrap sm:items-center">
						<div className="flex flex-col sm:flex-row sm:items-center">
							<span>
								<span className="text-[#242424]/70">
									Bids:{' '}
								</span>
								<span className="text-[#003BFF]">
									{bidsCount}
								</span>

								<Separator className="mx-2 hidden sm:inline" />
							</span>
						</div>
						<hr className="my-1 w-full sm:hidden" />
						<div className="sm:flex sm:items-center">
							<span>
								<span className="text-[#242424]/70">
									Posted:{' '}
								</span>
								<span className="text-[#003BFF]">
									{postedDate}
									<Separator className="mx-2 hidden sm:inline" />
								</span>
							</span>
						</div>
						<hr className="my-1 w-full sm:hidden" />
						<div>
							<span>
								<span className="text-[#242424]/70">
									Budget:{' '}
								</span>
								<span className="text-[#003BFF]">
									{budgetFormatted}
								</span>
							</span>
						</div>
					</div>
				</section>
			</button>

			<section className="mt-3">
				{statusBadge.variant === REQUEST_STATUSES.OPEN && (
					<>
						<button
							onClick={handleCloseRequest}
							className="w-full cursor-pointer bg-[#003BFF] px-4 py-2.5 text-[16px] text-white"
						>
							Close Request
						</button>
						{daysActive && (
							<p className="mt-2 text-center text-[14px] text-[#003BFF]">
								Auto-closes in: {remainingDays} days
							</p>
						)}
					</>
				)}

				{statusBadge.variant === REQUEST_STATUSES.CLOSED && (
					<div className="pt-3 text-center">
						<p className="text-[16px] text-[#242424]/50">
							<span className="text-[16px] text-[#003BFF]">
								Status:
							</span>{' '}
							{statusConfig?.description || 'Closed by client'}
						</p>
					</div>
				)}

				{statusBadge.variant === REQUEST_STATUSES.AUTO_CLOSED && (
					<div className="pt-3 text-center">
						<div className="flex items-center justify-center text-[#F97316]">
							<span className="mr-1.5">{statusConfig?.icon}</span>
							<p className="text-[16px]">
								{statusConfig?.description ||
									'Auto-closed after 30 days'}
							</p>
						</div>
					</div>
				)}
			</section>
		</article>
	);
};
