import { useQuery } from '@tanstack/react-query';
import { AuthRole } from '@/shared/lib/roleMapper';
import { ProfileApi } from '../services/ProfileApi';
import { CACHE_CONFIG } from '../services/constants';
import type {
	ProfileData,
	StatItem,
	ProjectsResponse,
} from '../services/types';

export function useProfile(authRole: AuthRole | null) {
	return useQuery({
		queryKey: ['profile', authRole],
		queryFn: () => {
			if (!authRole) throw new Error('Auth role is required');
			return ProfileApi.getProfile(authRole);
		},
		enabled: !!authRole,
		staleTime: CACHE_CONFIG.PROFILE_STALE_TIME,
		retry: 2,
	});
}

export function useProfileStats(authRole: AuthRole | null) {
	return useQuery({
		queryKey: ['profile-stats', authRole],
		queryFn: () => {
			if (!authRole) throw new Error('Auth role is required');
			return ProfileApi.getMetrics(authRole);
		},
		enabled: !!authRole,
		staleTime: CACHE_CONFIG.STATS_STALE_TIME,
		retry: 2,
		refetchInterval: CACHE_CONFIG.STATS_REFETCH_INTERVAL,
	});
}

export function useProjects(
	authRole: AuthRole | null,
	page: number = 1,
	perPage: number = 6,
) {
	return useQuery({
		queryKey: ['profile-projects', authRole, page, perPage],
		queryFn: () => {
			if (!authRole) throw new Error('Auth role is required');
			return ProfileApi.getProjects(authRole, page, perPage);
		},
		enabled: !!authRole,
		staleTime: CACHE_CONFIG.PROJECTS_STALE_TIME,
		retry: 2,
		select: (data: ProjectsResponse) => ({
			...data,
			displayData: ProfileApi.transformProjectsForDisplay(data.data),
		}),
	});
}

export interface UseProfileDataReturn {
	profile?: ProfileData;
	stats?: StatItem[];
	projects?: ProjectsResponse & { displayData: any[] };

	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	hasEssentialData: boolean;

	profileState: {
		isLoading: boolean;
		isError: boolean;
		error: Error | null;
	};
	statsState: {
		isLoading: boolean;
		isError: boolean;
		error: Error | null;
	};
	projectsState: {
		isLoading: boolean;
		isError: boolean;
		error: Error | null;
	};

	refetch: () => void;
	refetchProfile: () => void;
	refetchStats: () => void;
	refetchProjects: () => void;
}

export function useProfileData(
	authRole: AuthRole | null,
): UseProfileDataReturn {
	const profileQuery = useProfile(authRole);
	const statsQuery = useProfileStats(authRole);
	const projectsQuery = useProjects(authRole, 1, 6);

	const isLoading = profileQuery.isLoading || statsQuery.isLoading;
	const isError = profileQuery.isError || statsQuery.isError;
	const error = profileQuery.error || statsQuery.error;

	const hasEssentialData = !!profileQuery.data && !!statsQuery.data;

	return {
		profile: profileQuery.data,
		stats: statsQuery.data,
		projects: projectsQuery.data,

		isLoading,
		isError,
		error,
		hasEssentialData,

		profileState: {
			isLoading: profileQuery.isLoading,
			isError: profileQuery.isError,
			error: profileQuery.error,
		},
		statsState: {
			isLoading: statsQuery.isLoading,
			isError: statsQuery.isError,
			error: statsQuery.error,
		},
		projectsState: {
			isLoading: projectsQuery.isLoading,
			isError: projectsQuery.isError,
			error: projectsQuery.error,
		},

		refetch: () => {
			profileQuery.refetch();
			statsQuery.refetch();
			projectsQuery.refetch();
		},
		refetchProfile: profileQuery.refetch,
		refetchStats: statsQuery.refetch,
		refetchProjects: projectsQuery.refetch,
	};
}
