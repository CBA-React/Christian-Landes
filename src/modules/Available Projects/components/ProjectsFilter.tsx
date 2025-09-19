import { JSX } from 'react';
import {
	PROJECT_CATEGORIES,
	ProjectCategory,
} from '../../../shared/constants/projectCategories';

interface ProjectsFilterProps {
	selectedCategory: string | null;
	onCategoryChange: (category: string | null) => void;
	onFiltersClick?: () => void;
	className?: string;
}

export const ProjectsFilter = ({
	selectedCategory,
	onCategoryChange,
	onFiltersClick,
	className = '',
}: ProjectsFilterProps): JSX.Element => {
	const isAllSelected = selectedCategory === null;

	const handleCategoryClick = (categorySlug: string | null) => {
		onCategoryChange(categorySlug);
	};

	return (
		<div className={`mb-6 ${className}`}>
			<p className="mb-4 text-sm text-gray-600">
				Browse open jobs and find your next opportunity
			</p>

			<div
				className="flex items-center gap-3 overflow-x-auto pb-2"
				style={{
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
				}}
			>
				{/* All Button */}
				<button
					onClick={() => handleCategoryClick(null)}
					className={`flex min-w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
						isAllSelected
							? 'border-green-500 bg-green-50 text-green-700'
							: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
					}`}
				>
					{isAllSelected && (
						<svg
							className="h-4 w-4"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					)}
					All
				</button>

				{/* Category Buttons */}
				{PROJECT_CATEGORIES.map((category: ProjectCategory) => {
					const isSelected = selectedCategory === category.slug;

					return (
						<button
							key={category.id}
							onClick={() => handleCategoryClick(category.slug)}
							className={`flex min-w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
								isSelected
									? 'border-blue-500 bg-blue-50 text-blue-700'
									: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
							}`}
						>
							<span className="h-4 w-4 flex-shrink-0">
								{category.icon}
							</span>
							<span className="whitespace-nowrap">
								{category.name}
							</span>
						</button>
					);
				})}

				{/* Filters Button */}
				<button
					onClick={onFiltersClick}
					className="ml-2 flex min-w-fit items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
				>
					<svg
						className="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
						/>
					</svg>
					Filters
				</button>
			</div>
		</div>
	);
};
