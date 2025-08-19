// Simple cn utility using Array join (can be replaced with clsx if needed)
export function cn(...args: (string | undefined | false | null)[]): string {
	return args.filter(Boolean).join(' ');
}
