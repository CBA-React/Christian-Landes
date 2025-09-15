import { Dispatch, JSX, SetStateAction } from 'react';
import { Inter } from 'next/font/google';

import { MonthYearSelect } from './MonthYearSelect';
const inter = Inter({ subsets: ['latin'] });

function formatNumber(n: number): string {
	return new Intl.NumberFormat().format(n);
}

export function StatCard({
	title,
	value,
	previous,
	delta,
	compareLabel,
	isLoading,
	month,
	setMonth,
	setYear,
	year,
	now,
}: {
	title: string;
	value: number | null;
	previous?: number | null;
	delta: number | null;
	compareLabel: string;
	isLoading?: boolean;
	month: number;
	setMonth: Dispatch<SetStateAction<number>>;
	setYear: Dispatch<SetStateAction<number>>;
	year: number;
	now: Date;
}): JSX.Element {
	const current = value ?? 0;
	const prev = previous ?? 0;
	const up = current >= prev;

	const pct =
		delta ??
		(prev === 0
			? current === 0
				? 0
				: 100
			: ((current - prev) / Math.abs(prev)) * 100);

	const pctText = `${Math.abs(Math.round(pct * 10) / 10)}% `;

	return (
		<div className="w-full max-w-[358px] min-w-[308px] rounded-2xl bg-white p-5 shadow-sm">
			<div className="mb-2 flex items-center justify-between">
				<h3 className="font-chalet-1960 text-[14px] font-medium xl:text-base">
					{title}
				</h3>

				<MonthYearSelect
					month={month}
					year={year}
					now={now}
					setMonth={setMonth}
					setYear={setYear}
				/>
			</div>

			<div
				className={`mb-3 text-[48px] leading-[58px] font-medium xl:mb-5 ${inter.className}`}
			>
				{isLoading ? '—' : value !== null ? formatNumber(value) : '0'}
			</div>

			<div className="flex items-center gap-2 border-t border-[#33344442] pt-[18px] text-[16px] xl:text-[18px]">
				{up ? (
					<svg
						width="28"
						height="28"
						viewBox="0 0 28 28"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M18.6693 7L21.3409 9.67167L15.6476 15.365L10.9809 10.6983L2.33594 19.355L3.98094 21L10.9809 14L15.6476 18.6667L22.9976 11.3283L25.6693 14V7H18.6693Z"
							fill="#00B69B"
						/>
					</svg>
				) : (
					<svg
						width="28"
						height="28"
						viewBox="0 0 28 28"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M18.6693 21L21.3409 18.3283L15.6476 12.635L10.9809 17.3017L2.33594 8.645L3.98094 7L10.9809 14L15.6476 9.33333L22.9976 16.6717L25.6693 14V21H18.6693Z"
							fill="#FF4A4D"
						/>
					</svg>
				)}

				<span className="font-chalet-1960 text-[18px] font-medium">
					<span className={up ? 'text-[#00B69B]' : 'text-[#FF4A4D]'}>
						{isLoading ? '— ' : pctText}
					</span>
					{up ? 'Up from ' : 'Drop from '}
					{compareLabel}
				</span>
			</div>
		</div>
	);
}
