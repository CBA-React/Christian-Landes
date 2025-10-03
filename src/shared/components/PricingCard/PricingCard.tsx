import Image from 'next/image';

import { cn } from '@/lib/utils';

type ButtonCfg = {
	label: string;
	href?: string;
	color: 'primary' | 'dark';
	className?: string;
	onClick?: () => void;
};

type PricingCardProps = {
	id?: string;
	title: string;
	price: string;
	period?: string;
	features: string[];

	bgClass?: string;
	textClass?: string;
	checkIconSrc?: string;
	alignSelf?: 'start' | 'center' | 'end';
	dividerClass?: string;

	button: ButtonCfg;
	className?: string;
	footerNote?: string;
};

export const PricingCard: React.FC<PricingCardProps> = ({
	id,
	title,
	price,
	period = 'per month',
	features,
	bgClass = 'bg-[#F1F3F6]',
	textClass = 'text-[#242424]',
	checkIconSrc = '/icons/symbols_check-black.svg',
	alignSelf = 'start',
	dividerClass = 'bg-[#2424241A]',
	button,
	footerNote,
	className = '',
}) => {
	const selfClass =
		alignSelf === 'end'
			? 'self-end'
			: alignSelf === 'center'
				? 'self-center'
				: 'self-start';

	return (
		<article
			aria-labelledby={id}
			className={`mx-auto p-[24px] md:p-10 lg:mx-0 ${bgClass} flex h-full w-full max-w-[400px] flex-col gap-6 rounded-[10px] md:gap-7 ${selfClass} ${className}`}
		>
			<div>
				<h3
					id={id}
					className={`mb-[16px] text-[24px] leading-[120%] font-[400] md:mb-6 md:text-[32px] md:leading-[120%] md:font-[500] md:tracking-[-1px] ${textClass}`}
				>
					{title}
				</h3>

				<div
					className={`flex items-end gap-3 ${textClass}`}
					aria-label="Price"
				>
					<span className="text-[48px] leading-[100%] font-[700] tracking-[-1px] xl:text-[64px]">
						{price}
					</span>
					<span className="text-[16px] font-[500] opacity-90 md:text-[20px]">
						{period}
					</span>
				</div>
			</div>

			<hr className={`h-[1px] w-full border-0 ${dividerClass}`} />

			<ul
				className={`space-y-1 text-[16px] font-[400] ${textClass}`}
				aria-label="Plan features"
			>
				{features?.map((f, i) => (
					<li key={i} className="flex items-start gap-2">
						<Image
							src={checkIconSrc}
							alt=""
							aria-hidden="true"
							width={24}
							height={24}
						/>
						<span>{f}</span>
					</li>
				))}
			</ul>

			{button ? (
				button.onClick ? (
					<button
						type="button"
						onClick={button.onClick}
						disabled={!button.onClick}
						className={cn(
							'btn-base',
							button.className,
							!button.onClick && 'cursor-not-allowed opacity-60',
						)}
					>
						{button.label}
					</button>
				) : (
					<a
						href={button.href}
						className={`btn ${button.color === 'primary' ? 'btn-primary' : 'btn-dark'} ${button.className ?? ''}`}
					>
						{button.label}
					</a>
				)
			) : null}

			{footerNote ? (
				<div className="mt-3 rounded-md bg-black/5 px-3 py-2 text-center text-sm opacity-80">
					{footerNote}
				</div>
			) : null}
		</article>
	);
};
