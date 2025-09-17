import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UpdateProfileFormData } from '../types';
import { ProfileData } from '@/modules/Profile/types';

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
	onSubmit?: (data: UpdateProfileFormData) => Promise<void>;
}

export function useEditProfileForm({ profileData, onSubmit }: UseEditProfileFormOptions) {
	const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
		profileData.specialities || [],
	);
	
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string>(profileData.avatar);

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
		form.setValue('specialities', newSpecialities, { shouldValidate: true });
	};

	const handleRemoveSpeciality = (index: number) => {
		const newSpecialities = selectedSpecialities.filter((_, i) => i !== index);
		setSelectedSpecialities(newSpecialities);
		form.setValue('specialities', newSpecialities, { shouldValidate: true });
	};

	const handleImageChange = (file: File) => {
		setSelectedFile(file);
		
		const reader = new FileReader();
		reader.onload = () => {
			setPreviewImage(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleImageError = (error: string) => {
		form.setError('fullName', { type: 'manual', message: error });
	};

	const handleSubmit = async (data: UpdateProfileFormData) => {
		try {
			if (onSubmit) {
				await onSubmit(data);
			}
		} catch (error) {
			throw error;
		}
	};

	return {
		form,
		selectedSpecialities,
		selectedFile,
		previewImage,
		handleAddSpeciality,
		handleRemoveSpeciality,
		handleImageChange,
		handleImageError,
		handleSubmit,
	};
}