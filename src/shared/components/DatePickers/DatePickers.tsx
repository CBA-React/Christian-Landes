import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useMemo,
	useId,
} from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Calendar from 'public/icons/profile/calendar.svg';
import { Button } from '../Button/Button';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

// UTILITY FUNCTIONS

const getDaysInMonth = (year: number, month: number): number => {
	return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
	return new Date(year, month, 1).getDay();
};

const formatDate = (date: Date): string => {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
};

const formatDateForAria = (date: Date | undefined): string => {
	if (!date) return '';
	const day = date.getDate();
	const month = MONTHS[date.getMonth()];
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
};

const isSameDate = (date1: Date | null, date2: Date | null): boolean => {
	if (!date1 || !date2) return false;
	return (
		date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	);
};

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
] as const;

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;
const MOBILE_BREAKPOINT = 1600;

// CUSTOM HOOKS

const useIsMobile = (): boolean => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkDevice = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);
		return () => window.removeEventListener('resize', checkDevice);
	}, []);

	return isMobile;
};

const useClickOutside = (
	ref: React.RefObject<HTMLElement | null>,
	handler: () => void,
	enabled: boolean = true,
) => {
	useEffect(() => {
		if (!enabled) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [ref, handler, enabled]);
};

const useEscapeKey = (handler: () => void, enabled: boolean = true) => {
	useEffect(() => {
		if (!enabled) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handler();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [handler, enabled]);
};

const useFocusTrap = (
	ref: React.RefObject<HTMLElement | null>,
	enabled: boolean = true,
) => {
	useEffect(() => {
		if (!enabled || !ref.current) return;

		const element = ref.current;
		const focusableElements = element.querySelectorAll<HTMLElement>(
			'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
		);

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		const handleTab = (event: KeyboardEvent) => {
			if (event.key !== 'Tab') return;

			if (event.shiftKey) {
				if (document.activeElement === firstElement) {
					event.preventDefault();
					lastElement?.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					event.preventDefault();
					firstElement?.focus();
				}
			}
		};

		element.addEventListener('keydown', handleTab);
		firstElement?.focus();

		return () => {
			element.removeEventListener('keydown', handleTab);
		};
	}, [ref, enabled]);
};

// TYPES

interface DatePickerProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	error?: FieldError;
	register?: UseFormRegisterReturn;
}

interface DateRangePickerProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	error?: FieldError;
	register?: UseFormRegisterReturn;
}

// DATE PICKER COMPONENT

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

