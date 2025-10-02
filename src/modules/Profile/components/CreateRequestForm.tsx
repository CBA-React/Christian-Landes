'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import ArrowRight from 'public/icons/arrow-up-right-white-big.svg';

import { Input } from '@/shared/components/Input/Input';
import { FormTextarea } from '@/modules/ProfileEdit/components/FormField';
import { Select } from '@/shared/components/Select/Select';
import { Button } from '@/shared/components/Button/Button';
import { useFileUpload } from '@/shared/hooks/useFileUpload';
import { useCreateRequest } from '../hooks/useCreateRequest';
import { ImageUploader } from './ImageUploader';
import { LocationAutocomplete } from './LocationAutocomplete';
import {
	DatePicker,
	DateRangePicker,
} from '@/shared/components/DatePickers/DatePickers';
import { PROJECT_CATEGORIES } from '@/modules/AvailableProjects/projectCategories';
import type { CreateRequestFormData, CreateRequestPayload } from '../types';
import type { UploadedFile } from '@/shared/types/upload';

interface CreateRequestFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
	showCancelButton?: boolean;
}

export const CreateRequestForm: React.FC<CreateRequestFormProps> = ({
	onSuccess,
	onCancel,
	showCancelButton = true,
}) => {
	const router = useRouter();
	const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);

	const {
		register,
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors },
	} = useForm<CreateRequestFormData>({
		defaultValues: {
			title: '',
			category: '',
			location: '',
			budget: '',
			preferred_start: '',
			completion_window: '',
			description: '',
		},
	});

	const descriptionValue = watch('description') || '';

	const { uploadFile, isUploading } = useFileUpload({
		onSuccess: (uploadedFile) => {
			setUploadedImages((prev) => [...prev, uploadedFile]);
			toast.success('Image uploaded successfully!');
		},
		onError: (error) => {
			toast.error(error || 'Failed to upload image');
		},
	});

	const createRequestMutation = useCreateRequest();

	const handleImageUpload = async (file: File) => {
		await uploadFile(file, 'image');
	};

	const handleRemoveImage = (id: number) => {
		setUploadedImages((prev) => prev.filter((img) => img.id !== id));
	};

	const onSubmit = async (data: CreateRequestFormData) => {
		try {
			const payload: CreateRequestPayload = {
				title: data.title,
				category: data.category,
				location: data.location,
				budget: parseFloat(data.budget),
				preferred_start: data.preferred_start,
				completion_window: data.completion_window,
				description: data.description,
				images: uploadedImages,
			};

			await createRequestMutation.mutateAsync(payload);

			toast.success('Request created successfully!');
			reset();
			setUploadedImages([]);

			if (onSuccess) {
				onSuccess();
			} else {
				router.push('/profile');
			}
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message ||
				error?.message ||
				'Failed to create project';
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

	const categoryOptions = PROJECT_CATEGORIES.map((cat) => ({
		value: cat.slug,
		label: cat.name,
	}));

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="md:col-span-1">
					<Input
						label="Project Title"
						register={register('title', {
							required: 'Project title is required',
						})}
						placeholder="Painting the kitchen"
						error={errors.title}
					/>
				</div>

				<div className="md:col-span-1">
					<Controller
						name="category"
						control={control}
						rules={{ required: 'Category is required' }}
						render={({ field }) => (
							<Select
								label="Category"
								options={categoryOptions}
								value={field.value}
								onChange={field.onChange}
								error={errors.category}
								placeholder="Plumbing"
							/>
						)}
					/>
				</div>

				<div className="md:col-span-1">
					<Controller
						name="location"
						control={control}
						rules={{ required: 'Location is required' }}
						render={({ field }) => (
							<LocationAutocomplete
								label="Location"
								value={field.value}
								onChange={field.onChange}
								error={errors.location}
								placeholder="Salt Lake City, UT"
								required
							/>
						)}
					/>
				</div>
			</div>

			<div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="md:col-span-1">
					<Input
						label="Budget"
						register={register('budget', {
							required: 'Budget is required',
							pattern: {
								value: /^\d+(\.\d{1,2})?$/,
								message: 'Please enter a valid number',
							},
						})}
						type="text"
						placeholder="150$"
						error={errors.budget}
					/>
				</div>

				<div className="md:col-span-1">
					<Controller
						name="preferred_start"
						control={control}
						rules={{ required: 'Preferred start date is required' }}
						render={({ field }) => (
							<DatePicker
								label="Preferred Start"
								value={field.value}
								onChange={field.onChange}
								placeholder="Select start date"
								error={errors.preferred_start}
							/>
						)}
					/>
				</div>

				<div className="md:col-span-1">
					<Controller
						name="completion_window"
						control={control}
						rules={{ required: 'Completion window is required' }}
						render={({ field }) => (
							<DateRangePicker
								label="Completion Window"
								value={field.value}
								onChange={field.onChange}
								placeholder="Select date range"
								error={errors.completion_window}
							/>
						)}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="md:col-span-2">
					<FormTextarea
						label="Description"
						{...register('description', {
							required: 'Description is required',
							maxLength: {
								value: 1000,
								message:
									'Description must be less than 1000 characters',
							},
						})}
						placeholder="Write your description here"
						rows={4}
						error={errors.description}
						showCharCount
						currentValue={descriptionValue}
					/>
				</div>

				<div className="flex flex-col md:col-span-1">
					<label className="mb-3 block text-[16px] text-[#242424]">
						Photos
					</label>
					<div className="flex-1 rounded border-2 border-dashed border-[#242424]/20 pt-2">
						<ImageUploader
							images={uploadedImages}
							onUpload={handleImageUpload}
							onRemove={handleRemoveImage}
							isUploading={isUploading}
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col items-center gap-3 pt-6 md:flex-row md:justify-between">
				{showCancelButton && (
					<Button
						type="button"
						variant="solid"
						color="light"
						onClick={handleCancel}
						className="order-2 w-full !justify-center !p-3 !px-12 !text-[16px] !font-normal md:order-1 md:w-auto"
						disabled={createRequestMutation.isPending}
					>
						Cancel
					</Button>
				)}

				<Button
					type="submit"
					variant="solid"
					color="primary"
					className="order-1 w-full !justify-center !gap-4 !p-3 !px-6 !text-[16px] !font-normal md:order-2 md:w-auto"
					disabled={createRequestMutation.isPending}
					icon={
						createRequestMutation.isPending ? (
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
						) : (
							<ArrowRight />
						)
					}
					iconPosition="right"
				>
					{createRequestMutation.isPending
						? 'Creating...'
						: 'Post New Request'}
				</Button>
			</div>
		</form>
	);
};
