export const truncateText = (text: string, maxLength: number): string => {
	if (text.length <= maxLength) return text;
	return `${text.substring(0, maxLength)}...`;
};

export const TEXT_LIMITS = {
	NAME: 23,
	EMAIL: 24,
	LOCATION: 30,
} as const;
