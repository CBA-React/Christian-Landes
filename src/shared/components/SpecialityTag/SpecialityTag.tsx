import { JSX, ReactNode } from 'react';

interface SpecialityTagProps {
	children: ReactNode;
	onRemove?: () => void;
	variant?: 'readonly' | 'removable';
	size?: 'sm' | 'md';
}

export const SpecialityTag = ({
	children,
	onRemove,
	variant = 'readonly',
	size = 'md',
}: SpecialityTagProps): JSX.Element => {
	const sizeClasses = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-3 py-1 text-sm',
	};

	return (
		<span
			className={`font-chalet-1960 inline-flex items-center gap-2 rounded-full border border-[#003BFF] bg-[#003BFF]/10 text-[#003BFF] ${sizeClasses[size]} ${variant === 'removable' ? 'w-full sm:w-auto' : ''}`}
		>
			<span className="flex-1">{children}</span>
			{variant === 'removable' && onRemove && (
				<button
					type="button"
					onClick={onRemove}
					className="flex items-center rounded-full hover:bg-[#003BFF]/20"
					aria-label={`Remove ${children}`}
				>
					<svg
						className="h-3 w-3"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			)}
		</span>
	);
};
