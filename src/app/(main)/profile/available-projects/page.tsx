'use client';

import { JSX } from 'react';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary';
import { AvailableProjects } from '@/modules/AvailableProjects/components/AvailableProjects';

export default function AvailableProjectsPage(): JSX.Element {
	return (
		<ErrorBoundary>
			<ProfileLayout showHeader={true} showSidebar={true}>
				<AvailableProjects />
			</ProfileLayout>
		</ErrorBoundary>
	);
}
