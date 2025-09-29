// RequestDetailsHeader.tsx
import { getCategoryIcon } from '@/modules/AvailableProjects/projectCategories';
import { JSX } from 'react';

interface RequestDetailsHeaderProps {
	title: string;
	location: string;
	category: string;
	status: 'open' | 'closed';
	statusBadge: { text: string; variant: string };
}

export const RequestDetailsHeader = ({
	title,
	location,
	category,
	status,
	statusBadge,
}: RequestDetailsHeaderProps): JSX.Element => {
	const categoryIcon = getCategoryIcon(category);

	return (
		<div className="mb-6 flex items-start justify-between">
			<div className="flex-1">
				<h1 className="mb-2 text-[32px] font-normal text-[#242424]">
					{title}
				</h1>

				<div className="mb-3 flex items-center gap-2 text-[#242424]/60">
					<svg className="h-4 w-4"></svg>
					<span className="text-sm">{location}</span>
				</div>

				<div className="flex w-fit items-center gap-2 rounded-full bg-[#F1F3F6] px-3 py-1">
					{categoryIcon}
					<span className="text-sm text-[#242424]">{category}</span>
				</div>
			</div>

			<div
				className={`rounded-lg px-4 py-2 ${
					status === 'open'
						? 'bg-[#DCFCE7] text-[#166534]'
						: 'bg-gray-100 text-gray-600'
				}`}
			>
				<span className="flex items-center gap-2">
					<svg className="h-4 w-4"></svg>
					{statusBadge.text}
				</span>
			</div>
		</div>
	);
};
