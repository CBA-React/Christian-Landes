import { JSX } from 'react';

export const EyeOpen = ({
	className = 'w-6 h-6 text-black',
}: {
	className?: string;
}): JSX.Element => (
	<svg
		viewBox="0 0 28 28"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<path
			d="M1.10541 13.2854C4.785 7.854 9.32104 4.96457 14.0142 4.96457C18.7074 4.96457 23.2434 7.854 26.923 13.2854C26.977 13.363 26.977 13.4767 26.923 13.5543C23.2434 18.9857 18.7074 21.8751 14.0142 21.8751C9.32104 21.8751 4.785 18.9857 1.10541 13.5543C1.05138 13.4767 1.05138 13.363 1.10541 13.2854Z"
			stroke="currentColor"
			strokeWidth="2"
		/>
		<circle
			cx="14"
			cy="13.58"
			r="3.5"
			stroke="currentColor"
			strokeWidth="2"
		/>
	</svg>
);
