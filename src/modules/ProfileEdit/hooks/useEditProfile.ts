import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthRole } from '@/shared/lib/roleMapper';
import { ProfileApi } from '../../Profile/services/ProfileApi';
import { UpdateProfileFormData, ProfileData } from '../../Profile/types';
import { useAppDispatch } from '@/shared/hooks/useStore';
import { login } from '@/modules/auth/slices/authSlice';

export function useEditProfile(authRole: AuthRole | null) {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const router = useRouter();

	return useMutation({
		mutationFn: async (formData: UpdateProfileFormData) => {
			if (!authRole) throw new Error('Auth role is required');

			const previousProfile = queryClient.getQueryData<ProfileData>([
				'profile',
				authRole,
			]);

			if (!previousProfile) {
				throw new Error('Profile data not found');
			}

			const apiPayload = ProfileApi.transformToApiFormat(
				formData,
				previousProfile.profile_id,
			);

			const response = await ProfileApi.updateProfile(
				authRole,
				apiPayload,
			);
			return ProfileApi.transformProfileData(response, authRole);
		},
		onMutate: async (formData) => {
			await queryClient.cancelQueries({
				queryKey: ['profile', authRole],
			});

			const previousProfile = queryClient.getQueryData<ProfileData>([
				'profile',
				authRole,
			]);

			if (previousProfile) {
				const optimisticProfile: ProfileData = {
					...previousProfile,
					name: formData.fullName,
					email: formData.email,
					phone: formData.phone,
					location: formData.location,
					about: formData.about || null,
					specialities: formData.specialities || [],
				};

				queryClient.setQueryData(
					['profile', authRole],
					optimisticProfile,
				);
			}

			return { previousProfile };
		},
		onSuccess: (updatedProfile: ProfileData, variables, context) => {
			queryClient.setQueryData(['profile', authRole], updatedProfile);

			if (updatedProfile.email) {
				localStorage.setItem('email', updatedProfile.email);
				const token = localStorage.getItem('access_token');
				if (token) {
					dispatch(login({ token, email: updatedProfile.email }));
				}
			}

			queryClient.invalidateQueries({ queryKey: ['profile', authRole] });

			setTimeout(() => {
				router.push('/profile');
			}, 1000);
		},
		onError: (error, variables, context) => {
			if (context?.previousProfile) {
				queryClient.setQueryData(
					['profile', authRole],
					context.previousProfile,
				);
			}

			console.error('Failed to update profile:', error);
		},
	});
}

export function useProfileForEdit(authRole: AuthRole | null) {
	const queryClient = useQueryClient();

	const cachedProfile = queryClient.getQueryData<ProfileData>([
		'profile',
		authRole,
	]);

	return {
		profileData: cachedProfile,
		isLoading: !cachedProfile,
	};
}
