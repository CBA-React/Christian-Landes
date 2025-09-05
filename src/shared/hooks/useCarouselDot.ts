import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UseDotButtonType = {
	selectedIndex: number;
};

export const useCarouselDot = (
	emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onSelect]);

	return {
		selectedIndex,
	};
};

