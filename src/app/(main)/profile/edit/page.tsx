'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/shared/hooks/useStore';
import { useProfileForEdit } from '@/modules/ProfileEdit/hooks/useEditProfile';
import { EditProfile } from '@/modules/ProfileEdit/components/EditProfile';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage/ErrorMessage';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary';

export default function EditProfilePage(): JSX.Element {
	const router = useRouter();
	const authRole = useAppSelector((state) => state.auth.role);
	const { profileData, isLoading, isError } = useProfileForEdit(authRole);

	const handleCancel = () => {
		router.push('/profile');
	};

	const handleSuccess = () => {};

	if (isLoading || (!profileData && !isError)) {
		return <LoadingSpinner />;
	}

	if (isError || !profileData) {
		return <ErrorMessage message="Failed to load profile data" />;
	}

	return (
		<ErrorBoundary>
			<div className="min-h-screen bg-white">
				<div className="bg-[#F1F3F6] pt-28 pb-3 lg:pt-35 lg:pb-12">
					<div className="flex justify-center px-5">
						<section className="w-full max-w-[1240px]">
							<div className="mb-6 text-center lg:text-left">
								<h1 className="font-chalet-1960 mb-3 text-[36px] leading-[100%] font-medium tracking-[-1px] text-[#242424] lg:mb-1.5 lg:text-[40px]">
									Edit Profile
								</h1>
								<p className="text-[16px] leading-[100%] text-[#242424]">
									Update your personal details, contact
									information, and preferences.
								</p>
							</div>
						</section>
					</div>
				</div>

				<div className="flex justify-center px-5 py-14 pb-10 lg:py-10 lg:pb-30">
					<div className="w-full max-w-[1240px]">
						<EditProfile
							profileData={profileData}
							onCancel={handleCancel}
							onSuccess={handleSuccess}
						/>
					</div>
				</div>
			</div>
		</ErrorBoundary>
	);
}
