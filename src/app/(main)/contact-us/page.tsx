import React, { JSX } from 'react';

import { DescriptionBanner } from '@/shared/components/DescriptionBanner/DescriptionBanner';
import { ContactForm } from '@/modules/ContactUs/components/ContactForm';
import { HowWorks } from '@/modules/ForClients/HowWorks';

export default function ContactUs(): JSX.Element {
	return (
		<main>
			<div className="h-[530px] lg:h-[564px]">
				<DescriptionBanner
					title={'Get In Touch With Service Bridge'}
					description={
						'Do you have any ideas or are there any left? Write to us, we are looking forward to seeing you'
					}
					buttonText={''}
					buttonLink={'#'}
					isButtonShown={false}
					titleStyles="w-[700px]"
					sectionStyles="lg:pt-20"
				/>
			</div>
			<ContactForm />
			<HowWorks />
		</main>
	);
}

