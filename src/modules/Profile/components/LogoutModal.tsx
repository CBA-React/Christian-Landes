'use client';

import { JSX, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClose } from '@/modules/admin/hooks/useOutsideClose';

type Props = {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
};

export function LogoutModal({
	open,
	onClose,
	onConfirm,
}: Props): JSX.Element | null {
	const modalRef = useOutsideClose<HTMLDivElement>(() => onClose());
	const previousActiveElement = useRef<HTMLElement | null>(null);
	const confirmButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return;

		previousActiveElement.current = document.activeElement as HTMLElement;

		const originalOverflow = document.body.style.overflow;
		const originalPaddingRight = document.body.style.paddingRight;
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;

		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		setTimeout(() => {
			confirmButtonRef.current?.focus();
		}, 0);

		const onKey = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', onKey);

		return (): void => {
			document.body.style.overflow = originalOverflow;
			document.body.style.paddingRight = originalPaddingRight;
			document.removeEventListener('keydown', onKey);

			previousActiveElement.current?.focus();
		};
	}, [open, onClose]);

	if (!open) return null;

	const modalContent = (
		<div
			className="fixed inset-0 z-[100000] flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="logout-title"
			aria-describedby="logout-description"
		>
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
				aria-hidden="true"
				tabIndex={-1}
			/>

			<div
				ref={modalRef}
				className="relative z-[100001] w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
			>
				<button
					type="button"
					onClick={onClose}
					aria-label="Close dialog"
					className="absolute top-4 right-4 text-[24px] leading-none text-[#242424]/50 transition-colors hover:text-[#242424]"
				>
					×
				</button>

				<h2
					id="logout-title"
					className="mb-2 text-center text-[24px] font-semibold text-[#242424]"
				>
					Log out of your account?
				</h2>

				<p
					id="logout-description"
					className="mb-6 text-center text-[16px] text-[#242424]/70"
				>
					Are you sure you want to log out? You'll need to sign in
					again to access your account.
				</p>

				<div className="flex flex-col gap-3">
					<button
						ref={confirmButtonRef}
						type="button"
						onClick={onConfirm}
						className="h-12 w-full rounded-lg bg-[#FF4242] px-6 text-[16px] font-medium text-white transition-all hover:bg-[#FF4242]/90"
					>
						Log Out
					</button>
					<button
						type="button"
						onClick={onClose}
						className="h-12 w-full rounded-lg border-2 border-[#242424]/10 bg-white px-6 text-[16px] font-medium text-[#242424] transition-all hover:border-[#242424]/20 hover:bg-[#242424]/5"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);

	return createPortal(modalContent, document.body);
}
