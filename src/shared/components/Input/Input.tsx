'use client';

import { JSX, ReactNode } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
	label: string;
	type?: string;
	register: UseFormRegisterReturn;
	error?: FieldError;
	placeholder?: string;
	labelIcon?: ReactNode;
}

export const Input = ({
	label,
	type = 'text',
	register,
	error,
	placeholder,
	labelIcon,
}: InputProps): JSX.Element => {
	return (
		<div className="flex flex-col gap-2.5 text-[#242424]">
			<label className="flex items-center gap-2">
				{label}
				{labelIcon && labelIcon}
			</label>
			<input
				type={type}
				placeholder={placeholder}
				className="w-full border border-[#24242480] px-4 py-2.5 placeholder:text-[#24242480] focus:outline-none"
				{...register}
			/>
			{error && (
				<p className="mt-1 text-sm text-red-500">{error.message}</p>
			)}
		</div>
	);
};
