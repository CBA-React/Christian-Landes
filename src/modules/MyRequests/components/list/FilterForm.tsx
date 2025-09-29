import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/shared/components/Input/Input';
import { Select } from '@/shared/components/Select/Select';
import { RangeSlider } from '@/shared/components/RangeSlider/RangeSlider';
import { Checkbox } from '@/shared/components/Checkbox/Checkbox';
import { Button } from '@/shared/components/Button/Button';
import { useRequestsCount } from '../../hooks/useRequestsCount';
import { SimpleRequestFilters } from '../../types/type';

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

export interface FilterFormData {
	search?: string;
	location?: string;
	date?: '1d' | '7d' | '30d' | '';
	minBudget?: number;
	maxBudget?: number;
	bids?: '0' | '1' | '2' | '';
}

interface FilterFormProps {
	filters: FilterFormData;
	onFiltersChange: (filters: FilterFormData) => void;
	onApply: () => void;
	onClear: () => void;
	onClose?: () => void;
	currentStatus: string | null;
}

export const FilterForm: React.FC<FilterFormProps> = ({
	filters,
	onFiltersChange,
	onApply,
	onClear,
	onClose,
	currentStatus,
}) => {
	const { register, watch, setValue, reset } = useForm<FilterFormData>({
		defaultValues: {
			search: filters.search || '',
			location: filters.location || '',
			date: filters.date || '',
			minBudget: filters.minBudget || 0,
			maxBudget: filters.maxBudget || 50000,
			bids: filters.bids || '',
		},
	});

	const watchedFields = watch();

	useEffect(() => {
		reset({
			search: filters.search || '',
			location: filters.location || '',
			date: filters.date || '',
			minBudget: filters.minBudget || 0,
			maxBudget: filters.maxBudget || 50000,
			bids: filters.bids || '',
		});
	}, [filters, reset]);

	const allFiltersForCount = useMemo(
		() => ({
			status: (currentStatus === 'all'
				? 'all'
				: currentStatus) as SimpleRequestFilters['status'],
			...watchedFields,
		}),
		[currentStatus, watchedFields],
	);

	const hasActiveFilters = Boolean(
		watchedFields.search ||
			watchedFields.location ||
			watchedFields.date ||
			(watchedFields.minBudget && watchedFields.minBudget > 0) ||
			(watchedFields.maxBudget && watchedFields.maxBudget < 50000) ||
			watchedFields.bids ||
			(currentStatus && currentStatus !== 'all'),
	);

	const { totalCount, isLoading, isPending } = useRequestsCount(
		allFiltersForCount,
		true,
	);

	const handleApply = () => {
		onFiltersChange(watchedFields);
		onApply();
	};

	const handleClear = () => {
		const clearedFilters: FilterFormData = {
			search: '',
			location: '',
			date: '',
			minBudget: 0,
			maxBudget: 50000,
			bids: '',
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

	const currentBids = watch('bids');

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
			return 'Show Requests';
		}

		if (isPending || isLoading) {
			return 'Counting...';
		}

		return `Show ${totalCount} Request${totalCount !== 1 ? 's' : ''}`;
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

			<div className="flex min-h-full flex-col px-5 py-5 sm:px-10 sm:py-10">
				<div className="flex-shrink-0 pb-2">
					<div className="flex items-center justify-between">
						<h2 className="font-chalet-1960 text-[40px] font-medium">
							Filter
						</h2>
						{onClose && (
							<button
								onClick={onClose}
								className="cursor-pointer rounded-full"
							>
								<svg
									className="h-6 w-6"
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
							</button>
						)}
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
									value as FilterFormData['date'],
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

						<div className="space-y-3">
							<h3 className="font-chalet-960 text-[18px] font-medium text-[#252525]">
								Bids Count
							</h3>
							<div className="space-y-2">
								<label className="flex cursor-pointer items-center gap-3">
									<Checkbox
										checked={currentBids === '0'}
										onChange={() =>
											setValue(
												'bids',
												currentBids === '0' ? '' : '0',
											)
										}
									/>
									<span className="text-[16px] text-[#252525]/60">
										0 bids
									</span>
								</label>

								<label className="flex cursor-pointer items-center gap-3">
									<Checkbox
										checked={currentBids === '1'}
										onChange={() =>
											setValue(
												'bids',
												currentBids === '1' ? '' : '1',
											)
										}
									/>
									<span className="text-[16px] text-[#252525]/60">
										1-5 bids
									</span>
								</label>

								<label className="flex cursor-pointer items-center gap-3">
									<Checkbox
										checked={currentBids === '2'}
										onChange={() =>
											setValue(
												'bids',
												currentBids === '2' ? '' : '2',
											)
										}
									/>
									<span className="text-[16px] text-[#252525]/60">
										5+ bids
									</span>
								</label>
							</div>
						</div>

						<hr />

						<Input
							label="Job Title"
							labelVariant="filter"
							placeholder="Write job title"
							register={register('search')}
						/>

						<div className="space-y-3">
							<div className="grid grid-cols-2 gap-2">
								{JOB_CATEGORIES.map((category) => {
									const currentSearch = watch('search') || '';
									const isSelected =
										currentSearch === category;
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
