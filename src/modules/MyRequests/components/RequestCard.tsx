// modules/MyRequests/components/RequestCard.tsx
import { JSX } from 'react';
import Image from 'next/image';
import { RequestDisplayData } from '../type';

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

	const getStatusBadgeStyles = () => {
		switch (statusBadge.variant) {
			case 'open':
				return 'bg-white text-[#242424] border border-gray-200';
			case 'closed':
				return 'bg-gray-600 text-white';
			case 'auto-closed':
				return 'bg-orange-500 text-white';
			default:
				return 'bg-gray-600 text-white';
		}
	};

	const getStatusIcon = () => {
		switch (statusBadge.variant) {
			case 'open':
				return (
					<svg
						className="mr-1 h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12l2 2 4-4"
						/>
					</svg>
				);
			case 'closed':
				return (
					<svg
						className="mr-1 h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				);
			case 'auto-closed':
				return (
					<svg
						className="mr-1 h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<div className={`${className}`}>
			{/* Main card */}
			<div className="cursor-pointer" onClick={handleClick}>
				<div className="relative h-[280px] w-full">
					<Image
						src={images[0]}
						alt={title}
						fill
						className="rounded-lg object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>

					{/* Status Badge on image */}
					<div className="absolute top-4 right-4">
						<div
							className={`flex items-center rounded-md px-3 py-1 text-sm font-medium ${getStatusBadgeStyles()}`}
						>
							{getStatusIcon()}
							{statusBadge.text}
						</div>
					</div>
				</div>

				{/* Card content */}
				<div className="pt-4">
					<h3 className="mb-2 line-clamp-1 text-[20px] font-medium text-[#242424]">
						{title}
					</h3>

					<div className="mb-4 flex items-center gap-1 text-[#242424]">
						<Location className="h-4 w-4" />
						<span className="text-[16px]">{location}</span>
					</div>
				</div>
			</div>

			{/* Meta information */}
			<div className="mb-3 flex items-center justify-between text-sm text-[#242424]">
				<span>
					Bids: <strong>{bidsCount}</strong>
				</span>
				<span>
					Posted:{' '}
					<strong className="text-blue-600">{postedDate}</strong>
				</span>
				<span>
					Budget:{' '}
					<strong className="text-blue-600">{budgetFormatted}</strong>
				</span>
			</div>

			{/* Action buttons based on status */}
			{statusBadge.variant === 'open' && (
				<button
					onClick={handleCloseRequest}
					className="w-full rounded-md bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700"
				>
					Close Request
				</button>
			)}

			{statusBadge.variant === 'open' && daysActive && (
				<div className="mt-2 text-center text-sm text-gray-500">
					Auto-closes in {Math.max(0, 30 - daysActive)} days
				</div>
			)}

			{statusBadge.variant === 'closed' && (
				<div className="py-3 text-center text-gray-600">
					<strong>Status:</strong> Closed By Client
				</div>
			)}

			{statusBadge.variant === 'auto-closed' && (
				<div className="py-3 text-center text-orange-600">
					<div className="flex items-center justify-center">
						<svg
							className="mr-1 h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
						<strong>Auto-closed after 30 days</strong>
					</div>
				</div>
			)}
		</div>
	);
};
