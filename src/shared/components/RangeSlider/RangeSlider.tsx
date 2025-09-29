import React, { useState, useRef, useEffect } from 'react';

interface RangeSliderProps {
	min: number;
	max: number;
	minValue: number;
	maxValue: number;
	onChange: (minValue: number, maxValue: number) => void;
	label?: string;
	className?: string;
	formatValue?: (value: number) => string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
	min,
	max,
	minValue,
	maxValue,
	onChange,
	label,
	className = '',
	formatValue = (value) => `$${value.toLocaleString()}`,
}) => {
	const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
	const sliderRef = useRef<HTMLDivElement>(null);
	const SLIDER_WIDTH = 247;
	const THUMB_SIZE = 20;

	const getPercentage = (value: number) =>
		Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

	const getValueFromPosition = (position: number) => {
		const trackWidth = SLIDER_WIDTH - THUMB_SIZE;
		const percentage = Math.max(0, Math.min(1, position / trackWidth));
		return Math.round(min + percentage * (max - min));
	};

	const getClientX = (e: MouseEvent | TouchEvent): number => {
		if ('touches' in e) {
			return e.touches[0]?.clientX || e.changedTouches[0]?.clientX || 0;
		}
		return e.clientX;
	};

	const handleStart =
		(type: 'min' | 'max') => (e: React.MouseEvent | React.TouchEvent) => {
			e.preventDefault();
			setIsDragging(type);
		};

	const handleMove = (e: MouseEvent | TouchEvent) => {
		if (!isDragging || !sliderRef.current) return;

		const rect = sliderRef.current.getBoundingClientRect();
		const clientX = getClientX(e);

		const position = Math.max(
			0,
			Math.min(
				SLIDER_WIDTH - THUMB_SIZE,
				clientX - rect.left - THUMB_SIZE / 2,
			),
		);

		const newValue = getValueFromPosition(position);

		if (isDragging === 'min') {
			const newMinValue = Math.max(min, Math.min(newValue, maxValue));
			onChange(newMinValue, maxValue);
		} else {
			const newMaxValue = Math.min(max, Math.max(newValue, minValue));
			onChange(minValue, newMaxValue);
		}
	};

	const handleEnd = () => {
		setIsDragging(null);
	};

	useEffect(() => {
		if (isDragging) {
			document.addEventListener('mousemove', handleMove);
			document.addEventListener('mouseup', handleEnd);

			document.addEventListener('touchmove', handleMove, {
				passive: false,
			});
			document.addEventListener('touchend', handleEnd);

			return () => {
				document.removeEventListener('mousemove', handleMove);
				document.removeEventListener('mouseup', handleEnd);
				document.removeEventListener('touchmove', handleMove);
				document.removeEventListener('touchend', handleEnd);
			};
		}
	}, [isDragging, minValue, maxValue]);

	const trackWidth = SLIDER_WIDTH - THUMB_SIZE;
	const minPosition = (getPercentage(minValue) / 100) * trackWidth;
	const maxPosition = (getPercentage(maxValue) / 100) * trackWidth;

	const getTextPosition = (thumbPosition: number, isMin: boolean) => {
		const textWidth = 80;
		const halfTextWidth = textWidth / 2;
		const thumbCenter = thumbPosition + THUMB_SIZE / 2;

		const minLeft = 0;
		const maxLeft = SLIDER_WIDTH - halfTextWidth;

		return (
			Math.max(minLeft, Math.min(maxLeft, thumbCenter)) - halfTextWidth
		);
	};

	return (
		<div className={`space-y-5 ${className}`}>
			{label && (
				<h3 className="font-chalet-1960 text-Ñ…18px font-medium text-[#252525]">
					{label}
				</h3>
			)}

			<div className="relative">
				<div
					ref={sliderRef}
					className="relative"
					style={{ width: SLIDER_WIDTH, height: THUMB_SIZE }}
				>
					<div
						className="absolute rounded-full bg-[#F0F0F0]"
						style={{
							top: (THUMB_SIZE - 6) / 2,
							left: THUMB_SIZE / 2,
							width: SLIDER_WIDTH - THUMB_SIZE,
							height: 6,
						}}
					/>

					<div
						className="absolute rounded-full bg-[#252525]"
						style={{
							top: (THUMB_SIZE - 6) / 2,
							left: THUMB_SIZE / 2 + minPosition,
							width: maxPosition - minPosition,
							height: 6,
						}}
					/>

					<div
						className="absolute cursor-pointer rounded-full bg-[#252525] transition-colors select-none hover:bg-[#404040]"
						style={{
							width: THUMB_SIZE,
							height: THUMB_SIZE,
							left: minPosition,
							top: 0,
							touchAction: 'none',
						}}
						onMouseDown={handleStart('min')}
						onTouchStart={handleStart('min')}
					/>

					<div
						className="absolute cursor-pointer rounded-full bg-[#252525] transition-colors select-none hover:bg-[#404040]"
						style={{
							width: THUMB_SIZE,
							height: THUMB_SIZE,
							left: maxPosition,
							top: 0,
							touchAction: 'none',
						}}
						onMouseDown={handleStart('max')}
						onTouchStart={handleStart('max')}
					/>
				</div>

				<div className="relative mt-4" style={{ height: '20px' }}>
					<span
						className="absolute text-base text-[#252525] transition-all duration-150 ease-out select-none"
						style={{
							left: getTextPosition(minPosition, true),
							width: '80px',
							textAlign: 'center',
						}}
					>
						{formatValue(minValue)}
					</span>

					<span
						className="absolute text-base text-[#252525] transition-all duration-150 ease-out select-none"
						style={{
							left: getTextPosition(maxPosition, false),
							width: '80px',
							textAlign: 'center',
						}}
					>
						{formatValue(maxValue)}
					</span>
				</div>
			</div>
		</div>
	);
};
