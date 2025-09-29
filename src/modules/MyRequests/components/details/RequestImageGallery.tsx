import { JSX } from 'react';
import Image from 'next/image';

interface RequestImageGalleryProps {
	images: string[];
}

export const RequestImageGallery = ({
	images,
}: RequestImageGalleryProps): JSX.Element => {
	if (!images || images.length === 0) {
		return <></>;
	}

	const imageCount = images.length;

	if (imageCount === 1) {
		return (
			<div className="mb-8">
				<div className="relative h-[400px] w-full overflow-hidden rounded-lg">
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
						className="relative h-[400px] overflow-hidden rounded-lg"
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
				<div className="relative row-span-2 h-[400px] overflow-hidden rounded-lg">
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
						className="relative h-[192px] overflow-hidden rounded-lg"
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

	const mainImage = images[0];
	const thumbnails = images.slice(1, 5);
	const remainingCount = images.length - 5;

	return (
		<div className="mb-8 flex gap-4">
			<div className="relative h-[400px] w-[395px] flex-shrink-0 overflow-hidden rounded-lg">
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
						className="relative h-[192px] overflow-hidden rounded-lg"
					>
						<Image
							src={img}
							alt={`Project image ${idx + 2}`}
							fill
							className="object-cover"
						/>

						{idx === 3 && remainingCount > 0 && (
							<div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 to-transparent p-3">
								<button
									onClick={() =>
										console.log('View all photos')
									}
									className="flex items-center gap-1 rounded-md bg-white/90 px-3 py-1.5 text-sm font-medium text-[#242424] transition-all hover:bg-white"
								>
									<svg
										className="h-4 w-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
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
								className="h-[192px] rounded-lg bg-gray-100"
							/>
						),
					)}
			</div>
		</div>
	);
};
