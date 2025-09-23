// pages/profile/requests/page.tsx (или где у тебя роутинг)
'use client';

import { JSX, useEffect, useState } from 'react';
import { RequestsApi } from '../../../../modules/MyRequests/services/RequestsApi';
import { MyRequests } from '../../../../modules/MyRequests/components/MyRequests';
import { RequestDisplayData } from '../../../../modules/MyRequests/type';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';

export default function MyRequestsPage(): JSX.Element {
	const [requests, setRequests] = useState<RequestDisplayData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const requestsResponse = await RequestsApi.getRequests({
					page: 1,
					perPage: 6,
				});

				const displayRequests = RequestsApi.transformRequestsForDisplay(
					requestsResponse.data,
				);

				setRequests(displayRequests);
			} catch (err) {
				console.error('Failed to load requests:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRequests();
	}, []);

	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<MyRequests initialRequests={requests} />
			)}
		</>
	);
}
