import React, { JSX } from 'react';
import Link from 'next/link';

import ApplyNowButton from '@/modules/ForContractors/ApplyNowButton';

const howWorks = [
	{
		num: '01',
		title: 'Post Your Job',
		description:
			'Share the details of your renovation or construction project. Be specific about requirements, timeline, and budget.',
	},
	{
		num: '02',
		title: 'Receive Bids',
		description:
			'Qualified contractors will review your project and submit competitive bids. Compare prices, timelines, and credentials.',
	},
	{
		num: '03',
		title: 'Hire & Manage',
		description:
			'Select the right contractor for your project and use our tools to manage payments, track progress, and communicate.',
	},
];

export const HowWorks = (): JSX.Element => {
	return (
		<section className="mx-auto !flex w-full flex-col overflow-visible md:block md:h-[800px] md:flex-row lg:max-w-[1440px]">
			<div className="mb-[23px] h-full px-[20px] md:w-1/2 lg:mb-0 xl:px-0">
				<div className="h-full xl:pl-[100px]">
					<h1 className="mt-[56px] text-[36px] leading-[45px] md:mt-[85px] md:text-[48px]">
						How ServiceBridge Works
					</h1>
					<div className="mt-[24px] md:mt-[24px] md:mb-0 lg:mt-[240px] lg:mb-[379px]">
						{howWorks.map((work, index, array) => (
							<div key={work.num}>
								<div
									className={`flex gap-[24px] md:gap-12 ${index === 0 ? 'mt-0' : 'mt-[22px]'} ${index === 0 ? 'mt-0' : 'md:mt-[28px]'}`}
								>
									<p className="text-[24px] leading-[100%]">
										{work.num}
									</p>
									<div className="max-w-[495px]">
										<p className="text-[24px] leading-[100%]">
											{work.title}
										</p>
										<p className="mt-3 text-[16px]">
											{work.description}
										</p>
									</div>
								</div>
								{index !== array.length - 1 && (
									<div className="mt-[20px] h-[1px] max-w-[571px] bg-[#24242440]" />
								)}
							</div>
						))}
					</div>
				</div>
			</div>
			<div
				className="flex h-[350px] w-full justify-center bg-cover bg-right md:h-full md:w-1/2 lg:block lg:h-full"
				style={{
					backgroundImage:
						"url('/images/for-contractors-apply-now.png')",
				}}
			>
				<div className="mt-[56px] h-[238px] w-[335px] lg:mt-[281px] lg:ml-[186px]">
					<Link href="#">
						<ApplyNowButton />
					</Link>
				</div>
			</div>
		</section>
	);
};

