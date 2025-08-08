import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

type ButtonCfg = {
    label: string;
    href: string;
    className?: string;
    color?: 'dark' | 'primary';
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
            className={`p-10 ${bgClass} max-w-[400px] w-full rounded-[10px] flex flex-col gap-6 h-max ${selfClass} ${className}`}
        >
            <div>
                <h3
                    id={id}
                    className={`text-[32px] font-[500] mb-4 leading-[100%] tracking-[-1px] ${textClass}`}
                >
                    {title}
                </h3>

                <div
                    className={`flex gap-3 items-end ${textClass}`}
                    aria-label="Price"
                >
                    <span className="text-[64px] font-[700] leading-[100%] tracking-[-1px]">
                        {price}
                    </span>
                    <span className="text-[20px] font-[500] opacity-90">
                        {period}
                    </span>
                </div>
            </div>

            <hr className={`w-full h-[1px] border-0 ${dividerClass}`} />

            <ul
                className={`text-[16px] font-[400] ${textClass}`}
                aria-label="Plan features"
            >
                {features.map((f, i) => (
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

            <Link
                href={button.href}
                aria-label={button.label}
                className="w-full"
            >
                <Button
                    type="button"
                    variant="solid"
                    color={button.color ?? 'dark'}
                    className={`!h-[43px] !px-6 !py-3 !w-full justify-center !text-[20px] !font-[400] ${button.className ?? ''}`}
                >
                    {button.label}
                </Button>
            </Link>
        </article>
    );
};
