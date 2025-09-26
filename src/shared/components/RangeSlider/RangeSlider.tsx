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
		((value - min) / (max - min)) * 100;
	const getValueFromPosition = (position: number) => {
		const percentage = position / SLIDER_WIDTH;
		return Math.round(min + percentage * (max - min));
	};

	const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
		e.preventDefault();
		setIsDragging(type);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging || !sliderRef.current) return;

		const rect = sliderRef.current.getBoundingClientRect();
		const position = Math.max(
			0,
			Math.min(SLIDER_WIDTH, e.clientX - rect.left),
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

	const handleMouseUp = () => {
		setIsDragging(null);
	};

	useEffect(() => {
		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};
		}
	}, [isDragging, minValue, maxValue]);

	const minPosition = (getPercentage(minValue) / 100) * SLIDER_WIDTH;
	const maxPosition = (getPercentage(maxValue) / 100) * SLIDER_WIDTH;

	return (
		<div className={`space-y-4 ${className}`}>
			{label && (
				<h3 className="text-base font-normal text-[#252525]">
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
						className="absolute bg-[#F0F0F0]"
						style={{
							top: (THUMB_SIZE - 6) / 2,
							left: THUMB_SIZE / 2,
							width: SLIDER_WIDTH - THUMB_SIZE,
							height: 6,
						}}
					/>

					<div
						className="absolute bg-[#252525]"
						style={{
							top: (THUMB_SIZE - 6) / 2,
							left: THUMB_SIZE / 2 + minPosition,
							width: maxPosition - minPosition,
							height: 6,
						}}
					/>

					<div
						className="absolute cursor-pointer rounded-full bg-[#252525] transition-colors hover:bg-[#252525]"
						style={{
							width: THUMB_SIZE,
							height: THUMB_SIZE,
							left: minPosition,
							top: 0,
						}}
						onMouseDown={handleMouseDown('min')}
					/>

					<div
						className="absolute cursor-pointer rounded-full bg-[#252525] transition-colors hover:bg-[#252525]"
						style={{
							width: THUMB_SIZE,
							height: THUMB_SIZE,
							left: maxPosition,
							top: 0,
						}}
						onMouseDown={handleMouseDown('max')}
					/>
				</div>

				<div className="mt-4 flex justify-between">
					<span className="text-base text-[#252525]">
						{formatValue(minValue)}
					</span>
					<span className="text-base text-[#252525]">
						{formatValue(maxValue)}
					</span>
				</div>
			</div>
		</div>
	);
};
