import { JSX } from 'react';
import { getCategoryFromMap } from '@/modules/AvailableProjects/projectCategories';

interface CategoryBadgeProps {
	categoryName: string;
	variant?: 'default';
	showIcon?: boolean;
	className?: string;
}

export const CategoryBadge = ({
	categoryName,
	variant = 'default',
	showIcon = true,
	className = '',
}: CategoryBadgeProps): JSX.Element => {
	const categoryData = getCategoryFromMap(categoryName);

	const variantStyles = {
		default: 'px-3 py-2 text-[14px] gap-2',
	};

	const iconSizes = {
		default: 'h-4 w-4',
	};

	return (
		<div
			className={`inline-flex items-center bg-white font-medium text-[#242424] ${variantStyles[variant]} ${className} `}
		>
			{showIcon && categoryData?.icon && (
				<div
					className={`flex items-center justify-center ${iconSizes[variant]}`}
				>
					{categoryData.icon}
				</div>
			)}
			<span className="truncate">
				{categoryData?.name || categoryName}
			</span>
		</div>
	);
};
