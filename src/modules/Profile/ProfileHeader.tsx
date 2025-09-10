'use client';

import { JSX } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/components/Button/Button';

import { ProfileData } from './types';

import StarIcon from '../../../public/icons/profile/star.svg';
import DollarIcon from '../../../public/icons/profile/dollar-for-button.svg';
import EditIcon from '../../../public/icons/profile/edit.svg';

interface ProfileHeaderProps {
	profileData: ProfileData;
}

const handleViewEarnings = () => {
	console.log('View Earnings clicked');
};

const handleEditProfile = () => {
	console.log('Edit Profile clicked');
};

export const ProfileHeader = ({
	profileData,
}: ProfileHeaderProps): JSX.Element => {
	return (
		<div className="h-[400px] bg-[#F1F3F6] px-5 py-40">
			<section className="mx-auto flex max-w-[1240px] items-end gap-6">
				<div className="relative h-35 w-35 flex-shrink-0 overflow-hidden rounded-xl shadow-sm">
					<Image
						src={profileData.avatar}
						alt={`${profileData.name} Avatar`}
						fill
						className="object-cover"
						sizes="140px"
					/>
				</div>

				<div className="flex flex-1 flex-col self-center">
					{profileData.rating && (
						<div className="flex items-center gap-2">
							<div className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-100 px-2 py-1">
								<StarIcon width={14} height={14} />
								<span className="text-sm font-semibold">
									{profileData.rating}
								</span>
							</div>

							{profileData.reviewsCount && (
								<span className="text-sm text-gray-600">
									{profileData.reviewsCount} reviews
								</span>
							)}
						</div>
					)}

					<div className="flex items-center gap-2">
						<h1 className="font-chalet-1960 text-[48px] leading-[64px] font-semibold text-gray-900">
							{profileData.name}
						</h1>
					</div>

					<p className="text-[16px] text-gray-600">
						{profileData.email}
					</p>
				</div>

				<div className="flex">
					{/* View Earnings */}
					<Button
						variant="solid"
						color="primary"
						icon={<DollarIcon />}
						iconPosition="right"
						className="flex h-[60px] w-[240px] justify-between rounded-none !px-5 !py-5 text-[20px]"
						onClick={handleViewEarnings}
					>
						View Earnings
					</Button>

					{/* Edit Profile */}
					<Button
						variant="solid"
						color="dark"
						icon={<EditIcon />}
						iconPosition="right"
						className="flex h-[60px] w-[212px] justify-between rounded-none !px-5 !py-5 text-[20px]"
						onClick={handleEditProfile}
					>
						Edit Profile
					</Button>
				</div>
			</section>
		</div>
	);
};
