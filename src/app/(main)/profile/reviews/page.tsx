'use client';

import { JSX } from 'react';
import { useAppSelector } from '@/shared/hooks/useStore';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';

export default function ReviewsPage(): JSX.Element {
	const authRole = useAppSelector((state) => state.auth.role);
	const isContractor = authRole === 2;

	return (
		<ProfileLayout showHeader={true} showSidebar={true}>
			<div className="rounded-lg bg-[#F1F3F6] p-6 lg:p-10">
				<h1 className="mb-4 text-[40px] tracking-[-1px] text-[#242424]">
					Reviews
				</h1>
				<p className="mb-6 text-[16px] text-[#242424]/50">
					{isContractor
						? 'Reviews from your clients'
						: "Reviews you've left for contractors"}
				</p>
				<div className="rounded-lg bg-white p-6">
					<p className="text-center text-[#242424]">
						Reviews system coming soon...
					</p>
				</div>
			</div>
		</ProfileLayout>
	);
}
