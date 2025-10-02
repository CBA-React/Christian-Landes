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
	labelVariant?: 'form' | 'filter';
	inputIcon?: ReactNode;
}

export const Input = ({
	label,
	type = 'text',
	register,
	error,
	placeholder,
	labelIcon,
	labelVariant = 'form',
	inputIcon,
}: InputProps): JSX.Element => {
	const labelStyles = {
		form: 'flex items-center gap-2',
		filter: 'font-chalet-960 text-[18px] font-medium text-[#252525]',
	};

	return (
		<div className="flex flex-col gap-2.5 text-[#242424]">
			<label className={labelStyles[labelVariant]}>
				{label}
				{labelIcon && labelIcon}
			</label>
			<div className="relative w-full">
				<input
					type={type}
					placeholder={placeholder}
					className={`w-full border border-[#24242480] px-4 py-2.5 placeholder:text-[#24242480] focus:outline-none ${
						inputIcon ? 'pr-11' : ''
					}`}
					{...register}
				/>
				{inputIcon && (
					<div className="absolute top-1/2 right-3 -translate-y-1/2">
						{inputIcon}
					</div>
				)}
			</div>
			{error && (
				<p className="mt-1 text-sm text-red-500">{error.message}</p>
			)}
		</div>
	);
};
