import React, { JSX } from 'react';

import { HowWorks } from '@/modules/ForContractors/HowWorks';
import { ProjectCategoriesSlider } from '@/modules/ForContractors/ProjectCategoriesSlider';
import { PricingCards } from '@/modules/Pricing/PricingCards';
import { DescriptionBanner } from '@/shared/components/DescriptionBanner/DescriptionBanner';

export default function ForContractors(): JSX.Element {
	return (
		<main>
			<div className="h-[522px] xl:h-[700px]">
				<DescriptionBanner
					title="Expand your business opportunities with us"
					description="Work on your own terms, get stable orders, and forget about finding clients — we’ll take care of the rest."
					buttonText="Find Work"
					buttonLink="#"
					descriptionStyles="w-[453px]"
				/>
			</div>

			<HowWorks />
			<ProjectCategoriesSlider />
			<PricingCards />
		</main>
	);
}

