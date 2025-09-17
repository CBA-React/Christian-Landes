'use client';

import { JSX } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { UpdateProfileFormData } from '../types';
import ServiceIcon from 'public/icons/profile/service.svg';
import { Input } from '@/shared/components/Input/Input';

interface BasicInfoProps {
	register: UseFormRegister<UpdateProfileFormData>;
	errors: FieldErrors<UpdateProfileFormData>;
	isContractor: boolean;
	disabled?: boolean;
}

export const BasicInfo = ({
	register,
	errors,
	isContractor,
}: BasicInfoProps): JSX.Element => {
	return (
		<div className="space-y-4 md:space-y-5">
			{/* Name and Phone */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
				<Input
					label={isContractor ? 'Business Name' : 'Full Name'}
					placeholder={`Enter your ${isContractor ? 'business' : 'full'} name`}
					register={register('fullName')}
					error={errors.fullName}
				/>

				<Input
					type="tel"
					label="Phone"
					placeholder="(555) 123-4567"
					register={register('phone')}
					error={errors.phone}
				/>
			</div>

			{/* Email and Location */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
				<Input
					type="email"
					label="Email"
					placeholder={
						isContractor
							? 'business@example.com'
							: 'your@example.com'
					}
					register={register('email')}
					error={errors.email}
				/>

				<Input
					label={isContractor ? 'Service Area' : 'Location'}
					placeholder="Enter your location"
					labelIcon={
						isContractor ? (
							<ServiceIcon className="h-4 w-4" />
						) : undefined
					}
					register={register('location')}
					error={errors.location}
				/>
			</div>
		</div>
	);
};
