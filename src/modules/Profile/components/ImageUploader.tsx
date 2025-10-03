import React, { useState, useRef } from 'react';
import type { UploadedFile } from '@/shared/types/upload';
import ImagesIcon from 'public/icons/profile/Images-drop.svg';

interface ImageUploaderProps {
	images: UploadedFile[];
	onUpload: (file: File) => Promise<void>;
	onRemove: (id: number) => void;
	isUploading: boolean;
	maxImages?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
	images,
	onUpload,
	onRemove,
	isUploading,
	maxImages = 10,
}) => {
	const [dragActive, setDragActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = async (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const file = e.dataTransfer.files[0];
			if (file.type.startsWith('image/')) {
				await onUpload(file);
			}
		}
	};

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			await onUpload(e.target.files[0]);
		}
	};

	const canAddMore = images.length < maxImages;

	return (
		<div className="space-y-3">
			{canAddMore && (
				<div
					className={`relative rounded-lg px-6 py-2 text-center transition-colors ${
						dragActive ? 'bg-blue-50' : ''
					}`}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
				>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/jpeg,image/jpg,image/png"
						onChange={handleChange}
						className="hidden"
						disabled={isUploading || !canAddMore}
					/>

					<div className="flex flex-col items-center gap-1">
						<ImagesIcon />
						<div className="text-sm">
							<button
								type="button"
								onClick={() => fileInputRef.current?.click()}
								className="font-medium text-[#003BFF] hover:text-[#0031CC]"
								disabled={isUploading || !canAddMore}
							>
								Click to upload
							</button>
							<span className="font-medium text-[#242424]">
								{' '}
								or drag and drop
							</span>
						</div>
						<p className="text-xs text-[#242424]/50">
							JPG, JPEG, PNG less than 5MB
						</p>
					</div>

					{isUploading && (
						<div className="bg-opacity-75 absolute inset-0 flex items-center justify-center rounded-lg bg-white">
							<div className="text-sm text-[#242424]">
								Uploading...
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
