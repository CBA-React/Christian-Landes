import './globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Script from 'next/script';

import { AppProvider } from './Provider';

const dmSans = DM_Sans({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
	variable: '--font-dm-sans',
});

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
		<html lang="en" className={dmSans.variable}>
			<body className="font-sans">
				<Script
					src="https://accounts.google.com/gsi/client"
					strategy="afterInteractive"
				/>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
