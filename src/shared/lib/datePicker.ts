import { MONTHS } from '../constants/datePicker';

export const getDaysInMonth = (year: number, month: number): number => {
	return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
	return new Date(year, month, 1).getDay();
};

export const formatDate = (date: Date): string => {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
};

export const formatDateForAria = (date: Date | undefined): string => {
	if (!date) return '';
	const day = date.getDate();
	const month = MONTHS[date.getMonth()];
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
};

export const isSameDate = (date1: Date | null, date2: Date | null): boolean => {
	if (!date1 || !date2) return false;
	return (
		date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	);
};
