import { JSX, useState } from 'react';
import Image from 'next/image';

import Menu from 'public/icons/profile/fe_app-menu.svg';
import { ImageGalleryModal } from './ImageGalleryModal';

interface RequestImageGalleryProps {
	images: string[];
}

export const RequestImageGallery = ({
	images,
}: RequestImageGalleryProps): JSX.Element => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	if (!images || images.length === 0) {
		return <></>;
	}

	const imageCount = images.length;

	if (imageCount === 1) {
		return (
			<div className="mb-8">
				<div className="relative h-[608px] w-full overflow-hidden">
					<Image
						src={images[0]}
						alt="Project image"
						fill
						className="object-cover"
						priority
					/>
				</div>
			</div>
		);
	}

	if (imageCount === 2) {
		return (
			<div className="mb-8 grid grid-cols-2 gap-4">
				{images.map((img, idx) => (
					<div
						key={idx}
						className="relative h-[600px] overflow-hidden"
					>
						<Image
							src={img}
							alt={`Project image ${idx + 1}`}
							fill
							className="object-cover"
							priority={idx === 0}
						/>
					</div>
				))}
			</div>
		);
	}

	if (imageCount === 3) {
		return (
			<div className="mb-8 grid grid-cols-2 gap-4">
				<div className="relative row-span-2 h-[600px] overflow-hidden">
					<Image
						src={images[0]}
						alt="Main project image"
						fill
						className="object-cover"
						priority
					/>
				</div>

				{images.slice(1, 3).map((img, idx) => (
					<div
						key={idx}
						className="relative h-[290px] overflow-hidden"
					>
						<Image
							src={img}
							alt={`Project image ${idx + 2}`}
							fill
							className="object-cover"
						/>
					</div>
				))}
			</div>
		);
	}

	if (imageCount === 4) {
		return (
			<div className="mb-8 flex gap-4">
				<div className="relative h-[600px] w-[600px] flex-shrink-0 overflow-hidden">
					<Image
						src={images[0]}
						alt="Main project image"
						fill
						className="object-cover"
						priority
					/>
				</div>

				<div className="grid flex-1 grid-cols-2 grid-rows-2 gap-4">
					{images.slice(1, 3).map((img, idx) => (
						<div
							key={idx}
							className="relative h-[292px] overflow-hidden"
						>
							<Image
								src={img}
								alt={`Project image ${idx + 2}`}
								fill
								className="object-cover"
							/>
						</div>
					))}

					<div className="relative col-span-2 h-[292px] overflow-hidden">
						<Image
							src={images[3]}
							alt="Project image 4"
							fill
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		);
	}

	const mainImage = images[0];
	const thumbnails = images.slice(1, 5);
	const remainingCount = images.length - 5;

	return (
		<>
			<div className="mb-8 flex gap-4">
				<div className="relative h-[600px] w-[600px] flex-shrink-0 overflow-hidden">
					<Image
						src={mainImage}
						alt="Main project image"
						fill
						className="object-cover"
						priority
					/>
				</div>

				<div className="grid flex-1 grid-cols-2 grid-rows-2 gap-4">
					{thumbnails.map((img, idx) => (
						<div
							key={idx}
							className="relative h-[292px] overflow-hidden"
						>
							<Image
								src={img}
								alt={`Project image ${idx + 2}`}
								fill
								className="object-cover"
							/>

							{idx === 3 && remainingCount > 0 && (
								<div className="absolute right-3 bottom-3">
									<button
										onClick={() => setIsModalOpen(true)}
										className="flex items-center gap-1 bg-white px-3 py-1.5 text-sm font-medium text-[#242424] transition-all hover:bg-gray-100"
									>
										<Menu />
										All Photos
									</button>
								</div>
							)}
						</div>
					))}

					{thumbnails.length < 4 &&
						Array.from({ length: 4 - thumbnails.length }).map(
							(_, idx) => (
								<div
									key={`empty-${idx}`}
									className="h-[192px] bg-gray-100"
								/>
							),
						)}
				</div>
			</div>

			<ImageGalleryModal
				images={images}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};
