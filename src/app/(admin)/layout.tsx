'use client';

import { JSX, ReactNode } from 'react';
import Link from 'next/link';

import AdminSidebar from '@/modules/admin/components/AdminSidebar';
import {
	AdminProfileProvider,
	useAdminProfile,
} from '@/modules/admin/context/ProfileContext';

import Logo from 'public/logo-admin.svg';

function HeaderProfile(): JSX.Element {
	const profile = useAdminProfile();
	return (
		<div className="hidden w-full max-w-[1388px] min-[640px]:block">
			<Link href="/" className="absolute top-4 left-[26px] z-50">
				<Logo />
			</Link>
			<div className="flex w-full items-center justify-end pr-[31px] pl-[320px]">
				<div className="flex items-center gap-3">
					{profile && (
						<img
							src={profile.avatar}
							alt={profile.name}
							className="hidden h-9 w-9 rounded-full object-cover ring-1 ring-black/5 sm:block"
						/>
					)}
					<div className="hidden text-right sm:block">
						<div className="text-sm font-medium">
							{profile?.name ?? 'User'}
						</div>
						<div className="text-start text-xs text-neutral-500">
							Admin
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function AdminLayout({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		<AdminProfileProvider>
			<div className="h-[100vh] bg-neutral-100 text-neutral-900">
				<header className="fixed z-30 flex h-[64px] w-full flex-row items-center justify-center border-b border-[#D5D5D5] bg-white min-[640px]:h-[70px] min-[640px]:justify-end">
					<Link href="/" className="min-[640px]:hidden">
						<Logo />
					</Link>
					<HeaderProfile />
				</header>

				<div className="flex">
					<main className="mt-[64px] w-full overflow-hidden p-5 max-[640px]:!pb-25 min-[640px]:mt-17.5 min-[640px]:ml-[240px] min-[640px]:p-8">
						{children}
					</main>
				</div>
				<AdminSidebar />
			</div>
		</AdminProfileProvider>
	);
}
