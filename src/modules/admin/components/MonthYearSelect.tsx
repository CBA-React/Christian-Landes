'use client';
import { JSX } from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { MONTHS } from '../contants';

type Props = {
	month: number;
	year: number;
	now: Date;
	setMonth: (m: number) => void;
	setYear: (y: number) => void;
	yearsSpan?: number;
};

export function MonthYearSelect({
	month,
	year,
	now,
	setMonth,
	setYear,
	yearsSpan = 2,
}: Props): JSX.Element {
	const years = Array.from(
		{ length: yearsSpan * 2 + 1 },
		(_, i) => now.getFullYear() - yearsSpan + i,
	);
	const val = `${year}-${String(month).padStart(2, '0')}`;

	return (
		<Select
			value={val}
			onValueChange={(v) => {
				const [y, m] = v.split('-').map(Number);
				setYear(y);
				setMonth(m);
			}}
		>
			<SelectTrigger className="h-8 w-[102px] rounded-lg border border-[#D5D5D5] bg-[#F8FAFA] px-1 text-[14px] text-[#888888]">
				<SelectValue placeholder={month} />
			</SelectTrigger>

			<SelectContent className="max-h-60 overflow-y-auto">
				{years.map((y) =>
					MONTHS.map((name, idx) => {
						const m = idx + 1;
						const value = `${y}-${String(m).padStart(2, '0')}`;
						return (
							<SelectItem
								key={value}
								value={value}
								className="text-xs"
							>
								{name} {y}
							</SelectItem>
						);
					}),
				)}
			</SelectContent>
		</Select>
	);
}
