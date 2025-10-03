import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface DatePickerProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	error?: FieldError;
	register?: UseFormRegisterReturn;
}

export interface DateRangePickerProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	error?: FieldError;
	register?: UseFormRegisterReturn;
}

export interface CalendarDay {
	type: 'day' | 'empty';
	day?: number;
	date?: Date;
	selected?: 'start' | 'end' | false;
	inRange?: boolean;
	key: string | number;
}
