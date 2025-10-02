'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import ArrowRight from 'public/icons/arrow-up-right-white-big.svg';
import { Input } from '@/shared/components/Input/Input';
import { FormTextarea } from '@/modules/ProfileEdit/components/FormField';
import { Button } from '@/shared/components/Button/Button';
import { useRespondToProject } from '../../hooks/useRespondToProject';
import type {
	RespondToProjectFormData,
	RespondToProjectPayload,
} from '../../types/type';

interface RespondToProjectFormProps {
	projectId: string;
	onSuccess?: () => void;
	onCancel?: () => void;
	showCancelButton?: boolean;
}

export const RespondToProjectForm: React.FC<RespondToProjectFormProps> = ({
	projectId,
	onSuccess,
	onCancel,
	showCancelButton = true,
}) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<RespondToProjectFormData>({
		defaultValues: {
			bid: '',
			begin_work: '',
			estimate: '',
			message: '',
		},
	});

	const messageValue = watch('message') || '';

	const respondMutation = useRespondToProject();

	const onSubmit = async (data: RespondToProjectFormData) => {
		try {
			const payload: RespondToProjectPayload = {
				project_id: parseInt(projectId),
				bid: parseFloat(data.bid),
				begin_work: data.begin_work,
				estimate: data.estimate,
				message: data.message,
			};

			await respondMutation.mutateAsync(payload);

			toast.success('Your offer has been sent successfully!');
			reset();

			if (onSuccess) {
				onSuccess();
			} else {
				router.push('/available-projects');
			}
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message ||
				error?.message ||
				'Failed to send offer';
			toast.error(errorMessage);
		}
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		} else {
			router.back();
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<div>
				<Input
					label="Your Bid"
					register={register('bid', {
						required: 'Bid amount is required',
						pattern: {
							value: /^\d+(\.\d{1,2})?$/,
							message: 'Please enter a valid number',
						},
					})}
					type="text"
					placeholder="$150"
					error={errors.bid}
				/>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="md:col-span-1">
					<Input
						label="When can you begin work?"
						register={register('begin_work', {
							required: 'Start time is required',
						})}
						type="text"
						placeholder="Next week"
						error={errors.begin_work}
					/>
				</div>

				<div className="md:col-span-1">
					<Input
						label="Estimated Completion Time"
						register={register('estimate', {
							required: 'Completion time is required',
						})}
						type="text"
						placeholder="1-2 weeks / up to 1 month"
						error={errors.estimate}
					/>
				</div>
			</div>

			<div>
				<FormTextarea
					label="Message to Client"
					{...register('message', {
						required: 'Message is required',
						maxLength: {
							value: 1000,
							message:
								'Message must be less than 1000 characters',
						},
					})}
					placeholder="Write your message here"
					rows={5}
					error={errors.message}
					showCharCount
					currentValue={messageValue}
				/>
			</div>

			<div className="flex flex-col items-center gap-3 pt-1 md:flex-row md:justify-between">
				{showCancelButton && (
					<Button
						type="button"
						variant="solid"
						color="light"
						onClick={handleCancel}
						className="order-2 w-full !justify-center !p-3 !px-12 !text-[16px] !font-normal md:order-1 md:w-auto"
						disabled={respondMutation.isPending}
					>
						Cancel
					</Button>
				)}

				<Button
					type="submit"
					variant="solid"
					color="primary"
					className="order-1 w-full !justify-center !gap-4 !p-3 !px-6 !text-[16px] !font-normal md:order-2 md:w-auto"
					disabled={respondMutation.isPending}
					icon={
						respondMutation.isPending ? (
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
						) : (
							<ArrowRight />
						)
					}
					iconPosition="right"
				>
					{respondMutation.isPending ? 'Sending...' : 'Apply Now'}
				</Button>
			</div>
		</form>
	);
};
