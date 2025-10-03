'use client';

import React, { useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { usePathname } from 'next/navigation';

import { PricingCard } from '@/shared/components/PricingCard/PricingCard';
import { useCarouselDot } from '@/shared/hooks/useCarouselDot';

import { useMyPlan, usePlans, useSubscribeOrChange } from './hooks/usePlans';

export const PricingCards: React.FC = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel();
	const { selectedIndex } = useCarouselDot(emblaApi);
	const pathname = usePathname();

	const isUpgrade = pathname?.includes('/profile/pricing-plan/upgrade-plan');

	const { data: plans, isLoading: isPlansLoading } = usePlans();
	const { data: myPlan } = useMyPlan();
	const { mutateAsync, isPending } = useSubscribeOrChange();

	const onChoose = async (plan_id: number) => {
		if (!isUpgrade) return;
		const hasActive = !!myPlan?.plan_id;
		const { url } = await mutateAsync({ plan_id, hasActive });
		window.location.href = url;
	};

	const alignToItems = ['self-end', 'self-center', 'self-start'];

	const marketing = useMemo(
		() => [
			{
				id: 'plan-local',
				title: 'Perfect for local contractors',
				price: '$25',
				period: 'per month',
				features: [
					'25-mile service radius',
					'Unlimited job bidding',
					'Professional profile',
					'Direct messaging',
					'Mobile app access',
					'Email support',
				],
				bgClass: 'bg-[#F1F3F6]',
				textClass: 'text-[#242424]',
				checkIconSrc: '/icons/symbols_check-black.svg',
				alignSelf: 'end',
				button: {
					label: 'Get Local Plan',
					href: '#',
					color: 'dark' as const,
				},
			},
			{
				id: 'plan-regional',
				title: 'Regional Expand your reach',
				price: '$50',
				period: 'per month',
				features: [
					'75-mile service radius',
					'Unlimited job bidding',
					'Featured profile listing',
					'Priority job notifications',
					'Advanced analytics',
					'Phone & email support',
				],
				bgClass: 'bg-[#7EA2AD]',
				textClass: 'text-white',
				dividerClass: 'bg-[#FFFFFF1A]',
				checkIconSrc: '/icons/symbols_check-white.svg',
				alignSelf: 'center',
				button: {
					label: 'Get Regional Plan',
					href: '#',
					color: 'primary' as const,
					className: '!bg-white !text-[#242424]',
				},
			},
			{
				id: 'plan-enterprise',
				title: 'State-wide coverage',
				price: '$200',
				period: 'per state/month',
				features: [
					'Statewide coverage',
					'Unlimited job bidding',
					'Premium profile placement',
					'Instant job alerts',
					'Dedicated account manager',
					'24/7 priority support',
				],
				bgClass: 'bg-[#CFEDD9]',
				textClass: 'text-[#242424]',
				checkIconSrc: '/icons/symbols_check-black.svg',
				alignSelf: 'start',
				button: {
					label: 'Get State-wide Plan',
					href: '#',
					color: 'dark' as const,
				},
			},
		],
		[],
	);

	const upgradeCards = useMemo(() => {
		return (plans ?? []).map((p) => {
			const isCurrent = myPlan?.plan_id === p.id;
			const displayPrice = `$${p.price.toFixed(0)}`;
			const name = p.name;

			const [bgClass, textClass, dividerClass, checkIconSrc, alignSelf] =
				p.type === 2
					? [
							'bg-[#7EA2AD]',
							'text-white',
							'bg-[#FFFFFF1A]',
							'/icons/symbols_check-white.svg',
							'center',
						]
					: p.type === 3
						? [
								'bg-[#CFEDD9]',
								'text-[#242424]',
								undefined,
								'/icons/symbols_check-black.svg',
								'start',
							]
						: [
								'bg-[#F1F3F6]',
								'text-[#242424]',
								undefined,
								'/icons/symbols_check-black.svg',
								'end',
							];

			const disabled = !p.stripe_price_id || isPending;

			return {
				id: `plan-${p.id}`,
				title: name,
				price: displayPrice,
				period: p.period,
				features: p.features,
				bgClass,
				textClass,
				dividerClass,
				checkIconSrc,
				alignSelf,
				footerNote: isCurrent
					? 'You already have this plan.'
					: undefined,
				button: isCurrent
					? undefined
					: {
							label: disabled
								? isPending
									? 'Redirecting…'
									: 'Coming soon'
								: 'Choose plan',
							href: '#',
							color: p.type === 2 ? 'primary' : 'dark',
							className:
								p.type === 2
									? '!bg-white !text-[#242424]'
									: undefined,
							onClick: disabled
								? undefined
								: (e: any): void => {
										e.preventDefault();
										void onChoose(p.id);
									},
						},
			};
		});
	}, [plans, myPlan, isPending, onChoose]);

	const cardsToRender = isUpgrade ? upgradeCards : marketing;

	return (
		<section className="mx-auto my-[53px] flex w-full max-w-[1240px] flex-col md:mt-[110px] md:mb-[95px]">
			<div className="px-[20px] text-[#242424] xl:px-0">
				<h3 className="text-[36px] font-[400] md:text-[48px] md:font-[500]">
					{isUpgrade ? 'Available Plans' : 'Available Plans'}
				</h3>
				<p className="text-[16px] font-[400]">
					{isUpgrade
						? 'Pick what fits your needs — upgrade anytime'
						: 'Pick what fits your needs — upgrade anytime'}
				</p>
			</div>

			<div
				ref={emblaRef}
				className="embla_for_contractors mt-[24px] px-[20px] lg:mt-0 lg:h-[702px] xl:px-0"
			>
				<div className="embla__container gap-[20px] md:flex-row lg:mt-[-27px] lg:h-full">
					{(isUpgrade && isPlansLoading
						? [1, 2, 3]
						: cardsToRender
					).map((card: any, idx: number) => (
						<div
							key={card?.id ?? idx}
							className={`embla__slide_contractors flex h-[453px] md:h-[542px] ${alignToItems[idx]}`}
						>
							<PricingCard
								id={card.id}
								title={card.title}
								price={card.price}
								period={card.period}
								features={card.features}
								bgClass={card.bgClass}
								textClass={card.textClass}
								dividerClass={card.dividerClass}
								checkIconSrc={card.checkIconSrc}
								alignSelf={card.alignSelf}
								footerNote={card.footerNote}
								button={card.button}
							/>
						</div>
					))}
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
