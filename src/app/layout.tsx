import './globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';

import { AppProvider } from './Provider';

export const metadata: Metadata = {
    title: 'CBA Project setup',
    description: 'Custom setup by CBA',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): ReactNode | Promise<ReactNode> {
    return (
        <html lang="en">
            <body>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
