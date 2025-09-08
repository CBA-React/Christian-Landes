import React, { JSX } from 'react';

import { HowWorks } from '@/modules/ForClients/HowWorks';
import { PointsDescription } from '@/modules/ForClients/PointsDescription';
import { ProjectCategories } from '@/modules/ForClients/ProjectCategories';
import { WhyUs } from '@/modules/ForClients/WhyUs';
import { DescriptionBanner } from '@/shared/components/DescriptionBanner/DescriptionBanner';

export default function ForClients(): JSX.Element {
	return (
		<main>
			<DescriptionBanner
				title={'Find and hire trusted local contractors in minutes'}
				description={
					'Post your request, receive bids, and get the job done quickly and safely.'
				}
				height={'530px'}
				buttonText={'Post a Job'}
				buttonLink={'#'}
			/>
			<PointsDescription />
			<ProjectCategories />
			<WhyUs />
			<HowWorks />
		</main>
	);
}
