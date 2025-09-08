import { JSX } from 'react';

import { PointDescriptionItem } from '@/shared/components/PointDescriptionItem/PointDescriptionItem';

export const PointsDescription = (): JSX.Element => {
	return (
		<article className="mx-auto mt-[80px] max-w-[1240px] px-4 sm:px-6 lg:px-0">
			<h1
				className={
					'text-[36px] font-medium lg:text-center lg:text-[48px]'
				}
			>
				How ServiceBridge Works
			</h1>
			<div className="mt-[24px] flex flex-col gap-5 lg:mt-[64px] lg:flex-row">
				<PointDescriptionItem
					backgroundColor={'#242424'}
					number={1}
					title={'Describe your project'}
					description={
						'Quickly fill out a request and add photos or documents.'
					}
				/>
				<PointDescriptionItem
					number={2}
					backgroundColor={'#CFEDD9'}
					title={'Receive bids in real time'}
					description={
						'Get offers from local contractors matching your location.'
					}
				/>
				<PointDescriptionItem
					number={3}
					backgroundColor={'#7EA2AD'}
					title={'Pick the best bid & stay in control'}
					description={
						'Chat, manage and track everything inside the platform.'
					}
				/>
			</div>
		</article>
	);
};
