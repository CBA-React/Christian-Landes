'use client';

import { JSX, ReactNode, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

import AdminSidebar from '@/modules/admin/components/AdminSidebar';
import { ConfirmActionModal } from '@/modules/admin/components/ConfirmActionModal';
import {
	AdminProfileProvider,
	useAdminProfile,
} from '@/modules/admin/context/ProfileContext';
import { useOutsideClose } from '@/modules/admin/hooks/useOutsideClose';
import { UsersApi } from '@/modules/admin/services/UsersApi';
import { logout } from '@/modules/auth/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore';
import { decodeJwt } from '@/shared/lib/decodeJwt';

import More from 'public/admin-icons/more.svg';
import Logo from 'public/logo-admin.svg';

function HeaderProfile(): JSX.Element {
	const profile = useAdminProfile();
	const [open, setOpen] = useState(false);
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const popoverRef = useOutsideClose<HTMLDivElement>(() => setOpen(false));
	const [logoutOpen, setLogoutOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const dispatch = useAppDispatch();
	const token = useAppSelector((s) => s.auth.token);

	const currentUserId = useMemo(() => {
		if (!token) return null;
		try {
			const payload = decodeJwt(token);
			const raw = payload?.sub ?? payload?.user_id;
			return raw != null ? Number(raw) : null;
		} catch {
			return null;
		}
	}, [token]);

	return (
		<>
			<div className="hidden w-full max-w-[1388px] min-[640px]:block">
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
						<button
							ref={btnRef}
							type="button"
							aria-haspopup="menu"
							aria-expanded={open}
							onClick={() => setOpen((v) => !v)}
							className="cursor-pointer transition-transform outline-none"
							title="More"
						>
							<More
								className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
							/>
						</button>
						{open && (
							<div
								ref={popoverRef}
								role="menu"
								aria-label="Profile menu"
								className="absolute top-11 right-0 z-50 w-44 overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg ring-1 ring-black/5"
							>
								<button
									role="menuitem"
									onClick={() => {
										setOpen(false);
										setLogoutOpen(true);
									}}
									className="block w-full px-4 py-2 text-left text-sm hover:bg-neutral-100"
								>
									Log Out
								</button>
								<button
									role="menuitem"
									onClick={() => {
										setOpen(false);
										setDeleteOpen(true);
									}}
									className="block w-full px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
								>
									Delete Account
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<ConfirmActionModal
				open={logoutOpen}
				variant="logout"
				onClose={() => setLogoutOpen(false)}
				onConfirm={() => {
					dispatch(logout());
					window.location.href = '/login';
				}}
			/>
			<ConfirmActionModal
				open={deleteOpen}
				variant="delete"
				onClose={() => setDeleteOpen(false)}
				onConfirm={async () => {
					if (!currentUserId) return;
					try {
						await UsersApi.deleteUser(currentUserId);
					} finally {
						dispatch(logout());
						window.location.href = '/login';
					}
				}}
			/>
		</>
	);
}

export default function AdminLayout({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		<AdminProfileProvider>
			<div className="h-[100%] bg-neutral-100 text-neutral-900">
				<header className="fixed z-100 flex h-[64px] w-full flex-row items-center justify-center border-b border-[#D5D5D5] bg-white min-[640px]:h-[70px] min-[640px]:justify-end">
					<Link
						href="/"
						className="min-[640px]:absolute min-[640px]:top-4 min-[640px]:left-[26px] min-[640px]:z-110"
					>
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
