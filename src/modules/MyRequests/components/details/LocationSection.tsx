import { JSX } from 'react';
import Location from 'public/icons/profile/location.svg';
import Image from 'next/image';

interface LocationSectionProps {
	location: string;
}

export const LocationSection = ({
	location,
}: LocationSectionProps): JSX.Element => {
	return (
		<div className="mb-14 lg:mb-30">
			<h2 className="font-chalet-1960 mb-3 text-[36px] leading-[100%] tracking-[-1px] text-[#242424] lg:text-[40px]">
				Project Location
			</h2>

			<div className="mb-10 flex items-center gap-2">
				<Location className="color-[#242424]/50" />
				<span className="font-chalet-1960 text-[16px] text-[#242424]/50">
					{location}
				</span>
			</div>

			<div className="relative h-[500px] w-full overflow-hidden">
				<Image
					src="/images/profile/location-mock.png"
					alt="Project location map"
					fill
					className="object-cover"
				/>
			</div>
		</div>
	);
};
