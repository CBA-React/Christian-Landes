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
		<section className="relative h-[800px] w-full overflow-visible">
			<div className="relative z-10 mx-auto flex h-full max-w-[1240px] gap-6">
				<div className="h-full w-1/2">
					<h1 className="mt-[80px] text-[48px]">
						How ServiceBridge Works
					</h1>
					<div className="mt-[230px]">
						{howWorks.map((work, index, array) => (
							<div key={work.num}>
								<div
									className={`flex gap-12 ${index === 0 ? 'mt-0' : 'mt-[20px]'}`}
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
				<div className="w-1/2" />
			</div>

			<div
				className="absolute inset-y-0 right-0 left-1/2 bg-cover bg-right"
				style={{
					backgroundImage:
						"url('/images/for-contractors-apply-now.png')",
				}}
			>
				<div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
					<Link href="#">
						<ApplyNowButton />
					</Link>
				</div>
			</div>
		</section>
	);
};
