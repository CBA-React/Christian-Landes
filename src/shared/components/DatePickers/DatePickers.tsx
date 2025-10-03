import React, { useState, useRef, useCallback, useMemo, useId } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Calendar from 'public/icons/profile/calendar.svg';
import { Button } from '../Button/Button';
import {
	useIsMobile,
	useClickOutside,
	useEscapeKey,
	useFocusTrap,
} from '../../hooks/useDatePicker';
import {
	formatDate,
	formatDateForAria,
	getDaysInMonth,
	getFirstDayOfMonth,
	isSameDate,
} from '../../lib/datePicker';
import { MONTHS, WEEKDAYS } from '../../constants/datePicker';
import type { DatePickerProps } from '../../types/datePicker';

export const DatePicker: React.FC<DatePickerProps> = ({
	label,
	value,
	onChange,
	placeholder = 'Select date',
	error,
	register,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null);
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [liveRegionMessage, setLiveRegionMessage] = useState('');

	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const isMobile = useIsMobile();

	const labelId = useId();
	const errorId = useId();
	const dialogId = useId();

	useClickOutside(containerRef, () => setIsOpen(false), isOpen);
	useEscapeKey(() => setIsOpen(false), isOpen);
	useFocusTrap(modalRef, isOpen && isMobile);

	const handleDateClick = useCallback(
		(day: number) => {
			const date = new Date(currentYear, currentMonth, day);
			setTempSelectedDate(date);
			setLiveRegionMessage(`Selected ${formatDateForAria(date)}`);

			if (isMobile) {
				setSelectedDate(date);
				onChange(formatDate(date));
				setIsOpen(false);
				setLiveRegionMessage('');
			}
		},
		[currentYear, currentMonth, isMobile, onChange],
	);

	const handleSetDate = useCallback(() => {
		if (tempSelectedDate) {
			setSelectedDate(tempSelectedDate);
			onChange(formatDate(tempSelectedDate));
			setIsOpen(false);
			setLiveRegionMessage('');
			inputRef.current?.focus();
		}
	}, [tempSelectedDate, onChange]);

	const handleCancel = useCallback(() => {
		setTempSelectedDate(null);
		setIsOpen(false);
		setLiveRegionMessage('');
		inputRef.current?.focus();
	}, []);

	const handlePrevMonth = useCallback(() => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear((prev) => prev - 1);
			setLiveRegionMessage(`December ${currentYear - 1}`);
		} else {
			setCurrentMonth((prev) => prev - 1);
			setLiveRegionMessage(`${MONTHS[currentMonth - 1]} ${currentYear}`);
		}
	}, [currentMonth, currentYear]);

	const handleNextMonth = useCallback(() => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear((prev) => prev + 1);
			setLiveRegionMessage(`January ${currentYear + 1}`);
		} else {
			setCurrentMonth((prev) => prev + 1);
			setLiveRegionMessage(`${MONTHS[currentMonth + 1]} ${currentYear}`);
		}
	}, [currentMonth, currentYear]);

	const renderDays = useMemo(() => {
		const daysInMonth = getDaysInMonth(currentYear, currentMonth);
		const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
		const days = [];
		const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

		for (let i = 0; i < adjustedFirstDay; i++) {
			days.push(
				<div
					key={`empty-${i}`}
					role="gridcell"
					aria-hidden="true"
					className="h-8"
				/>,
			);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(currentYear, currentMonth, day);
			const isSelected = isSameDate(tempSelectedDate, date);

			days.push(
				<div key={day} role="gridcell">
					<button
						type="button"
						onClick={() => handleDateClick(day)}
						aria-label={formatDateForAria(date)}
						aria-pressed={isSelected}
						className={`h-8 w-8 rounded-full text-[15px] font-normal transition-colors ${
							isSelected
								? 'bg-[#003BFF] font-medium text-white'
								: 'text-[#1F2937] hover:bg-gray-100'
						}`}
					>
						{day}
					</button>
				</div>,
			);
		}

		return days;
	}, [currentYear, currentMonth, tempSelectedDate, handleDateClick]);

	const renderDesktopCalendar = () => (
		<div
			ref={modalRef}
			role="dialog"
			aria-modal="true"
			aria-labelledby={dialogId}
			className="absolute border border-[#24242480] bg-white pt-4 shadow-lg"
			style={{
				pointerEvents: 'auto',
				top: inputRef.current
					? inputRef.current.getBoundingClientRect().bottom + 8
					: 0,
				left: inputRef.current
					? inputRef.current.getBoundingClientRect().left
					: 0,
				minWidth: '330px',
			}}
		>
			<h2 id={dialogId} className="sr-only">
				Select a date
			</h2>

			<div className="mb-2 flex items-center justify-between px-4">
				<button
					type="button"
					onClick={handlePrevMonth}
					aria-label="Previous month"
					className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#24242420] transition-colors hover:bg-gray-100"
				>
					<ChevronLeft
						className="h-5 w-5 text-gray-600"
						aria-hidden="true"
					/>
				</button>
				<span
					id={`${dialogId}-month-year`}
					className="text-[16px] text-[#242424]"
					aria-live="polite"
				>
					{MONTHS[currentMonth]} {currentYear}
				</span>
				<button
					type="button"
					onClick={handleNextMonth}
					aria-label="Next month"
					className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#24242420] transition-colors hover:bg-gray-100"
				>
					<ChevronRight
						className="h-5 w-5 text-gray-600"
						aria-hidden="true"
					/>
				</button>
			</div>

			<hr className="mb-2" />

			<div
				role="grid"
				aria-labelledby={`${dialogId}-month-year`}
				className="px-4"
			>
				<div className="mb-6 grid grid-cols-7 gap-1">
					{WEEKDAYS.map((day) => (
						<div
							key={day}
							role="columnheader"
							className="flex items-center justify-center text-[14px] font-medium text-[#3F3F46]"
						>
							<abbr title={day} aria-label={day}>
								{day}
							</abbr>
						</div>
					))}
				</div>

				<div className="grid grid-cols-7 gap-2">{renderDays}</div>
			</div>

			<div className="mt-4 flex justify-between gap-7 border-t-1 px-4 py-4">
				<div
					className="rounded-2xl border border-[#24242420] px-6 py-1"
					role="status"
					aria-label="Selected date"
				>
					<span className="text-[14px] font-medium text-gray-700">
						{tempSelectedDate
							? formatDate(tempSelectedDate).replace(/\//g, ' / ')
							: '-- / -- / ----'}
					</span>
				</div>
				<Button
					onClick={handleSetDate}
					variant="solid"
					color="dark"
					disabled={!tempSelectedDate}
					className="flex-1 !justify-center"
					aria-label="Confirm selected date"
				>
					Set Date
				</Button>
			</div>
		</div>
	);

	const renderMobileModal = () => (
		<div
			className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
			style={{
				backgroundColor: 'rgba(0, 0, 0, 0.4)',
				backdropFilter: 'blur(8px)',
				WebkitBackdropFilter: 'blur(8px)',
			}}
		>
			<div
				ref={modalRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={dialogId}
				className="mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-white"
				style={{ pointerEvents: 'auto' }}
			>
				<div className="flex items-center justify-between border-b border-[#24242420] p-4">
					<h3
						id={dialogId}
						className="text-[18px] font-medium text-[#242424]"
					>
						Select Date
					</h3>
					<button
						type="button"
						onClick={handleCancel}
						aria-label="Close date picker"
						className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
					>
						<X
							className="h-5 w-5 text-gray-600"
							aria-hidden="true"
						/>
					</button>
				</div>

				<div className="p-4">
					<div className="mb-4 flex items-center justify-between">
						<button
							type="button"
							onClick={handlePrevMonth}
							aria-label="Previous month"
							className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#24242420] transition-colors hover:bg-gray-100"
						>
							<ChevronLeft
								className="h-5 w-5 text-gray-600"
								aria-hidden="true"
							/>
						</button>
						<span
							className="text-[16px] font-medium text-[#242424]"
							id={`${dialogId}-month-year`}
							aria-live="polite"
						>
							{MONTHS[currentMonth]} {currentYear}
						</span>
						<button
							type="button"
							onClick={handleNextMonth}
							aria-label="Next month"
							className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#24242420] transition-colors hover:bg-gray-100"
						>
							<ChevronRight
								className="h-5 w-5 text-gray-600"
								aria-hidden="true"
							/>
						</button>
					</div>

					<div role="grid" aria-labelledby={`${dialogId}-month-year`}>
						<div className="mb-4 grid grid-cols-7 gap-1">
							{WEEKDAYS.map((day) => (
								<div
									key={day}
									role="columnheader"
									className="flex items-center justify-center text-[14px] font-medium text-[#3F3F46]"
								>
									<abbr title={day} aria-label={day}>
										{day}
									</abbr>
								</div>
							))}
						</div>

						<div className="grid grid-cols-7 gap-2">
							{renderDays}
						</div>
					</div>
				</div>

				<div className="border-t border-[#24242420] p-4">
					<div
						className="mb-3 rounded-2xl border border-[#24242420] px-4 py-2 text-center"
						role="status"
						aria-label="Selected date"
					>
						<span className="text-[14px] font-medium text-gray-700">
							{tempSelectedDate
								? formatDate(tempSelectedDate).replace(
										/\//g,
										' / ',
									)
								: '-- / -- / ----'}
						</span>
					</div>
					<Button
						onClick={handleSetDate}
						variant="solid"
						color="dark"
						disabled={!tempSelectedDate}
						className="w-full !justify-center"
						aria-label="Confirm selected date"
					>
						Set Date
					</Button>
				</div>
			</div>
		</div>
	);

	return (
		<div className="relative" ref={containerRef}>
			<label
				id={labelId}
				htmlFor={`datepicker-${labelId}`}
				className="mb-2.5 block text-[16px] text-[#242424]"
			>
				{label}
			</label>
			<div className="relative">
				<input
					id={`datepicker-${labelId}`}
					ref={inputRef}
					type="text"
					readOnly
					value={value}
					placeholder={placeholder}
					onClick={() => setIsOpen(!isOpen)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							setIsOpen(!isOpen);
						}
					}}
					aria-labelledby={labelId}
					aria-describedby={error ? errorId : undefined}
					aria-invalid={!!error}
					aria-expanded={isOpen}
					aria-haspopup="dialog"
					className={`w-full cursor-pointer border bg-white px-[16px] py-[10px] pr-10 text-[16px] text-[#242424] placeholder:text-[#24242480] focus:border-[#24242480] focus:outline-none ${
						error ? 'border-red-500' : 'border-[#24242480]'
					}`}
					{...register}
				/>
				<div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
					<Calendar aria-hidden="true" />
				</div>
			</div>
			{error?.message && (
				<p
					id={errorId}
					className="mt-1 text-[14px] text-red-600"
					role="alert"
				>
					{error.message}
				</p>
			)}

			<div
				role="status"
				aria-live="polite"
				aria-atomic="true"
				className="sr-only"
			>
				{liveRegionMessage}
			</div>

			{isOpen && (
				<div
					className="fixed inset-0 z-[10000]"
					style={{ pointerEvents: 'none' }}
				>
					{isMobile ? renderMobileModal() : renderDesktopCalendar()}
				</div>
			)}
		</div>
	);
};
