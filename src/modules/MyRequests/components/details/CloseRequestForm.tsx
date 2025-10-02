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
