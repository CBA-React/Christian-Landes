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
}

export const LogoSection = ({
	currentImage,
	onImageChange,
	onError,
	disabled = false,
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
		if (!disabled) {
			fileInputRef.current?.click();
		}
	};

	return (
		<div className="flex flex-row items-center gap-6 lg:flex-col">
			<div className="relative lg:mb-4">
				<div className="relative h-20 w-20 overflow-hidden rounded-[10px] lg:h-[171px] lg:w-[171px]">
					<Image
						src={currentImage}
						alt="Profile picture"
						fill
						className="object-cover"
					/>
				</div>
			</div>

			<Button
				type="button"
				onClick={triggerFileInput}
				disabled={disabled}
				variant="ghost"
				color="primary"
				icon={<UploadIcon className="h-5 w-5" />}
				iconPosition="left"
				className="text-[16px] text-[#242424] hover:text-[#003BFF] disabled:opacity-50"
			>
				Upload new photo
			</Button>

			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleImageUpload}
				className="hidden"
				disabled={disabled}
			/>
		</div>
	);
};