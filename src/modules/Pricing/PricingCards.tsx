'use client';
import React from 'react';

import { PricingCard } from '@/shared/components/PricingCard/PricingCard';
import useEmblaCarousel from 'embla-carousel-react';
import { useCarouselDot } from '@/shared/hooks/useCarouselDot';

export const PricingCards: React.FC = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel();
	const { selectedIndex } = useCarouselDot(emblaApi);

	return (
		<section className="mx-auto my-[56px] flex w-full max-w-[1240px] flex-col md:my-[120px]">
			<div className="px-[20px] text-[#242424] md:px-0">
				<h3 className="text-[36px] font-[400] md:text-[48px] md:font-[500]">
					Available Plans
				</h3>
				<p className="text-[16px] font-[400]">
					Pick what fits your needs — upgrade anytime
				</p>
			</div>
			<div
				ref={emblaRef}
				className="embla mt-[24px] px-[20px] md:mt-0 md:h-[702px] md:px-0"
			>
				<div className="embla__container gap-[20px] md:flex-row">
					<div className="embla__slide h-[453px]">
						<PricingCard
							id="plan-local"
							title="Perfect for local contractors"
							price="$20"
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

					<div className="embla__slide h-[453px]">
						<PricingCard
							id="plan-regional"
							title="Best for growing teams"
							price="$49"
							features={[
								'Statewide service radius',
								'Priority placement',
								'Team seats',
								'Direct messaging',
								'Mobile & web app',
								'Priority support',
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

					<div className="embla__slide h-[453px]">
						<PricingCard
							id="plan-enterprise"
							title="For statewide pros"
							price="$99"
							features={[
								'Multi-state coverage',
								'Dedicated success manager',
								'Custom branding',
								'API access',
								'SLA support',
								'Quarterly reviews',
							]}
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
			<div className="mt-6 flex justify-center gap-[5px] md:hidden">
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

