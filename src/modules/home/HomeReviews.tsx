'use client';
import React, { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { Button } from '@/shared/components/Button/Button';
import { useCarouselDot } from '@/shared/hooks/useCarouselDot';

type ReviewType = 'clients' | 'contractors';

interface Review {
	id: number;
	text: string;
	author: string;
	role: string;
	bgColor: string;
	textColor: string;
	roleColor: string;
}

const clientReviews: Review[] = [
	{
		id: 1,
		text: 'This platform made it so easy to find a great contractor. I submitted one request and had three offers within hours.',
		author: 'Mia Corvere',
		role: 'Client',
		bgColor: 'bg-[#F1F3F6]',
		textColor: 'text-[#242424]',
		roleColor: 'text-[#24242480]',
	},
	{
		id: 2,
		text: "I hired a handyman to fix a few things in the kitchen — he arrived on time and did everything neatly. It's super convenient to find verified workers with real reviews. Highly recommend",
		author: 'Sarah Davidson',
		role: 'Client',
		bgColor: 'bg-[#7EA2AD]',
		textColor: 'text-[#FFFFFF]',
		roleColor: 'text-[#FFFFFF80]',
	},
	{
		id: 3,
		text: 'Needed an electrician urgently and the site really saved the day. Found someone within 15 minutes, and everything was fixed the next day. Fair prices and easy-to-use platform.',
		author: 'Will Bloomer',
		role: 'Client',
		bgColor: 'bg-[#CFEDD9]',
		textColor: 'text-[#242424]',
		roleColor: 'text-[#24242480]',
	},
];

const contractorReviews: Review[] = [
	{
		id: 1,
		text: 'Great platform for finding consistent renovation projects. I can filter jobs by location and type of work, which saves me time on irrelevant offers.',
		author: 'Joe Yang',
		role: 'Contractor',
		bgColor: 'bg-[#F1F3F6]',
		textColor: 'text-[#242424]',
		roleColor: 'text-[#24242480]',
	},
	{
		id: 2,
		text: 'Been using ConnectBuildHub for months and it connects me with reliable clients. Payments are secure and communication with homeowners is straightforward.',
		author: 'Paul Horland',
		role: 'Contractor',
		bgColor: 'bg-[#7EA2AD]',
		textColor: 'text-[#FFFFFF]',
		roleColor: 'text-[#FFFFFF80]',
	},
	{
		id: 3,
		text: 'Simple app to use as a contractor. Setting up my profile was quick, and I started getting job requests almost immediately. Solid tool for the renovation field.',
		author: 'Kieran Grace',
		role: 'Contractor',
		bgColor: 'bg-[#CFEDD9]',
		textColor: 'text-[#242424]',
		roleColor: 'text-[#24242480]',
	},
];

export const HomeReviews: React.FC = () => {
	const [activeTab, setActiveTab] = useState<ReviewType>('clients');
	const [emblaRef, emblaApi] = useEmblaCarousel();
	const { selectedIndex } = useCarouselDot(emblaApi);

	const currentReviews =
		activeTab === 'clients' ? clientReviews : contractorReviews;

	return (
		<section className="mx-auto mt-[53px] flex w-full max-w-[1240px] flex-col md:mt-[110px]">
			<div className="mb-[24px] flex flex-col items-center justify-center md:mb-10">
				<h3 className="mb-[13px] text-[36px] font-[400] text-[#242424] md:mb-[20px] md:text-[48px] md:font-[500]">
					What users say
				</h3>
				<div className="flex gap-3">
					<Button
						type="button"
						variant={activeTab === 'clients' ? 'solid' : 'outline'}
						color="dark"
						iconPosition="right"
						className={`!flex !h-[58px] !w-[160px] items-center justify-center !rounded-none !px-6 !py-3 !text-[20px] !font-[400] ${
							activeTab === 'clients'
								? '!bg-[#242424] !text-white'
								: '!border-[#242424] !bg-transparent !text-[#242424]'
						}`}
						onClick={() => setActiveTab('clients')}
					>
						Clients
					</Button>
					<Button
						type="button"
						variant={
							activeTab === 'contractors' ? 'solid' : 'outline'
						}
						color="dark"
						iconPosition="right"
						className={`!flex !h-[58px] !w-[160px] items-center justify-center !rounded-none !px-6 !py-3 !text-[20px] !font-[400] ${
							activeTab === 'contractors'
								? '!bg-[#242424] !text-white'
								: '!border-[#242424] !bg-transparent !text-[#242424]'
						}`}
						onClick={() => setActiveTab('contractors')}
					>
						Contractors
					</Button>
				</div>
			</div>
			<div
				ref={emblaRef}
				className="embla md:bm-0 mb-[24px] px-[20px] md:px-0"
			>
				<div className="embla__container gap-[20px] md:grid md:h-[440px] md:grid-cols-3 md:items-start md:gap-5">
					{currentReviews.map((review, index) => (
						<div
							key={review.id}
							className={`embla__slide flex min-h-[350px] flex-col rounded-[20px] ${review.bgColor} p-[24px] ${review.textColor} md:h-full md:w-[400px] md:p-8 lg:h-[363px] ${
								index === 1 ? 'lg:self-end' : 'md:self-start'
							}`}
						>
							<div className="flex h-full flex-1 flex-col justify-between">
								<p className="text-[20px] leading-[26px] font-[400] md:text-[18px] md:leading-[30px] xl:text-[24px]">
									{review.text}
								</p>
								<div className="mt-10 text-[16px] font-[400]">
									<p>{review.author}</p>
									<p className={review.roleColor}>
										{review.role}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-center gap-[5px] md:hidden">
				{currentReviews.map((_, index) => (
					<div
						key={index}
						className={`${selectedIndex === index ? 'bg-[#242424]' : 'bg-[#F1F3F6]'} h-[10px] w-[10px] rounded-full`}
					/>
				))}
			</div>
		</section>
	);
};
