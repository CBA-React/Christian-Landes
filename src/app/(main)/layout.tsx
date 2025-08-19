import '@/app/globals.css';

import { JSX, ReactNode } from 'react';

import { Footer } from '@/shared/components/Footer/Footer';
import { Header } from '@/shared/components/Header/Header';

export default function MainLayout({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		<html lang="en">
			<body>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
