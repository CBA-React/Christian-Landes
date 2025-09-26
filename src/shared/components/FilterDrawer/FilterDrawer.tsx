import React, { useEffect, ReactNode } from 'react';

interface DrawerProps {
	isOpen: boolean;
	onClose: () => void;
	children?: ReactNode;
}

export const FilterDrawer: React.FC<DrawerProps> = ({
	isOpen,
	onClose,
	children,
}) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<>
			<div
				className="fixed inset-0 z-10000 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>

			<div
				className={`fixed top-0 right-0 z-10000 h-full transform bg-white transition-transform duration-300 ease-in-out sm:!w-[410px] ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full sm:rounded-l-2xl sm:shadow-lg`}
				style={{
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
				}}
			>
				<style jsx>{`
					div::-webkit-scrollbar {
						display: none; /* Chrome, Safari and Opera */
					}
				`}</style>

				<button
					onClick={onClose}
					className="absolute top-6 right-5 z-10 cursor-pointer rounded-full p-2 sm:right-7"
				>
					<svg
						className="h-6 w-6"
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
				<div className="flex h-full flex-col">{children}</div>
			</div>
		</>
	);
};
