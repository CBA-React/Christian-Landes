import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

interface Option {
	value: string;
	label: string;
}

interface SelectProps {
	label: string;
	options: Option[];
	placeholder?: string;
	value?: string;
	onChange: (value: string) => void;
	error?: FieldError;
	labelIcon?: ReactNode;
	className?: string;
}

export const Select: React.FC<SelectProps> = ({
	label,
	options,
	placeholder = 'Select option',
	value,
	onChange,
	error,
	labelIcon,
	className = '',
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleOptionClick = (optionValue: string) => {
		onChange(optionValue);
		setIsOpen(false);
	};

	const selectedOption = options.find((option) => option.value === value);
	const displayText = selectedOption ? selectedOption.label : placeholder;

	return (
		<div className={`flex flex-col gap-2.5 text-[#252525] ${className}`}>
			<label className="font-chalet-1960 flex items-center gap-2 text-[18px]">
				{label}
				{labelIcon && labelIcon}
			</label>

			<div className="relative" ref={selectRef}>
				<div
					className={`flex w-full cursor-pointer items-center justify-between border border-[#24242480] px-4 py-2.5 focus:outline-none ${!value ? 'text-[#24242480]' : 'text-[#242424]'} `}
					onClick={() => setIsOpen(!isOpen)}
				>
					<span>{displayText}</span>

					<svg
						className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>

				{isOpen && (
					<div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-y-auto border border-[#24242480] bg-white">
						{options.map((option) => (
							<div
								key={option.value}
								className="cursor-pointer px-4 py-2.5 text-[#242424] hover:bg-gray-50"
								onClick={() => handleOptionClick(option.value)}
							>
								{option.label}
							</div>
						))}
					</div>
				)}
			</div>

			{error && (
				<p className="mt-1 text-sm text-red-500">{error.message}</p>
			)}
		</div>
	);
};
