'use client';

import { JSX } from 'react';

import ServiceIcon from '../../../public/icons/profile/service.svg';

const businessData = {
	businessName: 'Mark Stevens',
	email: 'contractor@example.com',
	phone: '(555) 123-4567',
	serviceArea: 'San Francisco Bay Area',
	about: "Hi, I'm Mark — a reliable handyman with 8+ years of experience in home repairs. I handle everything from minor fixes to full room updates. I show up on time, work clean, and get the job done right. Friendly, professional, and fully equipped. Let's make your home better, one task at a time.",
	specialities: ['Renovation', 'Electrical Plumbing'],
};

export const BusinessInformation = (): JSX.Element => {
	return (
		<div className="rounded-lg bg-[#F1F3F6] p-6 md:p-10">
			<h2 className="text-[40px] tracking-[-1px] text-gray-800">
				Business Information
			</h2>
			<p className="mb-4 text-[16px] text-gray-800/50 md:mb-6">
				Your public business details shown to homeowners
			</p>

			{/* Mobile: Single column with correct order, Desktop: Two columns */}
			<div className="space-y-4 md:flex md:flex-row md:gap-30 md:space-y-0">
				{/* Business Name - always first */}
				<div className="md:flex-1">
					<div className="space-y-4">
						<div>
							<label className="font-chalet-1960 block text-[20px] text-gray-800">
								Business Name
							</label>
							<div className="mt-1 text-[16px] text-gray-800">
								{businessData.businessName}
							</div>
						</div>

						{/* Email - shown second on desktop, third on mobile */}
						<div className="hidden md:block">
							<label className="font-chalet-1960 block text-[20px] text-gray-800">
								Email
							</label>
							<div className="mt-1 text-[16px] text-gray-800">
								{businessData.email}
							</div>
						</div>
					</div>
				</div>

				{/* Phone - shown second on mobile, first in right column on desktop */}
				<div className="md:flex-1">
					<div className="space-y-4">
						<div>
							<label className="font-chalet-1960 block text-[20px] text-gray-800">
								Phone
							</label>
							<div className="font-chalet-1960 mt-1 text-[16px] text-gray-800">
								{businessData.phone}
							</div>
						</div>

						{/* Service Area - shown fourth on mobile, second in right column on desktop */}
						<div className="hidden md:block">
							<label className="font-chalet-1960 block text-[20px] text-gray-800">
								Service Area <ServiceIcon className="inline" />
							</label>
							<div className="font-chalet-1960 mt-1 text-[16px] text-gray-800">
								{businessData.serviceArea}
							</div>
						</div>
					</div>
				</div>

				{/* Mobile-only sections in correct order */}
				<div className="md:hidden">
					<label className="font-chalet-1960 block text-[20px] text-gray-800">
						Email
					</label>
					<div className="mt-1 text-[16px] text-gray-800">
						{businessData.email}
					</div>
				</div>

				<div className="md:hidden">
					<label className="font-chalet-1960 block text-[20px] text-gray-800">
						Service Area <ServiceIcon className="inline" />
					</label>
					<div className="font-chalet-1960 mt-1 text-[16px] text-gray-800">
						{businessData.serviceArea}
					</div>
				</div>
			</div>

			{/* About */}
			<div className="mt-4 md:mt-6">
				<label className="font-chalet-1960 block text-[20px] text-gray-800">
					About
				</label>
				<div className="font-chalet-1960 mt-1 text-[16px] leading-relaxed text-gray-800">
					{businessData.about}
				</div>
			</div>

			{/* Speciality */}
			<div className="mt-4 md:mt-6">
				<label className="font-chalet-1960 mb-2 block text-[20px] text-gray-800">
					Speciality
				</label>
				<div className="flex flex-wrap gap-2">
					{businessData.specialities.map((speciality, index) => (
						<span
							key={index}
							className="font-chalet-1960 inline-flex items-center rounded-full border-1 bg-[#003BFF]/10 px-3 py-1 text-[14px] text-[#003BFF]"
						>
							{speciality}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
