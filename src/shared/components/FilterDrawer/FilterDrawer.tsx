import React, { useEffect, ReactNode } from 'react';

interface DrawerProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children?: ReactNode;
}

export const FilterDrawer: React.FC<DrawerProps> = ({
	isOpen,
	onClose,
	title = 'Filter',
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
				className={`fixed top-0 right-0 z-10000 h-full transform bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full md:w-80 md:rounded-l-2xl md:shadow-lg`}
			>
				<div className="flex h-full flex-col">
					<div className="flex-shrink-0 p-8 pb-4">
						<button
							onClick={onClose}
							className="absolute top-5 right-7 rounded-full p-2"
						>
							<svg
								className="h-5 w-5"
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
						<div className="flex items-center justify-between p-2">
							<h2 className="text-[36px] font-medium">{title}</h2>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto px-8 pb-6">
						{children}
					</div>
				</div>
			</div>
		</>
	);
};
