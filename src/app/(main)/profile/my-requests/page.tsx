'use client';

import { JSX } from 'react';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary';
import { MyRequests } from '@/modules/MyRequests/components/MyRequests';

export default function MyRequestsPage(): JSX.Element {
	return (
		<ErrorBoundary>
			<ProfileLayout showHeader={true} showSidebar={true}>
				<MyRequests />
			</ProfileLayout>
		</ErrorBoundary>
	);
}
