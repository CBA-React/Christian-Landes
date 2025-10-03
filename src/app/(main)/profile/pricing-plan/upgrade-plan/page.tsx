import { JSX } from 'react';

import { PricingCards } from '@/modules/Pricing/PricingCards';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';

export default function PricingPlanPage(): JSX.Element {
	return (
		<ProfileLayout showHeader={false} showSidebar={false}>
			<PricingCards />
		</ProfileLayout>
	);
}
