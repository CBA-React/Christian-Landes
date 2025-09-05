'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';

import { Button } from '@/shared/components/Button/Button';
import { useCarouselDot } from '@/shared/hooks/useCarouselDot';

export const HomeReviews: React.FC = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel();
	const { selectedIndex } = useCarouselDot(emblaApi);

	useEffect(() => {
		console.log(emblaApi?.selectedScrollSnap());
	}, [emblaApi]);

	return (
		<section className="mx-auto mt-[53px] flex w-full max-w-[1240px] flex-col md:mt-[110px]">
			<div className="mb-[24px] flex flex-col items-center justify-center md:mb-10">
				<h3 className="mb-[13px] text-[36px] font-[400] text-[#242424] md:mb-[20px] md:text-[48px] md:font-[500]">
					What users say
				</h3>
				<div className="flex gap-3">
					<Link href="#">
						<Button
							type="button"
							variant="solid"
							color="dark"
							iconPosition="right"
							className="!flex !h-[58px] !w-[160px] items-center justify-center !rounded-none !bg-[#242424] !px-6 !py-3 !text-[20px] !font-[400]"
						>
							Clients
						</Button>
					</Link>
					<Link href="#">
						<Button
							type="button"
							variant="outline"
							color="dark"
							iconPosition="right"
							className="!flex !h-[58px] !w-[160px] items-center justify-center !rounded-none !border-[#242424] !px-6 !py-3 !text-[20px] !font-[400] !text-[#242424]"
						>
							Contractors
						</Button>
					</Link>
				</div>
			</div>
			<div
				ref={emblaRef}
				className="embla md:bm-0 mb-[24px] px-[20px] md:px-0"
			>
				<div className="embla__container gap-[20px] md:grid md:h-[440px] md:grid-cols-3 md:items-start md:gap-5">
					<div className="embla__slide flex min-h-[350px] flex-col rounded-[20px] bg-[#F1F3F6] p-[24px] text-[#242424] md:h-full md:w-[400px] md:self-start md:p-8 lg:h-[363px]">
						<div className="flex h-full flex-1 flex-col justify-between">
							<p className="text-[20px] leading-[26px] font-[400] md:text-[18px] md:leading-[30px] xl:text-[24px]">
								This platform made it so easy to find a great
								contractor. I submitted one request and had
								three offers within hours.
							</p>
							<div className="mt-10 text-[16px] font-[400]">
								<p>Mia Corvere</p>
								<p className="text-[#24242480]">Client</p>
							</div>
						</div>
					</div>

					<div className="embla__slide flex min-h-[350px] flex-col rounded-[20px] bg-[#7EA2AD] p-[24px] text-[#FFFFFF] md:h-full md:p-8 lg:h-[363px] lg:self-end">
						<div className="flex h-full flex-1 flex-col justify-between">
							<p className="text-[20px] leading-[26px] font-[400] md:text-[18px] md:leading-[30px] xl:text-[24px]">
								I hired a handyman to fix a few things in the
								kitchen — he arrived on time and did everything
								neatly. It’s super convenient to find verified
								workers with real reviews. Highly recommend
							</p>
							<div className="mt-10 text-[16px] font-[400]">
								<p>Sarah Davidson</p>
								<p className="text-[#FFFFFF80]">Client</p>
							</div>
						</div>
					</div>

					<div className="embla__slide flex min-h-[350px] flex-col rounded-[20px] bg-[#CFEDD9] p-[24px] text-[#242424] md:h-full md:self-start md:p-8 lg:h-[363px]">
						<div className="flex h-full flex-1 flex-col justify-between">
							<p className="text-[20px] leading-[26px] font-[400] md:text-[18px] md:leading-[30px] xl:text-[24px]">
								Needed an electrician urgently and the site
								really saved the day. Found someone within 15
								minutes, and everything was fixed the next day.
								Fair prices and easy-to-use platform.
							</p>
							<div className="mt-10 text-[16px] font-[400]">
								<p>Will Bloomer</p>
								<p className="text-[#24242480]">Client</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center gap-[5px] md:hidden">
				<div
					className={`${selectedIndex === 0 ? 'bg-[#242424]' : 'bg-[#F1F3F6]'} h-[10px] w-[10px] rounded-full`}
				/>
				<div
					className={`${selectedIndex === 1 ? 'bg-[#242424]' : 'bg-[#F1F3F6]'} h-[10px] w-[10px] rounded-full`}
				/>
				<div
					className={`${selectedIndex === 2 ? 'bg-[#242424]' : 'bg-[#F1F3F6]'} h-[10px] w-[10px] rounded-full`}
				/>
			</div>
		</section>
	);
};

