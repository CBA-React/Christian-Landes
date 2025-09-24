'use client';

import { JSX, useState, useEffect, useCallback, useRef } from 'react';
import { ProjectsFilter } from './ProjectsFilter';
import { ProjectCard } from './ProjectCard';
import { ProjectDisplayData, SimpleProjectFilters } from '../types/type';
import { ProjectsApi } from '../services/AvailableProjectsApi';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';

interface AvailableProjectsProps {
	initialProjects?: ProjectDisplayData[];
}

export const AvailableProjects = ({
	initialProjects = [],
}: AvailableProjectsProps): JSX.Element => {
	const [projects, setProjects] =
		useState<ProjectDisplayData[]>(initialProjects);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	);
	const [filters, setFilters] = useState<SimpleProjectFilters>({});
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const abortControllerRef = useRef<AbortController | null>(null);
	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isComponentMountedRef = useRef(true);

	useEffect(() => {
		isComponentMountedRef.current = true;
		return () => {
			isComponentMountedRef.current = false;
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
		};
	}, []);

	const loadProjects = useCallback(
		async (
			newFilters: SimpleProjectFilters = {},
			page: number = 1,
			isLoadMore: boolean = false,
			signal?: AbortSignal,
		) => {
			if (
				abortControllerRef.current &&
				!abortControllerRef.current.signal.aborted
			) {
				abortControllerRef.current.abort();
			}

			const controller = signal ? null : new AbortController();
			if (controller) {
				abortControllerRef.current = controller;
			}
			const requestSignal = signal || controller?.signal;

			if (isLoadMore) {
				setIsLoadingMore(true);
			} else {
				setIsLoading(true);
			}
			setError(null);

			try {
				const response = await ProjectsApi.getProjects({
					page,
					perPage: 6, 
					filters: newFilters,
				});

				if (requestSignal?.aborted) {
					return;
				}

				if (!isComponentMountedRef.current) {
					return;
				}

				const transformedProjects =
					ProjectsApi.transformProjectsForDisplay(response.data);

				if (isLoadMore) {
					setProjects((prev) => [...prev, ...transformedProjects]);
				} else {
					setProjects(transformedProjects);
					setCurrentPage(1);
				}

				const totalPages = response.pagination?.totalPages || 1;
				setHasMore(page < totalPages);

				if (isLoadMore) {
					setCurrentPage((prev) => prev + 1);
				}

				setError(null);
			} catch (err: any) {
				if (err.name === 'AbortError' || requestSignal?.aborted) {
					return;
				}

				if (!isComponentMountedRef.current) return;

				let errorMessage = 'Failed to load projects. Please try again.';

				if (
					err.code === 'ECONNABORTED' ||
					err.message?.includes('timeout')
				) {
					errorMessage =
						'Request timed out. Please try again or slow down category switching.';
				} else if (err.response?.status >= 500) {
					errorMessage = 'Server error. Please try again later.';
				} else if (err.response?.status === 429) {
					errorMessage =
						'Too many requests. Please wait a moment and try again.';
				}

				setError(errorMessage);
			} finally {
				if (isComponentMountedRef.current) {
					setIsLoading(false);
					setIsLoadingMore(false);
				}
			}
		},
		[],
	);

	const debouncedLoadProjects = useCallback(
		(newFilters: SimpleProjectFilters) => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}

			debounceTimeoutRef.current = setTimeout(() => {
				loadProjects(newFilters, 1, false);
			}, 300);
		},
		[loadProjects],
	);

	const handleLoadMore = useCallback(() => {
		loadProjects(filters, currentPage + 1, true);
	}, [loadProjects, filters, currentPage]);

	const handleCategoryChange = useCallback(
		async (category: string | null) => {
			setSelectedCategory(category);
			setCurrentPage(1);

			const newFilters: SimpleProjectFilters = category
				? { category }
				: {};
			setFilters(newFilters);

			debouncedLoadProjects(newFilters);
		},
		[debouncedLoadProjects],
	);

	const handleProjectClick = useCallback((projectId: string) => {
		console.log('Project clicked:', projectId);
	}, []);

	const handleRetry = useCallback(() => {
		loadProjects(filters, 1, false);
	}, [loadProjects, filters]);

	useEffect(() => {
		if (initialProjects.length === 0) {
			loadProjects();
		}
	}, [loadProjects, initialProjects.length]);

	return (
		<ProfileLayout showHeader={true} showSidebar={true}>
			<div className="mb-10 w-full max-w-full overflow-hidden">
				<div className="mb-4 md:mb-6">
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

				{isLoading && (
					<div className="flex justify-center py-30">
						<div className="flex items-center gap-3">
							<div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
							<span className="text-gray-600">
								Loading projects...
							</span>
						</div>
					</div>
				)}

				{!isLoading && (
					<>
						{projects.length > 0 ? (
							<>
								<div className="grid grid-cols-1 gap-6 gap-y-6 md:grid-cols-2 md:gap-y-10 xl:grid-cols-3">
									{projects.map((project) => (
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

								{hasMore && (
									<div className="mt-20 mb-5 flex justify-center md:mb-20">
										<button
											onClick={handleLoadMore}
											disabled={isLoadingMore}
											className="flex cursor-pointer items-center gap-2"
										>
											{isLoadingMore ? (
												<>
													<div className="flex justify-center py-8">
														<div className="flex items-center gap-3">
															<div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
															<span className="text-gray-600">
																Loading
																projects...
															</span>
														</div>
													</div>
												</>
											) : (
												<div className="flex items-center gap-2">
													<span className="text-[36px] text-[#242424] md:text-[40px]">
														Load More +
													</span>
												</div>
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
											d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
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
					</>
				)}
			</div>
		</ProfileLayout>
	);
};
