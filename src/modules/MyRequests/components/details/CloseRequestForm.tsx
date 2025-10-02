'use client';

import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';

import ArrowRight from 'public/icons/arrow-up-right-white-big.svg';
import { FormTextarea } from '@/modules/ProfileEdit/components/FormField';
import { Select } from '@/shared/components/Select/Select';
import { Button } from '@/shared/components/Button/Button';
import { StarRating } from './StarRating';
import { useCloseRequest } from '../../hooks/useCloseRequest';
import type {
	CloseRequestFormData,
	CloseRequestPayload,
	BidDisplayData,
	ContractorOption,
} from '../../types/requestDetails';

interface CloseRequestFormProps {
	requestId: string;
	bids: BidDisplayData[];
	onSuccess?: () => void;
	onCancel?: () => void;
}

export const CloseRequestForm: React.FC<CloseRequestFormProps> = ({
	requestId,
	bids,
	onSuccess,
	onCancel,
}) => {
	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useForm<CloseRequestFormData>({
		defaultValues: {
			bid_id: '',
			contractor_id: '',
			text: '',
			rating: 0,
		},
	});

	const textValue = watch('text') || '';
	const selectedBidId = watch('bid_id');

	const closeRequestMutation = useCloseRequest();

	const contractorOptions: ContractorOption[] = useMemo(
		() =>
			bids.map((bid) => ({
				value: bid.contractorId,
				label: bid.contractorName,
				bidId: bid.id,
			})),
		[bids],
	);

	const selectedContractor = useMemo(() => {
		if (!selectedBidId) return null;
		return contractorOptions.find((opt) => opt.bidId === selectedBidId);
	}, [selectedBidId, contractorOptions]);

	const onSubmit = async (data: CloseRequestFormData) => {
		try {
			const payload: CloseRequestPayload = {
				project_id: parseInt(requestId),
				bid_id: parseInt(data.bid_id),
				contractor_id: parseInt(data.contractor_id),
				text: data.text,
				rating: data.rating,
			};

			await closeRequestMutation.mutateAsync(payload);

			toast.success('Request closed successfully!');

			if (onSuccess) {
				onSuccess();
			}
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message ||
				error?.message ||
				'Failed to close request';
			toast.error(errorMessage);
		}
	};

	if (bids.length === 0) {
		return (
			<div className="space-y-6">
				<div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
						<svg
							className="h-6 w-6 text-gray-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
					</div>
					<h3 className="mb-2 text-lg font-semibold text-gray-900">
						No Contractors Available
					</h3>
					<p className="mb-4 text-gray-600">
						There are no contractors who have submitted bids for
						this request. You need to have at least one contractor
						to close the request.
					</p>
					<div className="text-sm text-gray-500">
						<p>You can:</p>
						<ul className="mt-2 list-disc space-y-1 text-left">
							<li>Wait for contractors to submit bids</li>
							<li>Extend the bidding period if needed</li>
							<li>Cancel this request and create a new one</li>
						</ul>
					</div>
				</div>

				<div className="flex flex-col items-center gap-3 pt-4 md:flex-row md:justify-between">
					<Button
						type="button"
						variant="solid"
						color="light"
						onClick={onCancel}
						className="order-2 w-full !justify-center !p-3 !px-12 !text-[16px] !font-normal md:order-1 md:w-auto"
					>
						Cancel
					</Button>

					<Button
						type="button"
						variant="solid"
						color="primary"
						className="order-1 w-full !justify-center !gap-4 !p-3 !px-6 !text-[16px] !font-normal md:order-2 md:w-auto"
						disabled={true}
						icon={<ArrowRight />}
						iconPosition="right"
					>
						Close Request
					</Button>
				</div>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div>
				<Controller
					name="bid_id"
					control={control}
					rules={{ required: 'Please select a contractor' }}
					render={({ field }) => (
						<Select
							label="Select the contractor who did the work"
							options={contractorOptions.map((opt) => ({
								value: opt.bidId,
								label: opt.label,
							}))}
							value={field.value}
							onChange={(value) => {
								field.onChange(value);
								const contractor = contractorOptions.find(
									(opt) => opt.bidId === value,
								);
								if (contractor) {
									setValue('contractor_id', contractor.value);
								}
							}}
							error={errors.bid_id}
							placeholder="Select contractor"
						/>
					)}
				/>
				<input
					type="hidden"
					{...register('contractor_id', {
						required: 'Contractor ID is required',
					})}
					value={selectedContractor?.value || ''}
				/>
			</div>

			<div>
				<FormTextarea
					label="Feedback for the contractor"
					{...register('text', {
						maxLength: {
							value: 500,
							message:
								'Feedback must be less than 500 characters',
						},
					})}
					placeholder="Write your feedback here"
					rows={4}
					error={errors.text}
					showCharCount
					currentValue={textValue}
					maxLength={500}
				/>
			</div>

			<div>
				<Controller
					name="rating"
					control={control}
					render={({ field }) => (
						<StarRating
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				{errors.rating && (
					<p className="mt-1 text-sm text-red-500">
						{errors.rating.message}
					</p>
				)}
			</div>

			<div className="flex flex-col items-center gap-3 pt-4 md:flex-row md:justify-between">
				<Button
					type="button"
					variant="solid"
					color="light"
					onClick={onCancel}
					className="order-2 w-full !justify-center !p-3 !px-12 !text-[16px] !font-normal md:order-1 md:w-auto"
					disabled={closeRequestMutation.isPending}
				>
					Cancel
				</Button>

				<Button
					type="submit"
					variant="solid"
					color="primary"
					className="order-1 w-full !justify-center !gap-4 !p-3 !px-6 !text-[16px] !font-normal md:order-2 md:w-auto"
					disabled={closeRequestMutation.isPending}
					icon={
						closeRequestMutation.isPending ? (
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
						) : (
							<ArrowRight />
						)
					}
					iconPosition="right"
				>
					{closeRequestMutation.isPending
						? 'Closing...'
						: 'Close Request'}
				</Button>
			</div>
		</form>
	);
};
