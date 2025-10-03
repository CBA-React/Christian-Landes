import { useState, useEffect } from 'react';
import { MOBILE_BREAKPOINT } from '../constants/datePicker';

export const useIsMobile = (): boolean => {
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

export const useClickOutside = (
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

export const useEscapeKey = (handler: () => void, enabled: boolean = true) => {
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

export const useFocusTrap = (
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
