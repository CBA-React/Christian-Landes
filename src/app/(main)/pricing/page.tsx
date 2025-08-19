import React, { JSX } from 'react';

import { PricingCards } from '@/modules/Pricing/PricingCards';
import { PricingHero } from '@/modules/Pricing/PricingHero';

export default function Pricing(): JSX.Element {
	return (
		<main>
			<PricingHero />
			<PricingCards />
		</main>
	);
}
