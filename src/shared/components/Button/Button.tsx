import { JSX, ReactNode } from 'react';

type Variant = 'solid' | 'outline' | 'ghost';
type Color = 'primary' | 'dark' | 'light';
type IconPosition = 'left' | 'right';

interface ButtonProps {
    children: ReactNode;
    icon?: ReactNode;
    iconPosition?: IconPosition;
    onClick?: () => void;
    className?: string;
    variant?: Variant;
    color?: Color;
    type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
    children,
    icon,
    iconPosition = 'left',
    onClick,
    className = '',
    variant = 'solid',
    color = 'primary',
    type = 'button',
}: ButtonProps): JSX.Element => {
    const baseStyles =
        'flex flex-row items-center cursor-pointer gap-[5px] rounded-full px-[14px] py-2 font-medium transition-all text-[16px] leading-[100%] tracking-normal align-middle';

    const variantColorStyles: Record<Variant, Record<Color, string>> = {
        solid: {
            primary: 'bg-blue-600 text-white hover:bg-blue-700',
            dark: 'bg-black text-white hover:bg-zinc-800',
            light: 'bg-zinc-100 text-black hover:bg-zinc-200',
        },
        outline: {
            primary: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
            dark: 'border border-black text-black hover:bg-zinc-100',
            light: 'border border-zinc-300 text-zinc-600 hover:bg-zinc-100',
        },
        ghost: {
            primary: 'text-blue-600 hover:bg-blue-50',
            dark: 'text-black hover:bg-zinc-100',
            light: 'text-zinc-600 hover:bg-zinc-100',
        },
    };

    const finalClass = `${baseStyles} ${variantColorStyles[variant][color]} ${className}`;

    return (
        <button className={finalClass} onClick={onClick} type={type}>
            {icon && iconPosition === 'left' && icon}
            <p className="h-[19px]">{children}</p>
            {icon && iconPosition === 'right' && icon}
        </button>
    );
};
