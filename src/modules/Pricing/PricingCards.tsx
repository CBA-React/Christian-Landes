import React from 'react';

import { PricingCard } from '@/shared/components/PricingCard/PricingCard';

export const PricingCards: React.FC = () => {
    return (
        <section className="max-w-[1240px] mx-auto my-[120px] w-full flex flex-col">
            <div className="text-[#242424]">
                <h3 className="font-[500] text-[48px]">Available Plans</h3>
                <p className="font-[400] text-[16px]">
                    Pick what fits your needs — upgrade anytime
                </p>
            </div>
            <div className="flex gap-5 h-[702px]">
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
        </section>
    );
};
