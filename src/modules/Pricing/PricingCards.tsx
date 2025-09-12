'use client';
import React from 'react';

import { PricingCard } from '@/shared/components/PricingCard/PricingCard';
import useEmblaCarousel from 'embla-carousel-react';
import { useCarouselDot } from '@/shared/hooks/useCarouselDot';

export const PricingCards: React.FC = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel();
	const { selectedIndex } = useCarouselDot(emblaApi);

	return (
		<section className="mx-auto my-[53px] flex w-full max-w-[1240px] flex-col md:mt-[110px] md:mb-[95px]">
			<div className="px-[20px] text-[#242424] xl:px-0">
				<h3 className="text-[36px] font-[400] md:text-[48px] md:font-[500]">
					Available Plans
				</h3>
				<p className="text-[16px] font-[400]">
					Pick what fits your needs — upgrade anytime
				</p>
			</div>
			<div
				ref={emblaRef}
				className="embla_for_contractors mt-[24px] px-[20px] lg:mt-0 lg:h-[702px] xl:px-0"
			>
				<div className="embla__container gap-[20px] md:flex-row lg:mt-[-27px] lg:h-full">
					<div className="embla__slide_contractors h-[453px] self-end md:h-[542px]">
						<PricingCard
							id="plan-local"
							title="Perfect for local contractors"
							price="$25"
							features={[
								'25-mile service radius',
								'Unlimited job bidding',
								'Professional profile',
								'Direct messaging',
								'Mobile app access',
								'Email support',
							]}
							bgClass="bg-[#F1F3F6]"
							textClass="text-[#242424]"
							checkIconSrc="/icons/symbols_check-black.svg"
							alignSelf="end"
							button={{
								label: 'Start Local Plan',
								href: '#',
								color: 'dark',
							}}
						/>
					</div>

					<div className="embla__slide_contractors h-[453px] self-center md:h-[542px]">
						<PricingCard
							id="plan-regional"
							title="Regional Expand your reach"
							price="$50"
							features={[
								'75-mile service radius',
								'Unlimited job bidding',
								'Featured profile listing',
								'Priority job notifications',
								'Advanced analytics',
								'Phone & email support',
							]}
							bgClass="bg-[#7EA2AD]"
							textClass="text-white"
							dividerClass="bg-[#FFFFFF1A]"
							checkIconSrc="/icons/symbols_check-white.svg"
							alignSelf="center"
							button={{
								label: 'Start Regional Plan',
								href: '#',
								color: 'primary',
								className: '!bg-white !text-[#242424]',
							}}
						/>
					</div>

					<div className="embla__slide_contractors h-[453px] self-start md:h-[542px]">
						<PricingCard
							id="plan-enterprise"
							title="State-wide coverage"
							price="$200"
							features={[
								'Statewide coverage',
								'Unlimited job bidding',
								'Premium profile placement',
								'Instant job alerts',
								'Dedicated account manager',
								'24/7 priority support',
							]}
							period="per state/month"
							bgClass="bg-[#CFEDD9]"
							textClass="text-[#242424]"
							checkIconSrc="/icons/symbols_check-black.svg"
							alignSelf="start"
							button={{
								label: 'Start Enterprise Plan',
								href: '#',
								color: 'dark',
							}}
						/>
					</div>
				</div>
			</div>
			<div className="mt-6 flex justify-center gap-[5px] lg:hidden">
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

