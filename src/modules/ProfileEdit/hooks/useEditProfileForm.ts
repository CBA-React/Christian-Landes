import { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { MAX, phoneRegex } from '@/shared/constants/authSchema';
import { useFileUpload } from '@/shared/hooks/useFileUpload';
import { ProfileData } from '@/shared/types/profile';
import type { UpdateProfileWithImageData } from '../hooks/useEditProfile';
import { UpdateProfileFormData } from '../types';

const editProfileSchema = z.object({
	fullName: z
		.string()
		.min(2, 'Full name must be at least 2 characters')
		.max(MAX.full_name, `Max ${MAX.full_name} characters`),
	email: z
		.string()
		.regex(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			'Please enter a valid email',
		)
		.max(MAX.email, `Max ${MAX.email} characters`),
	phone: z
		.string()
		.max(MAX.phone, `Max ${MAX.phone} characters`)
		.or(z.literal(''))
		.refine((v) => !v || phoneRegex.test(v), {
			message: 'Please enter a valid phone number',
		}),
	location: z
		.string()
		.min(2, 'Please enter your city, state, or ZIP code')
		.max(MAX.location, `Max ${MAX.location} characters`),
	about: z.string().optional().default(''),
	specialities: z.array(z.string()).default([]),
});

interface UseEditProfileFormOptions {
	profileData: ProfileData;
	onSubmit?: (data: UpdateProfileWithImageData) => Promise<void>;
}

export function useEditProfileForm({
	profileData,
	onSubmit,
}: UseEditProfileFormOptions) {
	const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
		profileData.specialities || [],
	);

	const [previewImage, setPreviewImage] = useState<string>(
		profileData.avatar,
	);
	const [uploadedLogo, setUploadedLogo] = useState<{
		id: number;
		url: string;
		type: string;
		created_at: string;
	} | null>(null);

	const [isImageUploading, setIsImageUploading] = useState(false);

	const { uploadFile, isUploading, previewUrl, clearPreview } = useFileUpload(
		{
			onSuccess: (uploadedFile) => {
				if (!uploadedFile || typeof uploadedFile !== 'object') {
					return;
				}

				if (!uploadedFile.id || !uploadedFile.url) {
					return;
				}

				setUploadedLogo(uploadedFile);
				setPreviewImage(uploadedFile.url);
				setIsImageUploading(false);
			},
			onError: (error) => {
				form.setError('fullName', { type: 'manual', message: error });
				setIsImageUploading(false);
			},
		},
	);

	const form = useForm<UpdateProfileFormData>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			fullName: profileData.name,
			email: profileData.email,
			phone: profileData.phone,
			location: profileData.location,
			about: profileData.about || '',
			specialities: profileData.specialities || [],
		},
	});

	const handleAddSpeciality = useCallback(
		(speciality: string) => {
			if (selectedSpecialities.includes(speciality)) return;

			const newSpecialities = [...selectedSpecialities, speciality];
			setSelectedSpecialities(newSpecialities);
			form.setValue('specialities', newSpecialities, {
				shouldValidate: true,
			});
		},
		[selectedSpecialities, form],
	);

	const handleRemoveSpeciality = useCallback(
		(index: number) => {
			const newSpecialities = selectedSpecialities.filter(
				(_, i) => i !== index,
			);
			setSelectedSpecialities(newSpecialities);
			form.setValue('specialities', newSpecialities, {
				shouldValidate: true,
			});
		},
		[selectedSpecialities, form],
	);

	const handleImageChange = useCallback(
		async (file: File) => {
			setIsImageUploading(true);

			try {
				const tempPreview = URL.createObjectURL(file);
				setPreviewImage(tempPreview);

				await uploadFile(file, 'logo');

				URL.revokeObjectURL(tempPreview);
			} catch (error) {
				setPreviewImage(profileData.avatar);
				setIsImageUploading(false);
			}
		},
		[uploadFile, profileData.avatar],
	);

	const handleImageError = useCallback(
		(error: string) => {
			form.setError('fullName', { type: 'manual', message: error });
		},
		[form],
	);

	const handleSubmit = useCallback(
		async (formData: UpdateProfileFormData) => {
			if (isImageUploading) {
				form.setError('fullName', {
					type: 'manual',
					message: 'Please wait for image upload to complete',
				});
				return;
			}

			if (onSubmit) {
				const submitData: UpdateProfileWithImageData = {
					...formData,
					uploadedLogo: uploadedLogo || undefined,
				};

				await onSubmit(submitData);
			}
		},
		[isImageUploading, uploadedLogo, onSubmit, form],
	);

	const currentPreviewUrl = previewUrl || previewImage;
	const isUploadingImage = isUploading || isImageUploading;

	return {
		form,
		selectedSpecialities,
		previewImage: currentPreviewUrl,
		isUploadingImage,
		handleAddSpeciality,
		handleRemoveSpeciality,
		handleImageChange,
		handleImageError,
		handleSubmit: form.handleSubmit(handleSubmit),
		clearImagePreview: () => {
			clearPreview();
			setPreviewImage(profileData.avatar);
			setUploadedLogo(null);
			setIsImageUploading(false);
		},
		hasNewImage: !!uploadedLogo,
	};
}
