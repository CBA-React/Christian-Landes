import { JSX } from 'react';
import { CategoryBadge } from '@/modules/AvailableProjects/components/list/CategoryBadge';
import { STATUS_CONFIG } from '@/modules/MyRequests/requestStatus';
import Location from 'public/icons/profile/location.svg';

interface RequestDetailsHeaderProps {
	title: string;
	location: string;
	category: string;
	status: 'open' | 'closed' | 'auto-closed';
	statusBadge: { text: string; variant: string };
}

export const RequestDetailsHeader = ({
	title,
	location,
	category,
	status,
	statusBadge,
}: RequestDetailsHeaderProps): JSX.Element => {
	const statusConfig = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];

	return (
		<>
			<div className="mb-7 block pt-10 lg:hidden lg:p-0">
				<div className="mb-3.5 flex items-center justify-center gap-3">
					<CategoryBadge categoryName={category} />
					<div
						className={`flex items-center gap-1.5 px-3 py-1.5 ${statusConfig?.bgColor} ${statusConfig?.textColor}`}
					>
						{statusConfig?.icon}
						<span className="text-[16px]">
							{statusConfig?.label || statusBadge.text}
						</span>
					</div>
				</div>

				<h1 className="font-chalet-1960 mb-3 text-center text-[36px] leading-[100%] tracking-[-1px] text-[#242424]">
					{title}
				</h1>

				<div className="flex items-center justify-center gap-2">
					<Location />
					<span className="font-chalet-1960 text-[16px] text-[#242424]">
						{location}
					</span>
				</div>
			</div>

			<div className="mb-6 hidden items-start justify-between lg:flex">
				<div className="flex-1">
					<h1 className="font-chalet-1960 mb-2 text-[40px] leading-[100%] tracking-[-1px] text-[#242424]">
						{title}
					</h1>

					<div className="mb-5 flex items-center gap-2">
						<Location />
						<span className="font-chalet-1960 text-[16px] text-[#242424]">
							{location}
						</span>
					</div>

					<CategoryBadge categoryName={category} />
				</div>

				<div
					className={`flex items-center gap-1.5 px-3 py-1.5 ${statusConfig?.bgColor} ${statusConfig?.textColor}`}
				>
					{statusConfig?.icon}
					<span className="text-[16px] font-medium">
						{statusConfig?.label || statusBadge.text}
					</span>
				</div>
			</div>
		</>
	);
};
