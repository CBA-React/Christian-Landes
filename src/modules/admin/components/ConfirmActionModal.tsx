'use client';

import { JSX, useEffect } from 'react';

import { useOutsideClose } from '@/modules/admin/hooks/useOutsideClose';

type Variant = 'logout' | 'delete';

type Props = {
	open: boolean;
	variant: Variant;
	onClose: () => void;
	onConfirm: () => void;
};

const COPY: Record<
	Variant,
	{ title: string; text: string; cta: string; ctaClass: string }
> = {
	logout: {
		title: 'Log out of your account?',
		text: "Are you sure you want to log out? You'll need to sign in again to access your account.",
		cta: 'Log Out',
		ctaClass: 'bg-[#003BFF] text-white hover:opacity-90',
	},
	delete: {
		title: 'Delete your account?',
		text: 'This action cannot be undone. All your data and settings will be permanently removed.',
		cta: 'Delete Account',
		ctaClass: 'bg-[#FF6B6B] text-white hover:opacity-90',
	},
};

export function ConfirmActionModal({
	open,
	variant,
	onClose,
	onConfirm,
}: Props): JSX.Element | null {
	const ref = useOutsideClose<HTMLDivElement>(() => onClose());

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent): false | void =>
			e.key === 'Escape' && onClose();
		document.addEventListener('keydown', onKey);
		return (): void => document.removeEventListener('keydown', onKey);
	}, [open, onClose]);

	if (!open) return null;
	const c = COPY[variant];

	return (
		<div
			className="fixed inset-0 z-[200] flex w-full items-start justify-center overflow-y-auto p-4 sm:p-6"
			role="dialog"
			aria-modal="true"
			aria-labelledby="confirm-title"
		>
			<div
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
				aria-hidden="true"
			/>
			<div
				ref={ref}
				className="relative z-[201] w-full max-w-[335px] rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/10 sm:p-6"
			>
				<button
					onClick={onClose}
					aria-label="Close"
					className="absolute top-3 right-3 cursor-pointer rounded-full p-1 px-2 text-[#242424] hover:bg-neutral-100"
				>
					✕
				</button>

				<h3
					id="confirm-title"
					className="font-chalet-1960 mb-2 text-center text-[24px] font-medium sm:text-[28px]"
				>
					{variant === 'logout' ? (
						<>
							Log out
							<br className="hidden sm:block" />
							of your account?
						</>
					) : (
						<>
							Delete
							<br className="hidden sm:block" />
							your account?
						</>
					)}
				</h3>

				<p className="mx-auto mb-5 max-w-[340px] text-center text-sm text-[#242424] sm:text-base">
					{c.text}
				</p>

				<div className="grid gap-2">
					<button
						onClick={onConfirm}
						className={`h-11 rounded-full px-6 text-sm font-medium shadow-sm ${c.ctaClass}`}
					>
						{c.cta}
					</button>
					<button
						onClick={onClose}
						className="h-11 rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium hover:bg-neutral-50"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
