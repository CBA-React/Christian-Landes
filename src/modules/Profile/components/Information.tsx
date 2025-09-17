'use client';

import { JSX } from 'react';
import { ProfileData } from '../types';
import { SpecialityTag } from '@/shared/components/SpecialityTag/SpecialityTag';

import ServiceIcon from '../../../../public/icons/profile/service.svg';

interface InformationProps {
	profileData: ProfileData;
}

export const Information = ({ profileData }: InformationProps): JSX.Element => {
	const isContractor = profileData.role === 'contractor';

	const config = {
		title: isContractor ? 'Business Information' : 'Account Information',
		subtitle: isContractor
			? 'Your public business details shown to homeowners'
			: 'Your account information and preferences',
		nameLabel: isContractor ? 'Business Name' : 'Full Name',
		nameValue: profileData.name,
		email: profileData.email,
		phone: profileData.phone || 'Not specified',
		locationLabel: isContractor ? 'Service Area' : 'Location',
		locationValue: profileData.location || 'Not specified',
		showLocationIcon: isContractor,
		about: profileData.about || 'No description provided',
		tagsLabel: isContractor ? 'Speciality' : 'Typical Projects',
		tags: profileData.specialities || [],
	};

	return (
		<div className="rounded-lg bg-[#F1F3F6] p-6 lg:p-10">
			<h2 className="text-[40px] tracking-[-1px] text-[#242424]">
				{config.title}
			</h2>
			<p className="mb-4 text-[16px] text-[#242424]/50 md:mb-6">
				{config.subtitle}
			</p>

			<div className="space-y-4 md:flex md:flex-row md:gap-38 md:space-y-0">
				<div className="space-y-4">
					<div>
						<label className="font-chalet-1960 block text-[20px] text-[#242424]">
							{config.nameLabel}
						</label>
						<div className="mt-1 text-[16px] text-[#242424]">
							{config.nameValue}
						</div>
					</div>

					<div className="hidden md:block">
						<label className="font-chalet-1960 block text-[20px] text-[#242424]">
							Email
						</label>
						<div className="mt-1 text-[16px] text-[#242424]">
							{config.email}
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<div>
						<label className="font-chalet-1960 block text-[20px] text-[#242424]">
							Phone
						</label>
						<div className="font-chalet-1960 mt-1 text-[16px] text-[#242424]">
							{config.phone}
						</div>
					</div>

					<div className="hidden md:block">
						<label className="font-chalet-1960 block text-[20px] text-[#242424]">
							{config.locationLabel}
							{config.showLocationIcon && (
								<ServiceIcon className="ml-1 inline" />
							)}
						</label>
						<div className="font-chalet-1960 mt-1 text-[16px] text-[#242424]">
							{config.locationValue}
						</div>
					</div>
				</div>

				{/* Mobile versions */}
				<div className="md:hidden">
					<label className="font-chalet-1960 block text-[20px] text-[#242424]">
						Email
					</label>
					<div className="mt-1 text-[16px] text-[#242424]">
						{config.email}
					</div>
				</div>

				<div className="md:hidden">
					<label className="font-chalet-1960 block text-[20px] text-[#242424]">
						{config.locationLabel}
						{config.showLocationIcon && (
							<ServiceIcon className="ml-1 inline" />
						)}
					</label>
					<div className="font-chalet-1960 mt-1 text-[16px] text-[#242424]">
						{config.locationValue}
					</div>
				</div>
			</div>

			<div className="mt-4 md:mt-6">
				<label className="font-chalet-1960 block text-[20px] text-[#242424]">
					About
				</label>
				<div className="font-chalet-1960 mt-1 text-[16px] leading-relaxed text-[#242424]">
					{config.about}
				</div>
			</div>

			<div className="mt-4 md:mt-6">
				<label className="font-chalet-1960 mb-2 block text-[20px] text-[#242424]">
					{config.tagsLabel}
				</label>
				<div className="flex flex-wrap gap-2">
					{config.tags.length > 0 ? (
						config.tags.map((tag: string, index: number) => (
							<SpecialityTag key={index} size="md">
								{tag}
							</SpecialityTag>
						))
					) : (
						<span className="text-[#242424]/50 italic">
							No {config.tagsLabel.toLowerCase()} specified
						</span>
					)}
				</div>
			</div>
		</div>
	);
};
