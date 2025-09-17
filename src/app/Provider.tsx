'use client';

import { JSX, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

const queryClient = new QueryClient();

import { useEffect } from 'react';
import { Toaster } from 'sonner';

import { login, logout, setHydrated } from '@/modules/auth/slices/authSlice';
import { useAppDispatch } from '@/shared/hooks/useStore';

function AuthHydrator(): null {
	const dispatch = useAppDispatch();

	useEffect(() => {
		try {
			const token = localStorage.getItem('access_token');
			const email = localStorage.getItem('email') || '';
			if (token) dispatch(login({ token, email }));
			else dispatch(logout());
		} finally {
			dispatch(setHydrated(true));
		}
	}, [dispatch]);

	return null;
}

export const AppProvider = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<AuthHydrator />
				<Toaster position="top-center" richColors closeButton />
				{children}
			</QueryClientProvider>
		</Provider>
	);
};
