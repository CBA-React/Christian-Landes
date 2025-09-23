'use client';

import {
	createContext,
	JSX,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

import { axiosInstance } from '@/shared/lib/axiosInstance';

type Profile = { name: string; avatar: string } | null;

const Ctx = createContext<Profile>(null);

export function AdminProfileProvider({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const [profile, setProfile] = useState<Profile>(null);

	useEffect(() => {
		let cancel = false;
		(async (): Promise<void> => {
			try {
				const { data } = await axiosInstance.get<{
					full_name: string;
					logo: { url: string } | null;
				}>('/admin/profile');
				console.log('Loaded admin profile', data);

				if (cancel) return;
				setProfile({
					name: data?.full_name || 'User',
					avatar:
						data?.logo?.url || '/images/Profile/mock-avatar.jpg',
				});
			} catch (e) {
				if (!cancel)
					setProfile({
						name: 'User',
						avatar: '/images/Profile/mock-avatar.jpg',
					});
				console.error('Failed to load admin profile', e);
			}
		})();
		return (): void => {
			cancel = true;
		};
	}, []);

	return <Ctx.Provider value={profile}>{children}</Ctx.Provider>;
}

export const useAdminProfile = (): Profile => useContext(Ctx);
