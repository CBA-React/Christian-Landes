import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UpdateProfileFormData } from '../types'; 
import { ProfileData } from '@/shared/types/profile'; 
import { useFileUpload } from '@/shared/hooks/useFileUpload'; 
import type { UpdateProfileWithImageData } from '../hooks/useEditProfile';

const editProfileSchema = z.object({
	fullName: z.string().min(2, 'Name must be at least 2 characters'),
	email: z
		.string()
		.email('Please enter a valid email address')
		.min(1, 'Email is required'),
	phone: z
		.string()
		.min(1, 'Phone number is required')
		.regex(
			/^[\+]?[(]?[\d\s\-\(\)]{7,}$/,
			'Please enter a valid phone number',
		),
	location: z.string().min(2, 'Location is required'),
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

	const { uploadFile, isUploading, previewUrl, clearPreview } = useFileUpload(
		{
			onSuccess: (uploadedFile) => {
				setUploadedLogo(uploadedFile);
				setPreviewImage(uploadedFile.url);
			},
			onError: (error) => {
				form.setError('fullName', { type: 'manual', message: error });
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

	const handleAddSpeciality = (speciality: string) => {
		if (selectedSpecialities.includes(speciality)) return;

		const newSpecialities = [...selectedSpecialities, speciality];
		setSelectedSpecialities(newSpecialities);
		form.setValue('specialities', newSpecialities, {
			shouldValidate: true,
		});
	};

	const handleRemoveSpeciality = (index: number) => {
		const newSpecialities = selectedSpecialities.filter(
			(_, i) => i !== index,
		);
		setSelectedSpecialities(newSpecialities);
		form.setValue('specialities', newSpecialities, {
			shouldValidate: true,
		});
	};

	const handleImageChange = async (file: File) => {
		try {
			const tempPreview = URL.createObjectURL(file);
			setPreviewImage(tempPreview);

			await uploadFile(file, 'logo');

			URL.revokeObjectURL(tempPreview);
		} catch (error) {
			setPreviewImage(profileData.avatar);
			console.error('Image upload failed:', error);
		}
	};

	const handleImageError = (error: string) => {
		form.setError('fullName', { type: 'manual', message: error });
	};

	const handleSubmit = async (data: UpdateProfileFormData) => {
		try {
			if (onSubmit) {
				const submitData: UpdateProfileWithImageData = {
					...data,
					uploadedLogo: uploadedLogo || undefined,
				};
				await onSubmit(submitData);
			}
		} catch (error) {
			throw error;
		}
	};

	const currentPreviewUrl = previewUrl || previewImage;

	return {
		form,
		selectedSpecialities,
		previewImage: currentPreviewUrl,
		isUploadingImage: isUploading,
		handleAddSpeciality,
		handleRemoveSpeciality,
		handleImageChange,
		handleImageError,
		handleSubmit,
		clearImagePreview: () => {
			clearPreview();
			setPreviewImage(profileData.avatar);
			setUploadedLogo(null);
		},
		hasNewImage: !!uploadedLogo,
	};
}
