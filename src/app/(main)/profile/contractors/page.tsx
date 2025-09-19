'use client';

import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';
import { JSX } from 'react';

export default function ContractorsPage(): JSX.Element {
	return (
		<ProfileLayout showHeader={true} showSidebar={true}>
			<div className="rounded-lg bg-[#F1F3F6] p-6 lg:p-10">
				<h1 className="mb-4 text-[40px] tracking-[-1px] text-[#242424]">
					Contractors
				</h1>
				<p className="mb-6 text-[16px] text-[#242424]/50">
					Browse and contact contractors in your area
				</p>
				<div className="rounded-lg bg-white p-6">
					<p className="text-center text-[#242424]">
						Contractors directory coming soon...
					</p>
				</div>
			</div>
		</ProfileLayout>
	);
}
