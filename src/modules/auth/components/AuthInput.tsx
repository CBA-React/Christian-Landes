'use client';

import { JSX } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface AuthInputProps {
	label: string;
	type?: string;
	register: UseFormRegisterReturn;
	error?: FieldError;
	placeholder?: string;
}

export const AuthInput = ({
	label,
	type = 'text',
	register,
	error,
	placeholder,
}: AuthInputProps): JSX.Element => {
	return (
		<div className="flex flex-col gap-[6px] text-[#242424]">
			<label>{label}</label>
			<input
				type={type}
				placeholder={placeholder}
				className={`w-full border border-[#242424] p-2 focus:outline-none`}
				{...register}
			/>
			{error && <p className="text-sm text-red-500">{error.message}</p>}
		</div>
	);
};
