import React, { JSX } from 'react';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface Props {
	label: string;
	id: string;
	placeholder: string;
	isTextArea?: boolean;
	error?: FieldError;
	register: UseFormRegisterReturn;
}

export const ContactInput = ({
	label,
	id,
	placeholder,
	isTextArea = false,
	error,
	register,
}: Props): JSX.Element => {
	return (
		<div className="relative mb-[19px] flex flex-col gap-[8px] text-[#242424] lg:mb-5">
			<label htmlFor={id}>{label}</label>
			{isTextArea ? (
				<textarea
					id={id}
					placeholder={placeholder}
					className="mb-1 h-[97px] w-full border border-[#24242480] px-[16px] py-[3px] placeholder:text-[#24242480] focus:outline-none lg:mb-3"
					{...register}
				/>
			) : (
				<input
					type="text"
					id={id}
					placeholder={placeholder}
					className="h-[45px] w-full border border-[#24242480] px-[15px] py-[6px] placeholder:text-[#24242480] focus:outline-none"
					{...register}
				/>
			)}
			{error && (
				<p className="mt-1 text-sm text-red-500">{error.message}</p>
			)}
		</div>
	);
};

