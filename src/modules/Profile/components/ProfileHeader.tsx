'use client';

import { JSX } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/components/Button/Button';

import { ProfileData } from '../types';

import StarIcon from '../../../../public/icons/profile/star.svg';
import DollarIcon from '../../../../public/icons/profile/dollar-for-button.svg';
import EditIcon from '../../../../public/icons/profile/edit.svg';
import PostIcon from '../../../../public/icons/profile/plus-white.svg';
import Verified from '../../../../public/icons/profile/verified.svg';

interface ProfileHeaderProps {
	profileData: ProfileData;
}

const handleViewEarnings = () => {
	console.log('View Earnings clicked');
};

const handlePostRequest = () => {
	console.log('Post New Request clicked');
};

const handleEditProfile = () => {
	console.log('Edit Profile clicked');
};

export const ProfileHeader = ({
	profileData,
}: ProfileHeaderProps): JSX.Element => {
	return (
		<div className="flex justify-center bg-[#F1F3F6] pt-28 pb-8 lg:pt-40 lg:pb-20">
			<section
				className="mx-5 flex w-full max-w-[1240px] flex-col items-center gap-6 lg:flex-row lg:items-end"
				aria-label="Profile information"
			>
				<div className="relative h-35 w-35 flex-shrink-0 overflow-hidden rounded-xl shadow-sm">
					<Image
						src={profileData.avatar}
						alt={`${profileData.name} profile picture`}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 80px, 140px"
					/>
				</div>

				<div className="flex flex-1 flex-col items-center gap-2 text-center lg:items-start lg:self-center lg:text-left">
					<div
						className="flex items-center gap-2"
						role="group"
						aria-label="Rating and reviews"
					>
						<div className="inline-flex items-center gap-1.5 bg-[#CFEDD9] px-3 py-1">
							<StarIcon
								width={14}
								height={14}
								aria-hidden="true"
							/>
							<span className="text-[14px] font-normal">
								{profileData.rating}
							</span>
						</div>
						<span className="text-[14px] font-normal text-[#747474]">
							{profileData.reviewsCount} reviews
						</span>
					</div>

					<div className="flex items-center gap-4 md:gap-1 lg:gap-3">
						<h1 className="font-chalet-1960 text-[36px] leading-[38px] text-[#242424] lg:text-[48px] lg:leading-[64px]">
							{profileData.name}
						</h1>
						<Verified aria-label="Verified user" />
					</div>

					<p className="text-[16px] font-normal text-[#242424]">
						{profileData.email}
					</p>
				</div>

				<div
					className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:gap-0"
					role="group"
					aria-label="Profile actions"
				>
					{profileData.role === 'contractor' ? (
						<Button
							variant="solid"
							color="primary"
							icon={<DollarIcon aria-hidden="true" />}
							iconPosition="right"
							className="flex h-[60px] w-full justify-between rounded-none !px-5 !py-3 text-[20px] font-normal lg:w-[240px]"
							onClick={handleViewEarnings}
							aria-label="View your earnings"
						>
							View Earnings
						</Button>
					) : (
						<Button
							variant="solid"
							color="primary"
							icon={<PostIcon aria-hidden="true" />}
							iconPosition="right"
							className="flex h-[60px] w-full justify-between rounded-none !px-5 !py-3 text-[20px] font-normal lg:w-[240px]"
							onClick={handlePostRequest}
							aria-label="Post new project request"
						>
							Post New Request
						</Button>
					)}

					<Button
						variant="solid"
						color="dark"
						icon={<EditIcon aria-hidden="true" />}
						iconPosition="right"
						className="flex h-[60px] w-full justify-between rounded-none !px-5 !py-3 text-[20px] font-normal lg:w-[212px]"
						onClick={handleEditProfile}
						aria-label="Edit profile information"
					>
						Edit Profile
					</Button>
				</div>
			</section>
		</div>
	);
};
