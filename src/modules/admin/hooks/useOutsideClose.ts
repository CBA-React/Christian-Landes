import { RefObject, useEffect, useRef } from 'react';

export function useOutsideClose<T extends HTMLElement>(
	onClose: () => void,
): RefObject<T | null> {
	const ref = useRef<T | null>(null);
	useEffect(() => {
		function handler(e: MouseEvent): void {
			if (!ref.current) return;
			if (!ref.current.contains(e.target as Node)) onClose();
		}
		function esc(e: KeyboardEvent): void {
			if (e.key === 'Escape') onClose();
		}
		document.addEventListener('mousedown', handler);
		document.addEventListener('keydown', esc);
		return (): void => {
			document.removeEventListener('mousedown', handler);
			document.removeEventListener('keydown', esc);
		};
	}, [onClose]);
	return ref;
}
