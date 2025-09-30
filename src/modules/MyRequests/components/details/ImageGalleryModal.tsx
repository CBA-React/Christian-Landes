import { JSX, useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageGalleryModalProps {
	images: string[];
	isOpen: boolean;
	onClose: () => void;
}

export const ImageGalleryModal = ({
	images,
	isOpen,
	onClose,
}: ImageGalleryModalProps): JSX.Element | null => {
	const [currentIndex, setCurrentIndex] = useState(0);

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
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isOpen) return;

			if (e.key === 'Escape') {
				onClose();
			} else if (e.key === 'ArrowLeft') {
				handlePrevious();
			} else if (e.key === 'ArrowRight') {
				handleNext();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, currentIndex]);

	if (!isOpen) return null;

	const handlePrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
			onClick={handleBackdropClick}
		>
			<button
				onClick={onClose}
				className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
				aria-label="Close"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>

			<div className="absolute top-4 left-4 z-10 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
				{currentIndex + 1} / {images.length}
			</div>

			<div className="relative h-[80vh] w-[90vw] max-w-6xl">
				<Image
					src={images[currentIndex]}
					alt={`Image ${currentIndex + 1}`}
					fill
					className="object-contain"
					priority
				/>
			</div>

			{images.length > 1 && (
				<>
					<button
						onClick={handlePrevious}
						className="absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
						aria-label="Previous image"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="15 18 9 12 15 6" />
						</svg>
					</button>

					<button
						onClick={handleNext}
						className="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
						aria-label="Next image"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="9 18 15 12 9 6" />
						</svg>
					</button>
				</>
			)}

			<div className="absolute bottom-4 left-1/2 z-10 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-lg bg-black/50 p-2">
				{images.map((img, idx) => (
					<button
						key={idx}
						onClick={() => setCurrentIndex(idx)}
						className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded transition-all ${
							idx === currentIndex
								? 'ring-2 ring-white'
								: 'opacity-60 hover:opacity-100'
						}`}
					>
						<Image
							src={img}
							alt={`Thumbnail ${idx + 1}`}
							fill
							className="object-cover"
						/>
					</button>
				))}
			</div>
		</div>
	);
};
