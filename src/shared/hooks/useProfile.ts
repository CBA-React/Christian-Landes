import { useQuery } from '@tanstack/react-query';
import { AuthRole } from '@/shared/lib/roleMapper';
import { ProfileApi } from '../api/ProfileApi';
import { PROFILE_CACHE_CONFIG } from '../constants/profile';

export function useProfile(authRole: AuthRole | null) {
	return useQuery({
		queryKey: ['profile', authRole],
		queryFn: () => {
			if (!authRole) throw new Error('Auth role is required');
			return ProfileApi.getProfile(authRole);
		},
		enabled: !!authRole,
		staleTime: PROFILE_CACHE_CONFIG.PROFILE_STALE_TIME,
		retry: 2,
	});
}
