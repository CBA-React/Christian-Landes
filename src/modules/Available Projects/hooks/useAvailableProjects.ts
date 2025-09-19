// import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
// import { ProjectsApi } from '../services/AvailableProjectsApi';
// import type { ProjectFilters } from '../types/type';

// export function useProjects(
// 	page: number = 1,
// 	perPage: number = 6,
// 	filters?: ProjectFilters,
// ) {
// 	return useQuery({
// 		queryKey: ['projects', page, perPage, filters],
// 		queryFn: () => ProjectsApi.getProjects({ page, perPage, filters }),
// 		staleTime: 5 * 60 * 1000,
// 		select: (data) => ({
// 			...data,
// 			displayData: ProjectsApi.transformProjectsForDisplay(data.data),
// 		}),
// 	});
// }

// export function useInfiniteProjects(
// 	perPage: number = 6,
// 	filters?: ProjectFilters,
// ) {
// 	return useInfiniteQuery({
// 		queryKey: ['projects-infinite', perPage, filters],
// 		queryFn: ({ pageParam = 1 }) =>
// 			ProjectsApi.getProjects({ page: pageParam, perPage, filters }),
// 		getNextPageParam: (lastPage) => {
// 			const { page, totalPages } = lastPage.pagination;
// 			return page < totalPages ? page + 1 : undefined;
// 		},
// 		staleTime: 5 * 60 * 1000,
// 		select: (data) => ({
// 			pages: data.pages.map((page) => ({
// 				...page,
// 				displayData: ProjectsApi.transformProjectsForDisplay(page.data),
// 			})),
// 			pageParams: data.pageParams,
// 		}),
// 	});
// }
