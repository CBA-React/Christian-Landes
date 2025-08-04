'use client';

import { JSX, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

const queryClient = new QueryClient();

export const AppProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
    );
};
