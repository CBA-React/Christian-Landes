'use client';

import { JSX, useState, useMemo } from 'react';
import { ProjectsFilter } from './ProjectsFilter';
import { ProjectCard } from './ProjectCard';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';
import { useAvailableProjects } from '../hooks/useAvailableProjects';

export const AvailableProjects = ({}): JSX.Element => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	);

	const filters = useMemo(
		() => ({
			...(selectedCategory && { category: selectedCategory }),
		}),
		[selectedCategory],
	);

	const {
		data,
		error,
		isLoading,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		refetch,
	} = useAvailableProjects(filters);

	const allProjects = data?.pages.flatMap((page) => page.data) || [];

	const handleCategoryChange = (category: string | null) => {
		setSelectedCategory(category);
	};

	const handleProjectClick = (projectId: string) => {
		console.log('Project clicked:', projectId);
	};

	if (isLoading) {
		return (
			<ProfileLayout showHeader={true} showSidebar={true}>
				<section className="mb-10 w-full max-w-full overflow-hidden">
					<div className="mb-6 md:mb-6">
						<h1 className="text-[36px] font-medium tracking-[-1px] text-[#242424] lg:text-[40px]">
							Available Projects
						</h1>
						<p className="text-[16px] text-[#242424]/60">
							Find your next opportunity from our available
							projects
						</p>
					</div>

					<div className="w-full">
						<ProjectsFilter
							selectedCategory={selectedCategory}
							onCategoryChange={handleCategoryChange}
						/>
					</div>

					<div className="flex justify-center py-20">
						<div className="flex items-center gap-3">
							<div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
							<span className="text-gray-600">
								Loading projects...
							</span>
						</div>
					</div>
				</section>
			</ProfileLayout>
		);
	}

	if (error) {
		return (
			<ProfileLayout showHeader={true} showSidebar={true}>
				<section className="mb-10 w-full max-w-full overflow-hidden">
					<div className="flex flex-col items-center justify-center py-12 text-center">
						<div className="mb-4 text-red-500">
							<svg
								className="mx-auto h-16 w-16"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
								/>
							</svg>
						</div>
						<h3 className="mb-2 text-lg font-medium text-[#242424]">
							Error loading projects
						</h3>
						<p className="mb-4 text-[#242424]/50">
							{error instanceof Error
								? error.message
								: 'Something went wrong'}
						</p>
						<button
							onClick={() => refetch()}
							className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
						>
							Try Again
						</button>
					</div>
				</section>
			</ProfileLayout>
		);
	}

	return (
		<ProfileLayout showHeader={true} showSidebar={true}>
			<section className="mb-10 w-full max-w-full overflow-hidden">
				<div className="mb-6 md:mb-6">
					<h1 className="text-[36px] font-medium tracking-[-1px] text-[#242424] lg:text-[40px]">
						Available Projects
					</h1>
					<p className="text-[16px] text-[#242424]/60">
						Find your next opportunity from our available projects
					</p>
				</div>

				<div className="w-full">
					<ProjectsFilter
						selectedCategory={selectedCategory}
						onCategoryChange={handleCategoryChange}
					/>
				</div>

				{allProjects.length > 0 ? (
					<>
						<div className="grid grid-cols-1 gap-6 gap-y-6 md:grid-cols-2 md:gap-y-10 xl:grid-cols-3">
							{allProjects.map((project) => (
								<ProjectCard
									key={project.id}
									id={project.id}
									title={project.title}
									location={project.location}
									description={project.description}
									price={project.budgetFormatted}
									imageUrl={project.images[0]}
									category={project.category}
									onCardClick={handleProjectClick}
									className="w-full"
								/>
							))}
						</div>

						{hasNextPage && (
							<div className="mt-20 mb-5 flex justify-center md:mb-20">
								<button
									onClick={() => fetchNextPage()}
									disabled={isFetchingNextPage}
									className="flex cursor-pointer items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
								>
									{isFetchingNextPage ? (
										<div className="flex items-center gap-3">
											<div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
											<span className="text-gray-600">
												Loading projects...
											</span>
										</div>
									) : (
										<span className="text-[36px] text-[#242424] transition-colors hover:text-blue-600 md:text-[40px]">
											Load More +
										</span>
									)}
								</button>
							</div>
						)}
					</>
				) : (
					<div className="flex flex-col items-center justify-center py-12 text-center">
						<div className="mb-4 text-[#242424]/30">
							<svg
								className="mx-auto h-16 w-16"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10"
								/>
							</svg>
						</div>
						<h3 className="mb-2 text-lg font-medium text-[#242424]">
							No projects available
						</h3>
						<p className="text-[#242424]/50">
							{selectedCategory
								? `No projects found in "${selectedCategory}" category.`
								: 'Check back later for new opportunities.'}
						</p>
					</div>
				)}
			</section>
		</ProfileLayout>
	);
};
