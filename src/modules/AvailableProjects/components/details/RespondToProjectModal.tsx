import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { RespondToProjectForm } from './RespondToProjectForm';

interface RespondToProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	projectId: string;
	onSuccess?: () => void;
}

export const RespondToProjectModal: React.FC<
	RespondToProjectModalProps
> = ({ isOpen, onClose, projectId, onSuccess }) => {
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
				className="relative z-10 max-h-[90vh] w-full max-w-[750px] overflow-y-auto rounded-2xl bg-white shadow-xl"
				role="dialog"
				aria-modal="true"
				aria-labelledby="respond-modal-title"
			>
				<div className="sticky top-0 z-20 bg-white p-8 pb-6">
					<button
						onClick={onClose}
						className="absolute top-6 right-6 text-[#24242480] transition-colors hover:text-[#242424]"
						type="button"
						aria-label="Close modal"
					>
						<X className="h-6 w-6" />
					</button>
					<h2
						id="respond-modal-title"
						className="font-chalet-1960 mb-2 text-[36px] tracking-[-1px] text-[#242424] md:text-[40px]"
					>
						Respond to Project with Your Offer
					</h2>
					<p className="font-chalet-1960 text-[16px] leading-relaxed text-[#242424]/70">
						Let the client know you're interested in the job and
						propose your own terms.
					</p>
				</div>

				<div className="px-8 pb-8">
					<RespondToProjectForm
						projectId={projectId}
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