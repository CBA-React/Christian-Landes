'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';

export default function ProfilePage() {
	const router = useRouter();

	useEffect(() => {
		router.push('/profile/overview');
	}, [router]);

	return (
		<div className="flex h-screen items-center justify-center">
			<LoadingSpinner />
		</div>
	);
}
