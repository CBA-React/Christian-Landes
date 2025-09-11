'use client';

import { JSX } from 'react';
import { ProfileData } from './types';
import { PROFILE_MOCK_DATA } from './constants';

import ServiceIcon from '../../../public/icons/profile/service.svg';

interface InformationProps {
	profileData: ProfileData;
}

export const Information = ({ profileData }: InformationProps): JSX.Element => {
	const isContractor = profileData.role === 'contractor';

	const contractorData = PROFILE_MOCK_DATA.contractor.businessInfo;
	const clientData = PROFILE_MOCK_DATA.client.businessInfo;

	const config = {
		title: isContractor ? 'Business Information' : 'Account Information',
		subtitle: 'Your public business details shown to homeowners',
		nameLabel: isContractor ? 'Business Name' : 'Full Name',
		nameValue: isContractor
			? contractorData.businessName
			: clientData.fullName,
		email: isContractor ? contractorData.email : clientData.email,
		phone: isContractor ? contractorData.phone : clientData.phone,
		locationLabel: isContractor ? 'Service Area' : 'Location',
		locationValue: isContractor
			? contractorData.serviceArea
			: clientData.location,
		showLocationIcon: isContractor,
		about: isContractor ? contractorData.about : clientData.about,
		tagsLabel: isContractor ? 'Speciality' : 'Typical Projects',
		tags: isContractor
			? contractorData.specialities
			: clientData.typicalProjects,
	};

	return (
		<div className="rounded-lg bg-[#F1F3F6] p-6 md:p-10">
			<h2 className="text-[40px] tracking-[-1px] text-gray-800">
				{config.title}
			</h2>
			<p className="mb-4 text-[16px] text-gray-800/50 md:mb-6">
				{config.subtitle}
			</p>

			<div className="space-y-4 md:flex md:flex-row md:gap-30 md:space-y-0">
				<div className="md:flex-1">
					<div className="space-y-4">
						<div>
							<label className="font-chalet-1960 block text-[20px] text-gray-800">
								{config.nameLabel}
							</label>
							<div className="mt-1 text-[16px] text-gray-800">
								{config.nameValue}
							</div>
						</div>

						<div className="hidden md:block">
							<label className="font-chalet-1960 block text-[20px] text-gray-800">
								Email
							</label>
							<div className="mt-1 text-[16px] text-gray-800">
								{config.email}
							</div>
						</div>
					</div>
				</div>

				<div className="md:flex-1">
					<div className="space-y-4">
						<div>
							<label className="font-chalet-1960 block text-[20px] text-gray-800">
								Phone
							</label>
							<div className="font-chalet-1960 mt-1 text-[16px] text-gray-800">
								{config.phone}
							</div>
						</div>

						<div className="hidden md:block">
							<label className="font-chalet-1960 block text-[20px] text-gray-800">
								{config.locationLabel}
								{config.showLocationIcon && (
									<ServiceIcon className="ml-1 inline" />
								)}
							</label>
							<div className="font-chalet-1960 mt-1 text-[16px] text-gray-800">
								{config.locationValue}
							</div>
						</div>
					</div>
				</div>

				<div className="md:hidden">
					<label className="font-chalet-1960 block text-[20px] text-gray-800">
						Email
					</label>
					<div className="mt-1 text-[16px] text-gray-800">
						{config.email}
					</div>
				</div>

				<div className="md:hidden">
					<label className="font-chalet-1960 block text-[20px] text-gray-800">
						{config.locationLabel}
						{config.showLocationIcon && (
							<ServiceIcon className="ml-1 inline" />
						)}
					</label>
					<div className="font-chalet-1960 mt-1 text-[16px] text-gray-800">
						{config.locationValue}
					</div>
				</div>
			</div>

			<div className="mt-4 md:mt-6">
				<label className="font-chalet-1960 block text-[20px] text-gray-800">
					About
				</label>
				<div className="font-chalet-1960 mt-1 text-[16px] leading-relaxed text-gray-800">
					{config.about}
				</div>
			</div>

			<div className="mt-4 md:mt-6">
				<label className="font-chalet-1960 mb-2 block text-[20px] text-gray-800">
					{config.tagsLabel}
				</label>
				<div className="flex flex-wrap gap-2">
					{config.tags.map((tag, index) => (
						<span
							key={index}
							className="font-chalet-1960 inline-flex items-center rounded-full border-1 bg-[#003BFF]/10 px-3 py-1 text-[14px] text-[#003BFF]"
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
