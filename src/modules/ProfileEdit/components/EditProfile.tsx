'use client';

import { JSX } from 'react';
import { toast } from 'sonner';
import { FormTextarea } from './FormField';
import { LogoSection } from './LogoSection';
import { BasicInfo } from './BasicInfo';
import { ProfileFormActions } from './ProfileFormActions';
import { SpecialitySelector } from './SpecialitySelector';
import { CONTRACTOR_SPECIALITIES, CLIENT_TYPICAL_PROJECTS } from '../constants';
import { useAppSelector } from '@/shared/hooks/useStore';
import { useEditProfile } from '../hooks/useEditProfile';
import { useEditProfileForm } from '../hooks/useEditProfileForm';
import { ProfileData } from '@/shared/types/profile';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

interface EditProfileProps {
	profileData: ProfileData;
	onCancel: () => void;
	onSuccess: () => void;
}

export const EditProfile = ({
	profileData,
	onCancel,
	onSuccess,
}: EditProfileProps): JSX.Element => {
	const authRole = useAppSelector((state) => state.auth.role);
	const editProfileMutation = useEditProfile(authRole);

	const isContractor = profileData.role === 'contractor';
	const specialityOptions = isContractor
		? [...CONTRACTOR_SPECIALITIES]
		: [...CLIENT_TYPICAL_PROJECTS];

	const {
		form,
		selectedSpecialities,
		previewImage,
		isUploadingImage,
		handleAddSpeciality,
		handleRemoveSpeciality,
		handleImageChange,
		handleImageError,
		handleSubmit,
	} = useEditProfileForm({
		profileData,
		onSubmit: async (data) => {
			try {
				await editProfileMutation.mutateAsync(data);
				toast.success('Profile updated successfully!');
				onSuccess();
			} catch (error) {
				const errorMsg = getErrorMessage(
					error,
					'Failed to update profile',
				);
				toast.error(errorMsg);
			}
		},
	});

	const isLoading =
		form.formState.isSubmitting ||
		editProfileMutation.isPending ||
		isUploadingImage;

	// Обработчик ошибок загрузки изображения
	const handleImageErrorWithToast = (error: string) => {
		toast.error(error);
		handleImageError(error);
	};

	return (
		<div className="w-full rounded-lg bg-[#F1F3F6] p-6 lg:p-10">
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
					<LogoSection
						currentImage={previewImage}
						onImageChange={handleImageChange}
						onError={handleImageErrorWithToast}
						disabled={isLoading}
						isUploading={isUploadingImage}
					/>

					<div className="w-full flex-1 space-y-4 md:space-y-5">
						<div className="mb-6 text-left md:mb-8">
							<h2 className="mb-2 text-[36px] leading-[100%] font-medium tracking-[-1px] text-[#242424] lg:text-[40px]">
								{isContractor
									? 'Business Information'
									: 'Account Information'}
							</h2>
							<p className="text-sm text-[#242424]/50 md:text-base lg:text-[16px]">
								{isContractor
									? 'Your public business details shown to homeowners'
									: 'Your account information and preferences'}
							</p>
						</div>

						<BasicInfo
							register={form.register}
							errors={form.formState.errors}
							isContractor={isContractor}
							disabled={isLoading}
						/>

						<SpecialitySelector
							selectedSpecialities={selectedSpecialities}
							availableOptions={specialityOptions}
							onAdd={handleAddSpeciality}
							onRemove={handleRemoveSpeciality}
							placeholder={
								isContractor
									? 'Choose your speciality'
									: 'Select your typical projects'
							}
							label={
								isContractor ? 'Speciality' : 'Typical Projects'
							}
							maxItems={10}
						/>

						<FormTextarea
							{...form.register('about', {
								maxLength: {
									value: 1000,
									message:
										'About section must be less than 1000 characters',
								},
							})}
							rows={4}
							label="About"
							placeholder="Write something about you here"
							error={form.formState.errors.about}
							disabled={isLoading}
							maxLength={1000}
							showCharCount={true}
							maxCharCount={1000}
							currentValue={form.watch('about')}
						/>
						<ProfileFormActions
							onCancel={onCancel}
							isSubmitting={form.formState.isSubmitting}
							isPending={editProfileMutation.isPending}
							disabled={isLoading}
							isImageUploading={isUploadingImage}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