// DATE RANGE PICKER COMPONENT

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
	label,
	value,
	onChange,
	placeholder = 'Select date range',
	error,
	register,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [nextMonth, setNextMonth] = useState(
		(new Date().getMonth() + 1) % 12,
	);
	const [nextYear, setNextYear] = useState(
		new Date().getMonth() === 11
			? new Date().getFullYear() + 1
			: new Date().getFullYear(),
	);
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
		(day: number, month: number, year: number) => {
			const clickedDate = new Date(year, month, day);

			if (!startDate || (startDate && endDate)) {
				setStartDate(clickedDate);
				setEndDate(null);
				setLiveRegionMessage(
					`Start date selected: ${formatDateForAria(clickedDate)}`,
				);
			} else if (clickedDate < startDate) {
				setStartDate(clickedDate);
				setLiveRegionMessage(
					`Start date changed to: ${formatDateForAria(clickedDate)}`,
				);
			} else {
				setEndDate(clickedDate);
				setLiveRegionMessage(
					`End date selected: ${formatDateForAria(clickedDate)}`,
				);
			}
		},
		[startDate, endDate],
	);

	const handleSetDate = useCallback(() => {
		if (startDate && endDate) {
			const rangeText = `${formatDate(startDate)} - ${formatDate(endDate)}`;
			onChange(rangeText);
			setIsOpen(false);
			setLiveRegionMessage('');
			inputRef.current?.focus();
		}
	}, [startDate, endDate, onChange]);

	const handleCancel = useCallback(() => {
		setStartDate(null);
		setEndDate(null);
		setIsOpen(false);
		setLiveRegionMessage('');
		inputRef.current?.focus();
	}, []);

	const isDateSelected = useCallback(
		(day: number, month: number, year: number): 'start' | 'end' | false => {
			const date = new Date(year, month, day);
			if (isSameDate(startDate, date)) return 'start';
			if (isSameDate(endDate, date)) return 'end';
			return false;
		},
		[startDate, endDate],
	);

	const handlePrevMonthFirst = useCallback(() => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear((prev) => prev - 1);
		} else {
			setCurrentMonth((prev) => prev - 1);
		}
	}, [currentMonth]);

	const handleNextMonthFirst = useCallback(() => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear((prev) => prev + 1);
		} else {
			setCurrentMonth((prev) => prev + 1);
		}
	}, [currentMonth]);

	const handlePrevMonthSecond = useCallback(() => {
		if (nextMonth === 0) {
			setNextMonth(11);
			setNextYear((prev) => prev - 1);
		} else {
			setNextMonth((prev) => prev - 1);
		}
	}, [nextMonth]);

	const handleNextMonthSecond = useCallback(() => {
		if (nextMonth === 11) {
			setNextMonth(0);
			setNextYear((prev) => prev + 1);
		} else {
			setNextMonth((prev) => prev + 1);
		}
	}, [nextMonth]);

	const isDateInRange = useCallback(
		(day: number, month: number, year: number): boolean => {
			if (!startDate || !endDate) return false;
			const date = new Date(year, month, day);
			return date > startDate && date < endDate;
		},
		[startDate, endDate],
	);

	const renderCalendar = useCallback(
		(month: number, year: number) => {
			const daysInMonth = getDaysInMonth(year, month);
			const firstDay = getFirstDayOfMonth(year, month);
			const days = [];
			const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

			for (let i = 0; i < adjustedFirstDay; i++) {
				days.push({
					type: 'empty',
					key: `empty-${i}`,
				});
			}

			for (let day = 1; day <= daysInMonth; day++) {
				const date = new Date(year, month, day);
				const selected = isDateSelected(day, month, year);
				const inRange = isDateInRange(day, month, year);

				days.push({
					type: 'day',
					day,
					date,
					selected,
					inRange,
					key: day,
				});
			}

			return days.map((item, index) => {
				if (item.type === 'empty') {
					return (
						<div
							key={item.key}
							role="gridcell"
							aria-hidden="true"
							className="h-8"
						/>
					);
				}

				const { day, date, selected, inRange } = item;
				const col = (index % 7) + 1;

				return (
					<div
						key={item.key}
						role="gridcell"
						className="relative flex h-8 items-center justify-center"
						style={{ gridColumn: col }}
					>
						{(inRange || selected) && (
							<>
								<div
									className="absolute inset-y-0 bg-[#E0EBFF]"
									style={{
										left:
											selected === 'start' ? '50%' : '0',
										right: selected === 'end' ? '50%' : '0',
									}}
									aria-hidden="true"
								/>
							</>
						)}

						<button
							type="button"
							onClick={() => {
								if (day !== undefined) {
									handleDateClick(day, month, year);
								}
							}}
							aria-label={formatDateForAria(date)}
							aria-pressed={!!selected}
							className={`relative z-10 h-8 w-8 rounded-full text-[15px] font-normal transition-colors ${
								selected === 'start' || selected === 'end'
									? 'bg-[#003BFF] font-medium text-white'
									: inRange
										? 'text-[#1F2937]'
										: 'text-[#1F2937] hover:bg-gray-100'
							}`}
						>
							{day}
						</button>
					</div>
				);
			});
		},
		[isDateSelected, isDateInRange, handleDateClick],
	);

	const renderDesktopCalendar = () => (
		<div
			ref={modalRef}
			role="dialog"
			aria-modal="true"
			aria-labelledby={dialogId}
			className="absolute border border-[#24242480] bg-white shadow-lg"
			style={{
				pointerEvents: 'auto',
				top: inputRef.current
					? inputRef.current.getBoundingClientRect().bottom + 8
					: 0,
				right: inputRef.current
					? window.innerWidth -
						inputRef.current.getBoundingClientRect().right
					: 0,
			}}
		>
			<h2 id={dialogId} className="sr-only">
				Select a date range
			</h2>

			<div className="flex">
				{/* First Calendar */}
				<div className="overflow-hidden" style={{ width: '300px' }}>
					<div className="mb-2 flex items-center justify-between px-4 pt-4">
						<button
							type="button"
							onClick={handlePrevMonthFirst}
							aria-label="Previous month for first calendar"
							className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#24242420] transition-colors hover:bg-gray-100"
						>
							<ChevronLeft
								className="h-5 w-5 text-gray-600"
								aria-hidden="true"
							/>
						</button>
						<span
							className="flex-1 overflow-hidden px-2 text-center text-[16px] text-ellipsis whitespace-nowrap text-[#242424]"
							id={`${dialogId}-first-month`}
							aria-live="polite"
						>
							{MONTHS[currentMonth]} {currentYear}
						</span>
						<button
							type="button"
							onClick={handleNextMonthFirst}
							aria-label="Next month for first calendar"
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
						aria-labelledby={`${dialogId}-first-month`}
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

						<div className="grid grid-cols-7 gap-y-2">
							{renderCalendar(currentMonth, currentYear)}
						</div>
					</div>
				</div>

				<div className="w-px bg-[#24242420]" aria-hidden="true" />

				{/* Second Calendar */}
				<div className="overflow-hidden" style={{ width: '300px' }}>
					<div className="mb-2 flex items-center justify-between px-4 pt-4">
						<button
							type="button"
							onClick={handlePrevMonthSecond}
							aria-label="Previous month for second calendar"
							className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#24242420] transition-colors hover:bg-gray-100"
						>
							<ChevronLeft
								className="h-5 w-5 text-gray-600"
								aria-hidden="true"
							/>
						</button>
						<span
							className="flex-1 overflow-hidden px-2 text-center text-[16px] text-ellipsis whitespace-nowrap text-[#242424]"
							id={`${dialogId}-second-month`}
							aria-live="polite"
						>
							{MONTHS[nextMonth]} {nextYear}
						</span>
						<button
							type="button"
							onClick={handleNextMonthSecond}
							aria-label="Next month for second calendar"
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
						aria-labelledby={`${dialogId}-second-month`}
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

						<div className="grid grid-cols-7 gap-y-2 pb-4">
							{renderCalendar(nextMonth, nextYear)}
						</div>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between gap-4 border-t border-[#24242420] p-4">
				<div className="flex items-center gap-3">
					<div
						className="flex items-center gap-2 rounded-2xl border border-[#24242420] px-3 py-1"
						role="status"
						aria-label="Start date"
					>
						<span className="text-[14px] font-medium whitespace-nowrap text-gray-700">
							{startDate
								? formatDate(startDate).replace(/\//g, ' / ')
								: '-- / -- / ----'}
						</span>
					</div>
					<span
						className="text-[14px] text-[#242424]"
						aria-hidden="true"
					>
						To
					</span>
					<div
						className="flex items-center gap-2 rounded-2xl border border-[#24242420] px-3 py-1"
						role="status"
						aria-label="End date"
					>
						<span className="text-[14px] font-medium whitespace-nowrap text-gray-700">
							{endDate
								? formatDate(endDate).replace(/\//g, ' / ')
								: '-- / -- / ----'}
						</span>
					</div>
				</div>
				<div className="flex gap-5">
					<Button
						onClick={handleCancel}
						variant="solid"
						color="light"
						className="!w-[120px] !justify-center"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSetDate}
						variant="solid"
						color="dark"
						disabled={!startDate || !endDate}
						className="!w-[120px] !justify-center"
						aria-label="Confirm selected date range"
					>
						Set Date
					</Button>
				</div>
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
						Select Date Range
					</h3>
					<button
						type="button"
						onClick={handleCancel}
						aria-label="Close date range picker"
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
							onClick={handlePrevMonthFirst}
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
							onClick={handleNextMonthFirst}
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

						<div className="grid grid-cols-7 gap-y-2">
							{renderCalendar(currentMonth, currentYear)}
						</div>
					</div>
				</div>

				<div className="border-t border-[#24242420] p-4">
					<div className="mb-4 flex flex-col gap-3">
						<div className="flex items-center justify-between">
							<span className="text-[14px] text-[#242424]">
								From:
							</span>
							<div
								className="rounded-2xl border border-[#24242420] px-3 py-1"
								role="status"
								aria-label="Start date"
							>
								<span className="text-[14px] font-medium text-gray-700">
									{startDate
										? formatDate(startDate).replace(
												/\//g,
												' / ',
											)
										: '-- / -- / ----'}
								</span>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-[14px] text-[#242424]">
								To:
							</span>
							<div
								className="rounded-2xl border border-[#24242420] px-3 py-1"
								role="status"
								aria-label="End date"
							>
								<span className="text-[14px] font-medium text-gray-700">
									{endDate
										? formatDate(endDate).replace(
												/\//g,
												' / ',
											)
										: '-- / -- / ----'}
								</span>
							</div>
						</div>
					</div>

					<div className="flex gap-3">
						<Button
							onClick={handleCancel}
							variant="solid"
							color="light"
							className="flex-1 !justify-center"
						>
							Cancel
						</Button>
						<Button
							onClick={handleSetDate}
							variant="solid"
							color="dark"
							disabled={!startDate || !endDate}
							className="flex-1 !justify-center"
							aria-label="Confirm selected date range"
						>
							Set Date
						</Button>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="relative" ref={containerRef}>
			<label
				id={labelId}
				htmlFor={`daterangepicker-${labelId}`}
				className="mb-2.5 block text-[16px] text-[#242424]"
			>
				{label}
			</label>
			<div className="relative">
				<input
					id={`daterangepicker-${labelId}`}
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
					className={`w-full cursor-pointer border bg-white px-[16px] py-[10px] pr-10 text-[16px] text-[#242424] placeholder:text-[#24242480] focus:border-[#242424] focus:outline-none ${
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
