import React from 'react';
import StarActive from 'public/icons/profile/star-active.svg';
import StarDisable from 'public/icons/profile/star-disable.svg';

interface StarRatingProps {
	value: number;
	onChange: (rating: number) => void;
	readonly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
	value,
	onChange,
	readonly = false,
}) => {
	const [hoverValue, setHoverValue] = React.useState<number | null>(null);

	const handleClick = (rating: number) => {
		if (!readonly) {
			onChange(rating);
		}
	};

	const handleMouseEnter = (rating: number) => {
		if (!readonly) {
			setHoverValue(rating);
		}
	};

	const handleMouseLeave = () => {
		if (!readonly) {
			setHoverValue(null);
		}
	};

	const displayValue = hoverValue !== null ? hoverValue : value;

	return (
		<div className="flex items-center justify-center gap-2 py-2">
			{[1, 2, 3, 4, 5].map((star) => (
				<button
					key={star}
					type="button"
					onClick={() => handleClick(star)}
					onMouseEnter={() => handleMouseEnter(star)}
					onMouseLeave={handleMouseLeave}
					disabled={readonly}
					className={`flex items-center justify-center transition-all ${
						readonly ? 'cursor-default' : 'cursor-pointer'
					} ${!readonly && 'hover:scale-110'}`}
				>
					{star <= displayValue ? <StarActive /> : <StarDisable />}
				</button>
			))}
		</div>
	);
};
