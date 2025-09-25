import { ReactNode, JSX, forwardRef, useState, useEffect } from 'react';
import { FieldError } from 'react-hook-form';

interface FormFieldProps {
	label: string;
	error?: FieldError;
	required?: boolean;
	labelIcon?: ReactNode;
	children: React.ReactNode;
	className?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	labelIcon?: ReactNode;
	error?: FieldError;
	required?: boolean;
}

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	labelIcon?: ReactNode;
	error?: FieldError;
	required?: boolean;
	showCharCount?: boolean;
	maxCharCount?: number;
	currentValue?: string;
}

export const FormField = ({
	label,
	labelIcon,
	error,
	children,
	className = 'space-y-2',
}: FormFieldProps): JSX.Element => {
	return (
		<div className={className}>
			<label className="flex items-center gap-2 font-medium text-[#242424] md:text-base">
				{label}
				{labelIcon && labelIcon}
			</label>
			{children}
			{error && <p className="text-sm text-red-600">{error.message}</p>}
		</div>
	);
};

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
	({ label, labelIcon, error, required, className, ...props }, ref) => {
		return (
			<FormField
				label={label}
				labelIcon={labelIcon}
				error={error}
				required={required}
			>
				<input
					ref={ref}
					className={`mt-2 h-12 w-full border border-[#242424]/50 px-3 outline-none focus:border-[#003BFF] ${className}`}
					{...props}
				/>
			</FormField>
		);
	},
);

FormInput.displayName = 'FormInput';

export const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{
			label,
			error,
			required,
			className,
			showCharCount,
			maxCharCount,
			currentValue,
			...props
		},
		ref,
	) => {
		const [charCount, setCharCount] = useState(0);

		useEffect(() => {
			const value = currentValue || '';
			setCharCount(value.length);
		}, [currentValue]);

		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setCharCount(e.target.value.length);
			if (props.onChange) {
				props.onChange(e);
			}
		};

		return (
			<FormField label={label} error={error} required={required}>
				<textarea
					ref={ref}
					className={`mt-2 w-full resize-none border border-[#242424]/50 px-3 py-3 outline-none focus:border-[#003BFF] ${className}`}
					{...props}
					onChange={handleChange}
				/>
				{showCharCount && maxCharCount && (
					<div className="text-right text-sm text-[#242424]/50">
						{charCount}/{maxCharCount}
					</div>
				)}
			</FormField>
		);
	},
);

FormTextarea.displayName = 'FormTextarea';
