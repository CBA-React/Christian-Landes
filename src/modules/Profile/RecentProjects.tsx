'use client';

import { JSX } from 'react';
import Image from 'next/image';

import { Button } from '@/shared/components/Button/Button';

import Check from '../../../public/icons/profile/symbol-check-small.svg';
import Plus from '../../../public/icons/profile/plus-white.svg';
import Separator from '../../../public/icons/profile/separator.svg';

interface ProjectStatus {
	label: string;
	color: string;
}

interface RecentProject {
	id: string;
	title: string;
	imageUrl: string;
	status: ProjectStatus;
	bidsCount: number;
	postedDate: string;
	budget: string;
}

const recentProjectsData: RecentProject[] = [
	{
		id: '1',
		title: 'Painting The Kitchen',
		imageUrl: '/images/profile/mock-kitchen.jpg',
		status: { label: 'Completed', color: 'green' },
		bidsCount: 5,
		postedDate: 'Aug 02',
		budget: '$1.5k',
	},
	{
		id: '2',
		title: 'Painting The Kitchen',
		imageUrl: '/images/profile/mock-kitchen.jpg',
		status: { label: 'Completed', color: 'green' },
		bidsCount: 5,
		postedDate: 'Aug 02',
		budget: '$1.5k',
	},
];

export const RecentProjects = (): JSX.Element => {
	const handlePostRequest = () => {
		console.log('Post new request');
	};

	const handleViewProject = (projectId: string) => {
		console.log('View project:', projectId);
	};

	const getStatusBadgeColor = (color: string) => {
		switch (color) {
			case 'green':
				return 'bg-green-100 text-green-800';
			case 'yellow':
				return 'bg-yellow-100 text-yellow-800';
			case 'blue':
				return 'bg-blue-100 text-blue-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<div className="mb-6 rounded-lg bg-[#F1F3F6] p-6 md:mb-30 md:p-10">
			{/* Header section */}
			<div className="mb-6 flex flex-col gap-6 md:mb-6 md:flex-row md:items-center md:justify-between md:gap-0">
				<div>
					<h2 className="font-chalet-1960 text-[40px] tracking-[-1px] text-[#242424]">
						Recent Projects
					</h2>
					<p className="font-chalet-1960 text-[16px] text-[#242424]/50">
						Your job requests at a glance
					</p>
				</div>

				<Button
					onClick={handlePostRequest}
					color="dark"
					iconPosition="left"
					icon={<Plus />}
					className="font-chalet-1960 h-[48px] w-full justify-center !gap-3 !px-6 md:w-[176px]"
				>
					Post Request
				</Button>
			</div>

			{/* Projects grid - single column on mobile, two columns on desktop */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
				{recentProjectsData.map((project) => (
					<div key={project.id} className="group">
						<div className="relative h-[180px] w-full cursor-pointer overflow-hidden md:h-[260px]">
							<Image
								src={project.imageUrl}
								alt={project.title}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>

							{/* Hover overlay */}
							<div className="absolute inset-0 bg-gradient-to-b from-[#2B2B2B]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

							{/* Status Badge */}
							<div className="absolute top-3 right-3">
								<span
									className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium ${getStatusBadgeColor(project.status.color)}`}
								>
									<Check />
									{project.status.label}
								</span>
							</div>
						</div>

						{/* Project Info */}
						<div className="mt-3 md:mt-4">
							<h3 className="font-chalet-1960 text-[20px] text-[#242424]">
								{project.title}
							</h3>

							{/* Project Details */}
							<div className="mt-2 flex flex-wrap items-center text-[16px]">
								<span>
									<span className="text-[#242424]/70">
										Bids:{' '}
									</span>
									<span className="text-[#242424]">
										{project.bidsCount}
									</span>
								</span>
								<Separator className="mx-3" />
								<span>
									<span className="text-[#242424]/70">
										Posted:{' '}
									</span>
									<span className="text-[#242424]">
										{project.postedDate}
									</span>
								</span>
								<Separator className="mx-3" />
								<span>
									<span className="text-[#242424]/70">
										Budget:{' '}
									</span>
									<span className="text-[#242424]">
										{project.budget}
									</span>
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
