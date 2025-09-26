import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/shared/components/Input/Input';
import { Select } from '@/shared/components/Select/Select';
import { RangeSlider } from '@/shared/components/RangeSlider/RangeSlider';
import { Checkbox } from '@/shared/components/Checkbox/Checkbox';
import { Button } from '@/shared/components/Button/Button';
import { useProjectsCount } from '../hooks/useProjectCount';
import { PROJECT_CATEGORIES } from '../projectCategories';

const JOB_CATEGORIES = [
	'Handyperson',
	'Landscaping',
	'Plumbing',
	'Electrical',
	'Remodeling',
	'Roofing',
	'Painting',
	'Cleaning',
	'HVAC',
	'Windows',
	'Concrete',
];

export interface ProjectFilterFormData {
	search?: string;
	location?: string;
	date?: '1d' | '7d' | '30d' | '';
	minBudget?: number;
	maxBudget?: number;
	category?: string;
}

interface ProjectFilterFormProps {
	filters: ProjectFilterFormData;
	onFiltersChange: (filters: ProjectFilterFormData) => void;
	onApply: () => void;
	onClear: () => void;
	currentCategory: string | null;
}

export const ProjectFilterForm: React.FC<ProjectFilterFormProps> = ({
	filters,
	onFiltersChange,
	onApply,
	onClear,
	currentCategory,
}) => {
	const { register, watch, setValue, reset } = useForm<ProjectFilterFormData>(
		{
			defaultValues: {
				search: filters.search || '',
				location: filters.location || '',
				date: filters.date || '',
				minBudget: filters.minBudget || 0,
				maxBudget: filters.maxBudget || 50000,
				category: filters.category || '',
			},
		},
	);

	const watchedFields = watch();

	useEffect(() => {
		reset({
			search: filters.search || '',
			location: filters.location || '',
			date: filters.date || '',
			minBudget: filters.minBudget || 0,
			maxBudget: filters.maxBudget || 50000,
			category: filters.category || currentCategory || '',
		});
	}, [filters, currentCategory, reset]);

	const allFiltersForCount = useMemo(
		() => ({
			category: currentCategory || watchedFields.category || '',
			...watchedFields,
		}),
		[currentCategory, watchedFields],
	);

	const hasActiveFilters = Boolean(
		watchedFields.search ||
			watchedFields.location ||
			watchedFields.date ||
			(watchedFields.minBudget && watchedFields.minBudget > 0) ||
			(watchedFields.maxBudget && watchedFields.maxBudget < 50000) ||
			watchedFields.category ||
			currentCategory,
	);

	const { totalCount, isLoading, isPending } = useProjectsCount(
		allFiltersForCount,
		true,
	);

	const handleApply = () => {
		onFiltersChange(watchedFields);
		onApply();
	};

	const handleClear = () => {
		const clearedFilters: ProjectFilterFormData = {
			search: '',
			location: '',
			date: '',
			minBudget: 0,
			maxBudget: 50000,
			category: '',
		};
		reset(clearedFilters);
		onFiltersChange(clearedFilters);
		onClear();
	};

	const postedDateOptions = [
		{ value: '1d', label: 'Today' },
		{ value: '7d', label: 'Last 7 days' },
		{ value: '30d', label: 'Last 30 days' },
	];

	const categoryOptions = PROJECT_CATEGORIES.map((category) => ({
		value: category.slug,
		label: category.name,
	}));

	const handleJobCategoryToggle = (category: string) => {
		const currentSearch = watch('search') || '';

		if (currentSearch === category) {
			setValue('search', '');
		} else {
			setValue('search', category);
		}
	};

	const getButtonText = () => {
		if (!hasActiveFilters) {
			return 'Show Projects';
		}

		if (isPending || isLoading) {
			return 'Counting...';
		}

		return `Show ${totalCount} Project${totalCount !== 1 ? 's' : ''}`;
	};

	const isButtonDisabled = isPending || isLoading;

	return (
		<div
			className="h-full overflow-y-auto"
			style={{
				scrollbarWidth: 'none',
				msOverflowStyle: 'none',
			}}
		>
			<style jsx>{`
				div::-webkit-scrollbar {
					display: none; /* Chrome, Safari and Opera */
				}
			`}</style>

			<div className="flex min-h-full flex-col px-5 pt-2 pb-5 sm:px-10 sm:pt-7 sm:pb-10">
				<div className="flex-shrink-0 pb-2">
					<div className="flex items-center justify-between pt-2">
						<h2 className="font-chalet-1960 text-[40px] font-medium">
							Filter
						</h2>
					</div>
				</div>

				<div className="flex-1">
					<div className="space-y-5 pr-2 sm:space-y-6">
						<Input
							label="Location"
							labelVariant="filter"
							placeholder="Write location"
							register={register('location')}
						/>

						<hr />

						<Select
							label="Posted Date"
							placeholder="Select posted date"
							options={postedDateOptions}
							value={watch('date') || ''}
							onChange={(value) =>
								setValue(
									'date',
									value as ProjectFilterFormData['date'],
								)
							}
						/>

						<hr />

						<RangeSlider
							label="Budget"
							min={0}
							max={50000}
							minValue={watch('minBudget') || 0}
							maxValue={watch('maxBudget') || 50000}
							onChange={(minValue, maxValue) => {
								setValue('minBudget', minValue);
								setValue('maxBudget', maxValue);
							}}
							formatValue={(value) =>
								`$${value.toLocaleString()}`
							}
						/>

						<hr />

						<Select
							label="Category"
							placeholder="Select category"
							options={categoryOptions}
							value={watch('category') || ''}
							onChange={(value) => setValue('category', value)}
						/>

						<hr />

						<Input
							label="Project Title"
							labelVariant="filter"
							placeholder="Write project title"
							register={register('search')}
						/>

						<div className="space-y-3">
							<div className="grid grid-cols-2 gap-2">
								{JOB_CATEGORIES.map((category) => {
									const currentSearch = watch('search') || '';
									const isSelected =
										currentSearch.includes(category);
									return (
										<label
											key={category}
											className="flex cursor-pointer items-center gap-3"
										>
											<Checkbox
												checked={isSelected}
												onChange={() =>
													handleJobCategoryToggle(
														category,
													)
												}
											/>
											<span className="text-[16px] text-[#252525]/60">
												{category}
											</span>
										</label>
									);
								})}
							</div>
						</div>
					</div>
				</div>

				<div className="mt-auto pt-8">
					<div className="flex flex-col gap-3">
						<Button
							color="primary"
							variant="solid"
							className={`w-full justify-center !p-3 transition-all duration-200 ${
								isButtonDisabled ? 'opacity-75' : ''
							}`}
							onClick={handleApply}
							disabled={isButtonDisabled}
						>
							<span>{getButtonText()}</span>
						</Button>

						<div className="text-center">
							<button
								onClick={handleClear}
								className="cursor-pointer text-[16px] font-normal text-[#242424]/50 transition-colors duration-200 hover:text-[#003BFF]"
							>
								Clear All
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
