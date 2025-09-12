import React, { JSX } from 'react';

import { DescriptionBanner } from '@/shared/components/DescriptionBanner/DescriptionBanner';
import { ContactForm } from '@/modules/ContactUs/components/ContactForm';
import { HowWorks } from '@/modules/ForClients/HowWorks';

export default function ContactUs(): JSX.Element {
	return (
		<main>
			<div className="h-[396px] lg:h-[564px]">
				<DescriptionBanner
					title={
						<>
							Get In Touch With <br className="md:hidden" />
							Service Bridge
						</>
					}
					description={
						'Do you have any ideas or are there any left? Write to us, we are looking forward to seeing you'
					}
					buttonText={''}
					buttonLink={'#'}
					isButtonShown={false}
					titleStyles="lg:w-[700px] "
					sectionStyles="!pt-27 lg:!pt-19"
					descriptionStyles="w-[271px] lg:w-[453px] !mt-[15px] lg:!mt-5"
				/>
			</div>
			<ContactForm />
			<HowWorks />
		</main>
	);
}

