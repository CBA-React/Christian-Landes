import { JSX, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

interface MobileImageCarouselProps {
	images: string[];
}

export const MobileImageCarousel = ({
	images,
}: MobileImageCarouselProps): JSX.Element => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
	const [selectedIndex, setSelectedIndex] = useState(0);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on('select', onSelect);
		return () => {
			emblaApi.off('select', onSelect);
		};
	}, [emblaApi, onSelect]);

	if (!images || images.length === 0) {
		return <></>;
	}

	return (
		<div className="relative w-full">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{images.map((img, idx) => (
						<div
							key={idx}
							className="relative min-w-0 flex-[0_0_100%]"
						>
							<div className="relative h-[335px] w-full sm:h-[550px]">
								<Image
									src={img}
									alt={`Project image ${idx + 1}`}
									fill
									className="object-cover"
									priority={idx === 0}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{images.length > 1 && (
				<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
					{images.map((_, idx) => (
						<button
							key={idx}
							onClick={() => emblaApi?.scrollTo(idx)}
							className={`h-3 w-3 rounded-full transition-all ${
								idx === selectedIndex
									? 'bg-[#242424]'
									: 'bg-white'
							}`}
							aria-label={`Go to slide ${idx + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
};
