import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { UploadApi } from '@/shared/api/UploadApi';
import type { UploadedFile, UploadFileParams } from '@/shared/types/upload';

interface UseFileUploadOptions {
	onSuccess?: (uploadedFile: UploadedFile, file: File) => void;
	onError?: (error: string) => void;
	validateFile?: boolean;
}

export function useFileUpload({
	onSuccess,
	onError,
	validateFile = true,
}: UseFileUploadOptions = {}): {
	uploadFile: (file: File, type?: UploadFileParams['type']) => Promise<void>;
	previewUrl: string | null;
	clearPreview: () => void;
	isUploading: boolean;
	uploadError: any;
	uploadedFile: UploadedFile | undefined;
	reset: () => void;
} {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const uploadMutation = useMutation({
		mutationFn: (params: UploadFileParams) => UploadApi.uploadFile(params),
		onSuccess: (uploadedFile, variables) => {
			onSuccess?.(uploadedFile, variables.file);
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message ||
				error?.message ||
				'Upload failed';
			onError?.(errorMessage);
		},
	});

	const uploadFile = async (
		file: File,
		type: UploadFileParams['type'] = 'image',
	): Promise<void> => {
		if (validateFile && type === 'logo') {
			const validation = UploadApi.validateImageFile(file);
			if (!validation.isValid) {
				onError?.(validation.error || 'Invalid file');
				return;
			}
		}

		if (file.type.startsWith('image/')) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		}

		await uploadMutation.mutateAsync({ file, type });
	};

	const clearPreview = (): void => {
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
	};

	return {
		uploadFile,
		previewUrl,
		clearPreview,
		isUploading: uploadMutation.isPending,
		uploadError: uploadMutation.error,
		uploadedFile: uploadMutation.data,
		reset: (): void => {
			uploadMutation.reset();
			clearPreview();
		},
	};
}
