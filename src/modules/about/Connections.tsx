'use client';
import React, { JSX } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

import { Button } from '@/shared/components/Button/Button';
import ArrowRightIcon from 'public/icons/arrow-up-right-white-big.svg';

export const Connections = (): JSX.Element => {
	const [emblaRef] = useEmblaCarousel({ loop: true }, [
		AutoScroll({ playOnInit: true }),
	]);

	return (
		<section className="mb-[56px] px-[20px] lg:mb-[208px] lg:px-0 lg:pt-[6px]">
			<div className="mb-[24px] flex flex-col items-center lg:mb-[120px]">
				<h2 className="font-chalet-1960 mb-2 text-center text-[36px] leading-11 lg:mb-[20px] lg:w-[954px] lg:text-[64px] lg:leading-[64px]">
					We build more than homes — we build strong connections.
				</h2>
				<p className="mb-[20px] text-left text-[16px] leading-[155%] lg:mb-[28px] lg:w-[770px] lg:text-center">
					At BuildConnect, we believe in people.
					<br /> Behind every successful project is a trusted
					relationship — between homeowners, contractors, and our
					team. We’re proud of the community we’ve built — one that
					values trust, transparency, and teamwork.
				</p>
				<Link href="#">
					<Button
						type="button"
						variant="solid"
						color="primary"
						icon={<ArrowRightIcon aria-hidden="true" />}
						iconPosition="right"
						className="!h-[58px] !w-[335px] justify-between !rounded-none !bg-[#003BFF] !px-6 !py-3 !text-[20px] !font-[400] lg:!w-[167px]"
						aria-label="Join Us"
					>
						Join Us
					</Button>
				</Link>
			</div>
			<div ref={emblaRef} className="pointer-events-none overflow-hidden">
				<div className="flex lg:items-center lg:gap-[60px] lg:px-[46px]">
					<div
						className="embla__slide ml-[20px] h-[343px] w-[335px] rounded-xl bg-cover lg:ml-0 lg:h-[230px] lg:w-[292px]"
						style={{
							backgroundImage:
								"url('/images/about-connections1.png')",
						}}
					/>

					<div
						className="embla__slide ml-[20px] h-[343px] w-[335px] rounded-xl bg-cover lg:ml-0 lg:w-[292px]"
						style={{
							backgroundImage:
								"url('/images/about-connections2.png')",
						}}
					/>

					<div
						className="embla__slide ml-[20px] h-[343px] w-[335px] rounded-xl bg-cover lg:ml-0 lg:h-[230px] lg:w-[292px]"
						style={{
							backgroundImage:
								"url('/images/about-connections3.png')",
						}}
					/>

					<div
						className="embla__slide ml-[20px] h-[343px] w-[335px] rounded-xl bg-cover lg:ml-0 lg:h-[230] lg:w-[292px] lg:self-end"
						style={{
							backgroundImage:
								"url('/images/about-connections4.png')",
						}}
					/>
				</div>
			</div>
		</section>
	);
};

