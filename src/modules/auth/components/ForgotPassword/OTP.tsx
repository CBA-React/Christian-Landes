'use client';

import { JSX, useEffect, useRef, useState } from 'react';

interface OTPProps {
    length?: number;
    value?: string;
    onChange?: (newValue: string) => void;
    onComplete?: (otp: string) => void;
    error?: boolean;
    helperText?: string;
}

export const OTP = ({
    length = 6,
    value = '',
    onChange,
    onComplete,
    error,
    helperText,
}: OTPProps): JSX.Element => {
    const [internalValue, setInternalValue] = useState<string>(
        value.padEnd(length, ''),
    );
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        setInternalValue(value.padEnd(length, ''));
    }, [value, length]);

    const focusInput = (idx: number): void => {
        inputRefs.current[idx]?.focus();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number,
    ) => {
        const val = e.target.value.replace(/\D/, ''); // только цифры
        const newValue = internalValue.split('');
        newValue[idx] = val;
        const finalValue = newValue.join('').slice(0, length);

        setInternalValue(finalValue);
        onChange?.(finalValue);

        if (val && idx < length - 1) {
            focusInput(idx + 1);
        }

        if (finalValue.length === length && !finalValue.includes('')) {
            onComplete?.(finalValue);
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        idx: number,
    ) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newValue = internalValue.split('');
            newValue[idx] = '';
            setInternalValue(newValue.join(''));
            onChange?.(newValue.join(''));
            if (idx > 0) focusInput(idx - 1);
        }
        if (e.key === 'ArrowLeft' && idx > 0) {
            e.preventDefault();
            focusInput(idx - 1);
        }
        if (e.key === 'ArrowRight' && idx < length - 1) {
            e.preventDefault();
            focusInput(idx + 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData('text/plain')
            .replace(/\D/g, '')
            .slice(0, length);
        const newValue = pasted.padEnd(length, '').slice(0, length);
        setInternalValue(newValue);
        onChange?.(newValue);
        if (newValue.length === length && !newValue.includes(''))
            onComplete?.(newValue);
    };

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex gap-3">
                {Array.from({ length }).map((_, idx) => (
                    <input
                        key={idx}
                        ref={(el) => {
                            inputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={internalValue[idx] ?? ''}
                        onChange={(e) => handleChange(e, idx)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        onPaste={handlePaste}
                        className="
              w-16 h-12 text-center border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500
              text-lg font-medium
              placeholder-gray-400
            "
                    />
                ))}
            </div>
            {error && helperText && (
                <div className="text-red-500 text-sm">{helperText}</div>
            )}
        </div>
    );
};
