'use client';

import type { JSX } from 'react';
import Image from 'next/image';

import { Button } from '@/shared/components/Button/Button';
import type { ProjectDisplayData } from '../types';

import Check from 'public/icons/profile/symbol-check-small.svg';
import Plus from 'public/icons/profile/plus-white.svg';
import Separator from 'public/icons/profile/separator.svg';

interface RecentProjectsProps {
	projects?: ProjectDisplayData[];
	isLoading?: boolean;
	showAll?: boolean;
	maxItems?: number;
}

const ProjectsLoader = (): JSX.Element => (
	<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
		{[1, 2].map((i) => (
			<div key={i} className="animate-pulse">
				<div className="h-[180px] w-full bg-gray-200 md:h-[260px]"></div>
				<div className="mt-3 space-y-2 md:mt-4">
					<div className="h-5 w-3/4 bg-gray-200"></div>
					<div className="h-4 w-full bg-gray-200"></div>
				</div>
			</div>
		))}
	</div>
);

const EmptyState = (): JSX.Element => (
	<div className="flex flex-col items-center justify-center py-12 text-center">
		<div className="mb-4 text-[#242424]/50">
			<svg
				className="h-16 w-16"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
				/>
			</svg>
		</div>
		<h3 className="mb-2 text-lg font-medium text-[#242424]">
			No projects yet
		</h3>
		<p className="text-[#242424]/50">
			You haven't posted any project requests yet.
		</p>
	</div>
);

export const RecentProjects = ({
	projects = [],
	isLoading = false,
	showAll = false,
	maxItems = 2,
}: RecentProjectsProps): JSX.Element => {
	const handlePostRequest = () => {
		console.log('Post new request');
	};

	const handleViewProject = (projectId: string) => {
		console.log('View project:', projectId);
	};

	const displayProjects = showAll ? projects : projects.slice(0, maxItems);

	return (
		<div className="mb-6 rounded-lg bg-[#F1F3F6] p-6 lg:mb-30 lg:p-10">
			{/* Header section */}
			<div className="mb-6 flex flex-col gap-6 lg:mb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
				<div>
					<h2 className="font-chalet-1960 text-[40px] tracking-[-1px] text-[#242424]">
						{showAll ? 'All Projects' : 'Recent Projects'}
					</h2>
					<p className="font-chalet-1960 text-[16px] text-[#242424]/50">
						{showAll
							? 'All your project requests'
							: 'Your job requests at a glance'}
					</p>
				</div>

				<Button
					onClick={handlePostRequest}
					color="dark"
					iconPosition="left"
					icon={<Plus />}
					className="font-chalet-1960 h-[48px] w-full justify-center !gap-3 !px-6 lg:w-[176px]"
				>
					Post Request
				</Button>
			</div>

			{/* Content section */}
			{isLoading ? (
				<ProjectsLoader />
			) : displayProjects.length === 0 ? (
				<EmptyState />
			) : (
				<>
					{/* Projects grid */}
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-6">
						{displayProjects.map((project) => (
							<div
								key={project.project_id}
								className="group cursor-pointer"
								onClick={() =>
									handleViewProject(project.project_id)
								}
							>
								<div className="relative h-[180px] w-full overflow-hidden md:h-[300px] lg:h-[260px]">
									{/* Project image */}
									<Image
										src={
											project.images[0] ||
											'/placeholder.svg'
										}
										alt={project.title}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 50vw"
									/>
									{/* Hover overlay */}
									<div className="absolute inset-0 bg-gradient-to-b from-[#2B2B2B]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

									{/* Status Badge */}
									<div className="absolute top-4 right-3">
										<span
											className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium ${project.status.bgColor} text-[#242424]`}
										>
											<Check />
											{project.status.label}
										</span>
									</div>
								</div>

								{/* Project Info */}
								<div className="mt-3 lg:mt-4">
									<h3 className="font-chalet-1960 text-[20px] text-[#242424]">
										{project.title}
									</h3>
									{/* Project category */}
									<p className="font-chalet-1960 mt-1 text-[14px] text-[#242424]/70">
										{project.category} • {project.location}
									</p>

									{/* Project Details */}
									<div className="mt-2 flex flex-col items-start text-[16px] sm:flex-row sm:flex-wrap sm:items-center">
										<div className="flex flex-col sm:flex-row sm:items-center">
											<span>
												<span className="text-[#242424]/70">
													Bids:{' '}
												</span>
												<span className="text-[#242424]">
													{project.bidsCount}
												</span>

												<Separator className="mx-3 hidden sm:inline" />
											</span>
										</div>
										<hr className="my-1 w-full opacity-50 sm:hidden" />
										<div className="sm:flex sm:items-center">
											<span>
												<span className="text-[#242424]/70">
													Posted:{' '}
												</span>
												<span className="text-[#242424]">
													{project.postedDate}
												</span>
												<Separator className="mx-3 hidden sm:inline" />
											</span>
										</div>
										<hr className="my-1 w-full opacity-50 sm:hidden" />
										<div>
											<span>
												<span className="text-[#242424]/70">
													Budget:{' '}
												</span>
												<span className="text-[#242424]">
													{project.budgetFormatted}
												</span>
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};
