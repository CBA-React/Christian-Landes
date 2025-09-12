import { JSX } from 'react';

import { HomeContractors } from '@/modules/home/HomeContractors';
import { HomeHero } from '@/modules/home/HomeHero';
import { HomeReviews } from '@/modules/home/HomeReviews';
import { HomeSimplify } from '@/modules/home/HomeSimplify';
import { HomeWhyChoose } from '@/modules/home/HomeWhyChoose';
import { HowItWorks } from '@/modules/home/HowItWorks';

export default function Home(): JSX.Element {
	return (
		<main className="mb-[56px] md:mb-[120px]">
			<HomeHero />
			<HomeSimplify />
			<HowItWorks />
			<HomeWhyChoose />
			<HomeContractors />
			<HomeReviews />
		</main>
	);
}
