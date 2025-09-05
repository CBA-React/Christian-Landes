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
		<section className="relative flex w-full flex-col overflow-visible px-[20px] md:block md:h-[800px] md:px-0">
			<div className="relative z-10 mx-auto flex h-full max-w-[1240px] gap-6">
				<div className="h-full md:w-1/2">
					<h1 className="mt-[56px] text-[36px] leading-[45px] md:mt-[80px] md:text-[48px]">
						How ServiceBridge Works
					</h1>
					<div className="mt-[24px] mb-[379px] md:mt-[230px] md:mb-0">
						{howWorks.map((work, index, array) => (
							<div key={work.num}>
								<div
									className={`flex gap-[24px] md:gap-12 ${index === 0 ? 'mt-0' : 'mt-[20px]'}`}
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
				<div className="hidden w-1/2 md:block" />
			</div>

			<div
				className="absolute right-0 bottom-0 h-[350px] w-[375px] bg-cover bg-right md:inset-y-0 md:right-0 md:left-1/2"
				style={{
					backgroundImage:
						"url('/images/for-contractors-apply-now.png')",
				}}
			>
				<div className="absolute top-1/2 left-1/2 z-10 h-[238px] w-[335px] -translate-x-1/2 -translate-y-1/2">
					<Link href="#">
						<ApplyNowButton />
					</Link>
				</div>
			</div>
		</section>
	);
};

