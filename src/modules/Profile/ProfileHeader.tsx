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
		<div className="bg-[#F1F3F6] px-5 pt-28 pb-8 md:py-40">
			<section className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 md:flex-row md:items-end">
				<div className="relative h-35 w-35 flex-shrink-0 overflow-hidden rounded-xl shadow-sm">
					<Image
						src={profileData.avatar}
						alt={`${profileData.name} Avatar`}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 80px, 140px"
					/>
				</div>

				{/* Profile Info */}
				<div className="flex flex-1 flex-col items-center gap-2 text-center md:items-start md:self-center md:text-left">
					{/* Rating */}
					{profileData.rating && (
						<div className="flex items-center gap-2">
							<div className="inline-flex items-center gap-1.5 bg-[#CFEDD9] px-3 py-1">
								<StarIcon width={14} height={14} />
								<span className="text-[14px] font-normal">
									{profileData.rating}
								</span>
							</div>

							{profileData.reviewsCount && (
								<span className="text-[14px] font-normal text-[#747474]">
									{profileData.reviewsCount} reviews
								</span>
							)}
						</div>
					)}

					{/* Name - адаптивный размер шрифта */}
					<div className="flex items-center gap-2">
						<h1 className="font-chalet-1960 text-[36px] leading-[38px] text-gray-900 md:text-[48px] md:leading-[64px]">
							{profileData.name}
						</h1>
					</div>

					{/* Email */}
					<p className="text-[16px] font-normal text-[#242424]">
						{profileData.email}
					</p>
				</div>

				<div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-0">
					{/* View Earnings Button */}
					<Button
						variant="solid"
						color="primary"
						icon={<DollarIcon />}
						iconPosition="right"
						className="flex h-[60px] w-full justify-between rounded-none !px-5 !py-3 text-[20px] font-normal md:w-[240px]"
						onClick={handleViewEarnings}
					>
						View Earnings
					</Button>

					{/* Edit Profile Button */}
					<Button
						variant="solid"
						color="dark"
						icon={<EditIcon />}
						iconPosition="right"
						className="flex h-[60px] w-full justify-between rounded-none !px-5 !py-3 text-[20px] font-normal md:w-[212px]"
						onClick={handleEditProfile}
					>
						Edit Profile
					</Button>
				</div>
			</section>
		</div>
	);
};
