'use client';

import { JSX } from 'react';
import Image from 'next/image';

import { Button } from '@/shared/components/Button/Button';

import ArrowUp from 'public/icons/profile/arrow-up-large.svg';
import Plus from 'public/icons/profile/plus-white.svg';

const portfolioData = [
	{
		id: '1',
		title: 'Kitchen Remodel',
		description: 'Modern kitchen renovation in San Francisco',
		imageUrl: '/images/profile/mock-kitchen.jpg',
	},
	{
		id: '2',
		title: 'Bathroom Transformation',
		description: 'Complete bathroom remodel with luxury fixtures',
		imageUrl: '/images/profile/mock-bathroom.jpg',
	},
];

export const Portfolio = (): JSX.Element => {
	const handleAddProject = () => {
		console.log('Add new project');
	};

	const handleViewProject = (projectId: string) => {
		console.log('View project:', projectId);
	};

	return (
		<div className="mb-6 rounded-lg bg-[#F1F3F6] p-6 md:mb-30 md:p-10">
			{/* Header section */}
			<div className="mb-6 flex flex-col gap-6 md:mb-6 md:flex-row md:items-center md:justify-between md:gap-0">
				<div>
					<h2 className="font-chalet-1960 text-[40px] tracking-[-1px] text-[#242424]">
						Portfolio
					</h2>
					<p className="font-chalet-1960 text-[16px] text-[#242424]/50">
						Showcase your best work to attract new clients
					</p>
				</div>

				<Button
					onClick={handleAddProject}
					color="dark"
					iconPosition="left"
					icon={<Plus />}
					className="font-chalet-1960 h-[48px] w-full justify-center !gap-3 !px-6 md:w-[165px]"
				>
					Add Project
				</Button>
			</div>

			{/* Portfolio grid - single column on mobile, two columns on desktop */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
				{portfolioData.map((item) => (
					<div key={item.id} className="group">
						<div className="relative h-[180px] w-full cursor-pointer overflow-hidden md:h-[240px] lg:h-[260px]">
							<Image
								src={item.imageUrl}
								alt={item.title}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>

							<div className="absolute inset-0 bg-gradient-to-b from-[#2B2B2B]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

							<button
								onClick={() => handleViewProject(item.id)}
								className="absolute top-3 right-3 z-10 p-2"
							>
								<ArrowUp />
							</button>
						</div>

						<div className="mt-3 md:mt-4">
							<h3 className="font-chalet-1960 text-[20px] text-[#242424]">
								{item.title}
							</h3>
							<p className="font-chalet-1960 mt-1 text-[16px] text-[#242424]">
								{item.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
