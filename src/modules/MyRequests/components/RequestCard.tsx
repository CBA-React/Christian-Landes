import { JSX } from 'react';
import Image from 'next/image';
import { RequestDisplayData } from '../type';
import {
	STATUS_CONFIG,
	REQUEST_STATUSES,
} from '@/shared/constants/requestStatus';
import Separator from '../../../../public/icons/profile/separator.svg';

import Location from '../../../../public/icons/profile/location.svg';

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

	// Используем конфигурацию из requestStatus.tsx
	const statusConfig =
		STATUS_CONFIG[statusBadge.variant as keyof typeof STATUS_CONFIG];
	const remainingDays = daysActive ? Math.max(0, 30 - daysActive) : 0;

	return (
		<div className={`overflow-hidden ${className}`}>
			{/* Main card */}
			<div className="cursor-pointer" onClick={handleClick}>
				<div className="relative h-[225px] w-full md:h-[260px]">
					<Image
						src={images[0]}
						alt={title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>

					{/* Status Badge on image using STATUS_CONFIG */}
					<div className="absolute top-3 right-3">
						<div
							className={`flex items-center justify-center px-3.5 py-1.5 text-[14px] ${statusConfig?.bgColor} ${statusConfig?.textColor}`}
						>
							{statusConfig?.icon && (
								<span className="mr-1.5">
									{statusConfig.icon}
								</span>
							)}
							{statusConfig?.label || statusBadge.text}
						</div>
					</div>
				</div>

				{/* Card content */}
				<div className="pt-3">
					<h3 className="font-chalet-1960 line-clamp-2 text-[20px] leading-[155%] font-medium text-[#242424]">
						{title}
					</h3>

					<div className="flex items-center gap-2">
						<Location />
						<span className="font-chalet-1960 truncate text-[16px] text-[#242424]">
							{location}
						</span>
					</div>
					<hr className="my-1 border-t border-[#242424]/15 md:my-3" />

					{/* Meta information */}
					<div className="flex flex-col items-start text-[16px] sm:flex-row sm:flex-wrap sm:items-center">
						<span>
							Bids:{' '}
							<span className="font-semibold text-[#242424]">
								{bidsCount}
							</span>
							<Separator className="mx-2 hidden sm:inline" />
						</span>
						<span>
							Posted:{' '}
							<span className="font-semibold text-[#003BFF]">
								{postedDate}
							</span>
							<Separator className="mx-2 hidden sm:inline" />
						</span>
						<span>
							Budget:{' '}
							<span className="font-semibold text-[#003BFF]">
								{budgetFormatted}
							</span>
						</span>
					</div>
				</div>
			</div>

			<div className="mt-3">
				{statusBadge.variant === REQUEST_STATUSES.OPEN && (
					<>
						<button
							onClick={handleCloseRequest}
							className="w-full bg-[#003BFF] px-4 py-2.5 text-[16px] text-white"
						>
							Close Request
						</button>
						{daysActive && (
							<div className="mt-2 text-center text-[14px] text-[#003BFF]">
								Auto-closes in {remainingDays} days
							</div>
						)}
					</>
				)}

				{statusBadge.variant === REQUEST_STATUSES.CLOSED && (
					<div className="pt-6 text-center">
						<span className="text-[16px] text-[#242424]/50">
							<span className="text-[16px] text-[#003BFF]">
								Status:
							</span>{' '}
							{statusConfig?.description || 'Closed by client'}
						</span>
					</div>
				)}

				{statusBadge.variant === REQUEST_STATUSES.AUTO_CLOSED && (
					<div className="py-2.5">
						<div className="flex items-center justify-center text-[#F97316]">
							<span className="mr-1.5">{statusConfig?.icon}</span>
							<span className="text-[16px]">
								{statusConfig?.description ||
									'Auto-closed after 30 days'}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
