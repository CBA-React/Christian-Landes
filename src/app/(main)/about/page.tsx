import React, { JSX } from 'react';

import { DescriptionBanner } from '@/shared/components/DescriptionBanner/DescriptionBanner';
import { Advantages } from '@/modules/about/Advantages';
import { Connections } from '@/modules/about/Connections';
import { WhyUs } from '@/modules/ForClients/WhyUs';
import { HowWorks } from '@/modules/ForClients/HowWorks';

export default function About(): JSX.Element {
	return (
		<main>
			<div className="h-[453px] xl:h-[661px]">
				<DescriptionBanner
					title={'About Us'}
					description={
						'At BuildConnect, we make home projects simple. Whether it’s a repair or a full renovation, our platform connects homeowners with trusted local contractors — no endless calls, no hidden fees. Just fast, reliable service when you need it.'
					}
					buttonText={'Connect Now'}
					buttonLink={'#'}
					descriptionStyles="w-full lg:w-[755px] "
				/>
			</div>
			<Advantages />
			<Connections />
			<WhyUs />
			<HowWorks />
		</main>
	);
}

