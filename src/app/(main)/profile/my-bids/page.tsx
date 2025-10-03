'use client';

import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';
import { MyBids } from '@/modules/MyBids/components/MyBids';
import { JSX } from 'react';

export default function MyBidsPage(): JSX.Element {
	return (
		<ProfileLayout showHeader={true} showSidebar={true}>
			<MyBids />
		</ProfileLayout>
	);
}
