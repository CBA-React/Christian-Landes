import { JSX } from 'react';
import { Button } from '@/shared/components/Button/Button';

interface ProfileFormActionsProps {
	onCancel: () => void;
	isSubmitting: boolean;
	isPending?: boolean;
	disabled?: boolean;
	saveText?: string;
	cancelText?: string;
	isImageUploading?: boolean;
}

export const ProfileFormActions = ({
	onCancel,
	isSubmitting,
	isPending = false,
	disabled = false,
	saveText = 'Save',
	cancelText = 'Cancel',
	isImageUploading = false,
}: ProfileFormActionsProps): JSX.Element => {
	const isLoading = isSubmitting || isPending || isImageUploading;

	const getSaveButtonText = () => {
		if (isImageUploading) return 'Uploading...';
		if (isSubmitting || isPending) return 'Saving...';
		return saveText;
	};

	return (
		<div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:justify-between md:gap-4">
			<Button
				type="button"
				onClick={onCancel}
				disabled={disabled || isLoading}
				variant="outline"
				color="dark"
				className="order-2 h-12 w-full justify-center md:order-1 md:h-[43px] md:w-[155px]"
			>
				{cancelText}
			</Button>

			<Button
				type="submit"
				disabled={disabled || isLoading}
				variant="solid"
				color="primary"
				className="order-1 h-12 w-full justify-center md:order-2 md:h-[43px] md:w-[155px]"
			>
				{getSaveButtonText()}
			</Button>
		</div>
	);
};
