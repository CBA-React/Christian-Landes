import React from 'react';

interface CheckboxProps {
	checked: boolean;
	onChange: () => void;
	className?: string;
	disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
	checked,
	onChange,
	className = '',
	disabled = false,
}) => {
	return (
		<input
			type="checkbox"
			className={`h-4 w-4 rounded-[20px] border-neutral-300 accent-[#003BFF] ${className}`}
			checked={checked}
			onChange={onChange}
			disabled={disabled}
		/>
	);
};
