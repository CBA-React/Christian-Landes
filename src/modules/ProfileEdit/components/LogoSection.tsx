'use client';

import { JSX, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/components/Button/Button';
import UploadIcon from 'public/icons/profile/upload.svg';

interface LogoSectionProps {
	currentImage: string;
	onImageChange?: (file: File) => void;
	onError?: (error: string) => void;
	disabled?: boolean;
	isUploading?: boolean;
}

export const LogoSection = ({
	currentImage,
	onImageChange,
	onError,
	disabled = false,
	isUploading = false,
}: LogoSectionProps): JSX.Element => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (file.size > 5 * 1024 * 1024) {
			onError?.('Image size should be less than 5MB');
			return;
		}

		if (!file.type.startsWith('image/')) {
			onError?.('Please select a valid image file');
			return;
		}

		onImageChange?.(file);
	};

	const triggerFileInput = () => {
		if (!disabled && !isUploading) {
			fileInputRef.current?.click();
		}
	};

	const isButtonDisabled = disabled || isUploading;

	return (
		<div className="flex flex-row gap-4 lg:flex-col lg:gap-2">
			<div className="relative lg:mb-4">
				<div className="relative h-20 w-20 overflow-hidden rounded-[10px] lg:h-[171px] lg:w-[171px]">
					<Image
						src={currentImage || '/images/Profile/mock-avatar.jpg'}
						alt="Profile picture"
						fill
						className={`object-cover transition-opacity ${
							isUploading ? 'opacity-70' : 'opacity-100'
						}`}
					/>
				</div>
			</div>
			<div className="flex flex-row items-center">
				<UploadIcon className="h-5 w-5" />
				<Button
					type="button"
					onClick={triggerFileInput}
					disabled={isButtonDisabled}
					variant="ghost"
					color="light"
					iconPosition="left"
					className={`!justify-between text-[16px] transition-colors ${
						isButtonDisabled
							? 'cursor-not-allowed opacity-50'
							: 'text-[#242424]'
					}`}
				>
					{isUploading ? 'Uploading...' : 'Upload new photo'}
				</Button>

				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					className="hidden"
					disabled={isButtonDisabled}
				/>
			</div>
		</div>
	);
};
