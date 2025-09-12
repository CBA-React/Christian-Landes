'use client';

import React, { JSX, useState } from 'react';

import ArrowIcon from 'public/icons/arrow-expand.svg';

const howWorksItems = [
	{
		num: '01',
		title: 'What happens after I accept a bid?',
		description:
			'You’ll be able to chat with the contractor, track progress, and manage everything from your dashboard.',
	},
	{
		num: '02',
		title: 'How do I know which contractor to choose?',
		description:
			"After you submit your job, all qualified contractors will see your bid and bid on your job order. You can also view the contractor's profile and view their previous work that meets your standards",
	},
	{
		num: '03',
		title: 'Can I change my request after I post it?',
		description:
			'Yes! you can add work or change bid post after submission. after you agree on the job you bid is closed.',
	},
	{
		num: '04',
		title: 'How do I pay for the work?',
		description:
			'No direct payments at this time. this will be worked out with your contractor after the price is agreed with there preferred payment system.',
	},
	{
		num: '05',
		title: 'Is my location shared publicly?',
		description:
			'no! this is private and your data will not be shared. contractors who work in your area will',
	},
];

export const HowWorks = (): JSX.Element => {
	const [openItems, setOpenItems] = useState<string[]>([]);
	const toggleItem = (num: string) => {
		setOpenItems((prev) =>
			prev.includes(num)
				? prev.filter((item) => item !== num)
				: [...prev, num],
		);
	};
	return (
		<section className="relative mt-[60px] w-full overflow-visible lg:mt-[120px] lg:min-h-[990px]">
			<div className="relative z-10 mx-auto flex h-full max-w-[1240px] flex-col gap-6 lg:flex-row">
				<div className="h-full w-full px-4 sm:px-6 lg:w-1/2 lg:px-0">
					<div className={'w-[100%] sm:mx-auto sm:w-[95%] lg:mx-0'}>
						<h1 className="text-[32px] leading-[38px] md:mt-[60px] md:text-[40px] lg:mt-[90px] lg:text-[48px]">
							How ServiceBridge Works
						</h1>
					</div>
					<div className="mt-[25px] w-[100%] sm:mx-auto sm:w-[95%] md:mt-[60px] lg:mx-0 lg:mt-[97px] lg:mb-[120px] lg:flex lg:flex-col lg:gap-2">
						{howWorksItems.map((work, index, array) => {
							const isOpen = openItems.includes(work.num);
							return (
								<div key={work.num}>
									<div
										className={`flex gap-12 ${index === 0 ? 'mt-0' : 'mt-[20px]'}`}
									>
										<div
											className={
												'w-[100%] lg:max-w-[571px]'
											}
										>
											<div
												className={
													'flex cursor-pointer items-start justify-between gap-3 max-lg:w-[100%] lg:items-center'
												}
												onClick={() =>
													toggleItem(work.num)
												}
											>
												<p className="text-[20px] leading-[100%] md:text-[22px] lg:text-[24px]">
													{work.title}
												</p>
												<div
													className={`transform transition-transform duration-300 ${
														isOpen
															? 'rotate-0'
															: 'rotate-180'
													}`}
												>
													<ArrowIcon />
												</div>
											</div>
											<div
												className={`overflow-hidden transition-all duration-300 ${
													isOpen
														? 'mt-3 max-h-96 opacity-100'
														: 'max-h-0 opacity-0'
												}`}
											>
												<p className="text-[14px] md:text-[15px] lg:text-[16px]">
													{work.description}
												</p>
											</div>
										</div>
									</div>
									{index !== array.length - 1 && (
										<div className="mt-[20px] h-[1px] max-w-[100%] bg-[#24242440] lg:max-w-[571px]" />
									)}
								</div>
							);
						})}
					</div>
				</div>

				<div className="hidden lg:block lg:w-1/2" />
			</div>

			<div
				className="absolute inset-y-0 right-0 left-1/2 mb-[180px] hidden bg-cover bg-right lg:block"
				style={{
					backgroundImage: "url('/images/howWorks.png')",
				}}
			></div>

			<div className="relative mt-8 block justify-end lg:hidden">
				<div
					className="h-[350px] w-full bg-cover bg-center md:h-[400px]"
					style={{
						backgroundImage: "url('/images/howWorks.png')",
					}}
				></div>
			</div>
		</section>
	);
};

