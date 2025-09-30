'use client';

import { JSX, useState, useMemo, useCallback } from 'react';
import { ProjectsFilter } from './ProjectsFilter';
import { ProjectCard } from './ProjectCard';
import { useAvailableProjects } from '../../hooks/useAvailableProjects';
import { FilterDrawer } from '@/shared/components/FilterDrawer/FilterDrawer';
import { ProjectFilterForm, ProjectFilterFormData } from './ProjectFilterForm';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage/ErrorMessage';

const EmptyState = ({ message }: { message: string }) => (
	<section
		className="flex flex-col items-center justify-center py-12 text-center"
		aria-live="polite"
	>
		<div className="mb-4 text-[#242424]/30" aria-hidden="true">
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
		<h2 className="mb-2 text-lg font-medium text-[#242424]">
			No projects available
		</h2>
		<p className="text-[#242424]/50">{message}</p>
	</section>
);

const ProjectsList = ({
	projects,
	hasMore,
	isLoadingMore,
	onLoadMore,
	onProjectClick,
}: {
	projects: any[];
	hasMore: boolean;
	isLoadingMore: boolean;
	onLoadMore: () => void;
	onProjectClick: (id: string) => void;
}) => (
	<>
		<section
			className="grid grid-cols-1 gap-6 gap-y-6 md:grid-cols-2 md:gap-y-10 xl:grid-cols-3"
			aria-label="List of projects"
		>
			{projects.map((project) => (
				<article key={project.id}>
					<ProjectCard
						id={project.id}
						title={project.title}
						location={project.location}
						description={project.description}
						price={project.budgetFormatted}
						imageUrl={project.images[0]}
						category={project.category}
						onCardClick={onProjectClick}
						className="w-full"
					/>
				</article>
			))}
		</section>

		{hasMore && (
			<nav
				className="mt-20 mb-5 flex justify-center md:mb-20"
				aria-label="Load more projects"
			>
				<button
					onClick={onLoadMore}
					disabled={isLoadingMore}
					className="flex cursor-pointer items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isLoadingMore ? (
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
			</nav>
		)}
	</>
);

export const AvailableProjects = (): JSX.Element => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	);
	const [isFilterDrawerOpen, setIsFilterDrawerOpen] =
		useState<boolean>(false);

	const [activeFilters, setActiveFilters] = useState<ProjectFilterFormData>({
		search: '',
		location: '',
		date: '',
		minBudget: 0,
		maxBudget: 50000,
		category: '',
	});

	const filters = useMemo(
		() => ({
			...(selectedCategory && { category: selectedCategory }),
			...activeFilters,
		}),
		[selectedCategory, activeFilters],
	);

	const {
		data,
		error,
		isLoading,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		refetch,
	} = useAvailableProjects(filters);

	const allProjects = data?.pages.flatMap((page) => page.data) || [];

	const handleCategoryChange = useCallback((category: string | null) => {
		setSelectedCategory(category);
		setActiveFilters((prev) => ({
			...prev,
			category: category || '',
		}));
	}, []);

	const handleProjectClick = useCallback((projectId: string) => {
		console.log('Project clicked:', projectId);
	}, []);

	const handleFiltersClick = useCallback(() => {
		setIsFilterDrawerOpen(true);
	}, []);

	const handleFiltersChange = useCallback(
		(newFilters: ProjectFilterFormData) => {
			setActiveFilters(newFilters);
			setSelectedCategory(newFilters.category || null);
		},
		[],
	);

	const handleApplyFilters = useCallback(() => {
		setIsFilterDrawerOpen(false);
	}, []);

	const handleClearFilters = useCallback(() => {
		const clearedFilters: ProjectFilterFormData = {
			search: '',
			location: '',
			date: '',
			minBudget: 0,
			maxBudget: 50000,
			category: '',
		};
		setActiveFilters(clearedFilters);
		setSelectedCategory(null);
	}, []);

	const getEmptyMessage = () => {
		if (selectedCategory) {
			return `No projects found in "${selectedCategory}" category.`;
		}
		return 'Check back later for new opportunities.';
	};

	if (isLoading || (!data && !error)) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<ErrorMessage
				message="Failed to load projects"
				onRetry={() => refetch()}
			/>
		);
	}

	return (
		<section className="mb-10 w-full max-w-full overflow-hidden">
			<div className="mb-6 md:mb-6">
				<h1 className="text-[36px] font-medium tracking-[-1px] text-[#242424] lg:text-[40px]">
					Available Projects
				</h1>
				<p className="text-[16px] text-[#242424]/60">
					Find your next opportunity from our available projects
				</p>
			</div>

			<nav aria-label="Filter projects by category">
				<ProjectsFilter
					selectedCategory={selectedCategory}
					onCategoryChange={handleCategoryChange}
					onFiltersClick={handleFiltersClick}
				/>
			</nav>

			{allProjects.length > 0 ? (
				<>
					<ProjectsList
						projects={allProjects}
						hasMore={!!hasNextPage}
						isLoadingMore={isFetchingNextPage}
						onLoadMore={() => fetchNextPage()}
						onProjectClick={handleProjectClick}
					/>

					{isFetching && !isFetchingNextPage && (
						<div className="flex justify-center py-4">
							<div className="flex items-center gap-3">
								<div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
								<span className="text-sm text-gray-600">
									Updating...
								</span>
							</div>
						</div>
					)}
				</>
			) : (
				<EmptyState message={getEmptyMessage()} />
			)}

			<FilterDrawer
				isOpen={isFilterDrawerOpen}
				onClose={() => setIsFilterDrawerOpen(false)}
			>
				<ProjectFilterForm
					filters={activeFilters}
					onFiltersChange={handleFiltersChange}
					onApply={handleApplyFilters}
					onClear={handleClearFilters}
					onClose={() => setIsFilterDrawerOpen(false)}
					currentCategory={selectedCategory}
				/>
			</FilterDrawer>
		</section>
	);
};
