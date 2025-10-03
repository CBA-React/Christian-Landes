import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { CreateRequestForm } from './CreateRequestForm';

interface CreateRequestModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: () => void;
}

export const CreateRequestModal: React.FC<CreateRequestModalProps> = ({
	isOpen,
	onClose,
	onSuccess,
}) => {
	useEffect(() => {
		if (!isOpen) return;

		const originalOverflow = document.body.style.overflow;
		const originalPaddingRight = document.body.style.paddingRight;
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;

		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.body.style.overflow = originalOverflow;
			document.body.style.paddingRight = originalPaddingRight;
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-black/40 backdrop-blur-sm"
				onClick={onClose}
				aria-hidden="true"
			/>

			<div
				className="relative z-10 max-h-[90vh] w-full max-w-[1100px] overflow-y-auto rounded-2xl bg-white shadow-xl"
				role="dialog"
				aria-modal="true"
				aria-labelledby="create-request-modal-title"
			>
				<div className="sticky top-0 z-20 bg-white p-10 pb-6">
					<button
						onClick={onClose}
						className="absolute top-6 right-6 text-[#24242480] transition-colors hover:text-[#242424]"
						type="button"
						aria-label="Close modal"
					>
						<X className="h-6 w-6" />
					</button>
					<h2
						id="create-request-modal-title"
						className="font-chalet-1960 mb-2 text-[40px] tracking-[-1px] text-[#242424]"
					>
						Create Your Project Request
					</h2>
					<p className="font-chalet-1960 text-[16px] leading-relaxed text-[#242424]/50">
						Tell us what you need done, where, and when. Upload
						photos so pros can see the job. Add a budget range if
						you have one. We only share your exact address after you
						hire a contractor.
					</p>
				</div>

				<div className="px-10 pb-10">
					<CreateRequestForm
						onSuccess={() => {
							onClose();
							onSuccess?.();
						}}
						onCancel={onClose}
					/>
				</div>
			</div>
		</div>
	);
};
