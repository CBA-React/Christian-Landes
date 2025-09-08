import React, { JSX } from 'react';

import { HowWorks } from '@/modules/ForClients/HowWorks';
import { PointsDescription } from '@/modules/ForClients/PointsDescription';
import { ProjectCategories } from '@/modules/ForClients/ProjectCategories';
import { WhyUs } from '@/modules/ForClients/WhyUs';
import { DescriptionBanner } from '@/shared/components/DescriptionBanner/DescriptionBanner';

export default function ForClients(): JSX.Element {
	return (
		<main>
			<div className="h-[530px] xl:h-[700px]">
				<DescriptionBanner
					title={'Find and hire trusted local contractors in minutes'}
					description={
						'Post your request, receive bids, and get the job done quickly and safely.'
					}
					buttonText={'Post a Job'}
					buttonLink={'#'}
				/>
			</div>

			<PointsDescription />
			<ProjectCategories />
			<WhyUs />
			<HowWorks />
		</main>
	);
}

