import { PLACEHOLDER_IMAGE } from '../constants/pagination';

export function processImages(images: any[]): string[] {
	if (!images || !Array.isArray(images) || images.length === 0) {
		return [PLACEHOLDER_IMAGE];
	}

	return images.map((img: any) => {
		if (typeof img === 'string') {
			return img;
		}
		if (typeof img === 'object' && img.url) {
			return img.url;
		}
		return PLACEHOLDER_IMAGE;
	});
}

export function formatDate(dateString: string): string {
	try {
		const date = new Date(dateString);

		if (isNaN(date.getTime())) {
			console.warn('Invalid date string:', dateString);
			return 'N/A';
		}

		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: '2-digit',
		});
	} catch (error) {
		console.error('Error formatting date:', error);
		return 'N/A';
	}
}

export function formatBudget(budget: number): string {
	if (budget >= 1000) {
		const kValue = (budget / 1000).toFixed(1);
		const formatted = kValue.replace(/\.0$/, '');
		return `$${formatted}k`;
	}

	return `$${budget}`;
}
