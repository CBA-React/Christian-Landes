'use client';

import { JSX } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormInput } from './FormField';
import { UpdateProfileFormData } from '../types';
import ServiceIcon from 'public/icons/profile/service.svg';

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
	disabled = false,
}: BasicInfoProps): JSX.Element => {
	return (
		<div className="space-y-4 md:space-y-5">
			{/* Name and Phone */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
				<FormInput
					{...register('fullName')}
					label={isContractor ? 'Business Name' : 'Full Name'}
					placeholder={`Enter your ${isContractor ? 'business' : 'full'} name`}
					error={errors.fullName}
					required
					disabled={disabled}
				/>

				<FormInput
					{...register('phone')}
					type="tel"
					label="Phone"
					placeholder="(555) 123-4567"
					error={errors.phone}
					required
					disabled={disabled}
				/>
			</div>

			{/* Email and Location */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
				<FormInput
					{...register('email')}
					type="email"
					label="Email"
					placeholder={isContractor ? 'business@example.com' : 'your@example.com'}
					error={errors.email}
					required
					disabled={disabled}
				/>

				<FormInput
					{...register('location')}
					label={isContractor ? 'Service Area' : 'Location'}
					placeholder="Enter your location"
					labelIcon={isContractor ? <ServiceIcon className="h-4 w-4" /> : undefined}
					error={errors.location}
					required
					disabled={disabled}
				/>
			</div>
		</div>
	);
};