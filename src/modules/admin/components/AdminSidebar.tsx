'use client';

import { JSX, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAdminProfile } from '@/modules/admin/context/ProfileContext';

import DashboardIcon from 'public/admin-icons/dashboard.svg';
import ManagementIcon from 'public/admin-icons/management.svg';
import SettingsIcon from 'public/admin-icons/settings.svg';
import { useOutsideClose } from '../hooks/useOutsideClose';

type NavItem = {
	href: string;
	label: string;
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const nav: NavItem[] = [
	{ href: '/admin', label: 'Dashboard', Icon: DashboardIcon },
	{ href: '/admin/management', label: 'Management', Icon: ManagementIcon },
];

const AdminSidebar = (): JSX.Element => {
	const pathname = usePathname();

	const profile = useAdminProfile();

	const isActive = (href: string): boolean => {
		if (href === '/admin') return pathname === '/admin';
		return pathname === href || pathname.startsWith(href + '/');
	};

	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useOutsideClose<HTMLDivElement>(() => setMenuOpen(false));

	/* Desktop */
	return (
		<>
			<aside className="fixed top-[69px] left-0 z-10 hidden min-h-full w-[240px] border-r border-[#D5D5D5] bg-white min-[640px]:block">
				<nav
					className="mt-[52px] flex flex-col gap-2"
					aria-label="Sidebar"
				>
					{nav.map((item) => {
						const active = isActive(item.href);
						const { Icon } = item;

						return (
							<Link
								href={item.href}
								key={item.label}
								aria-current={active ? 'page' : undefined}
								className="flex flex-row items-center gap-5"
							>
								<div
									className={`relative left-[-4px] h-[50px] w-[9px] rounded-[4px] ${
										active
											? 'bg-[#003BFF]'
											: 'bg-transparent'
									}`}
									aria-hidden
								/>
								<div
									className={`mr-[23px] flex h-[50px] w-full items-center gap-4 rounded-[6px] pl-[18px] font-semibold transition-colors ${
										active
											? 'bg-[#003BFF] text-white'
											: 'bg-transparent text-[#202224] hover:bg-neutral-100'
									} `}
								>
									<Icon
										className={`[&_*]:fill-current ${
											item.label === 'Management'
												? '[&_*]:stroke-current'
												: ''
										} ${active ? 'text-white' : 'text-[#202224]'} `}
										aria-hidden
									/>
									<span
										className={
											active
												? 'text-white'
												: 'text-[#202224]'
										}
									>
										{item.label}
									</span>
								</div>
							</Link>
						);
					})}
					<Link
						href="/admin/settings"
						aria-current={
							isActive('/admin/settings') ? 'page' : undefined
						}
						className="absolute bottom-[82px] flex w-full flex-row items-center gap-5"
					>
						<div
							className={`relative left-[-4px] h-[50px] w-[9px] rounded-[4px] ${
								isActive('/admin/settings')
									? 'bg-[#003BFF]'
									: 'bg-transparent'
							}`}
							aria-hidden
						/>
						<div
							className={`mr-[23px] flex h-[50px] w-full items-center gap-4 rounded-[6px] pl-[18px] font-semibold transition-colors ${isActive('/admin/settings') ? 'bg-[#003BFF] text-white' : 'bg-transparent text-[#202224] hover:bg-neutral-100'} `}
						>
							<SettingsIcon
								className={`[&_*]:fill-current ${isActive('/admin/settings') ? 'text-white' : 'text-[#202224]'} `}
								aria-hidden
							/>
							<span
								className={
									isActive('/admin/settings')
										? 'text-white'
										: 'text-[#202224]'
								}
							>
								Settings
							</span>
						</div>
					</Link>
				</nav>
			</aside>

			{/* Mobile bottom nav */}
			<aside
				className="fixed inset-x-0 bottom-5 z-20 block min-[640px]:hidden"
				aria-label="Bottom navigation"
			>
				<div className="mx-auto w-full max-w-[560px] px-4">
					<div className="flex items-center justify-between rounded-full bg-[#F5F7FF] px-2 py-2 shadow-md ring-1 ring-black/5">
						<ul className="flex items-center gap-2">
							{[
								...nav,
								{
									href: '/admin/settings',
									label: 'Settings',
									Icon: SettingsIcon,
								},
							].map((item) => {
								const active = isActive(item.href);
								const { Icon } = item;

								return (
									<li key={item.href} className="flex">
										<Link
											href={item.href}
											aria-current={
												active ? 'page' : undefined
											}
											className={[
												'group inline-flex items-center gap-2 rounded-full',
												'h-10 px-3 text-sm font-semibold transition-colors',
												active
													? 'bg-[#E7EEFF] text-[#003BFF]'
													: 'text-[#202224] hover:bg-white/70',
											].join(' ')}
										>
											<span
												className={[
													'inline-flex h-8 w-8 items-center justify-center rounded-full',
													active
														? 'bg-white/0'
														: 'bg-white',
												].join(' ')}
											>
												<Icon
													className={[
														'[&_*]:fill-current',
														item.label ===
														'Management'
															? '[&_*]:stroke-current'
															: '',
														active
															? 'text-[#003BFF]'
															: 'text-[#202224]',
													].join(' ')}
													aria-hidden
												/>
											</span>
											{active && (
												<span>{item.label}</span>
											)}
										</Link>
									</li>
								);
							})}
						</ul>
						<div className="relative">
							<button
								type="button"
								onClick={() => setMenuOpen((v) => !v)}
								aria-haspopup="menu"
								aria-expanded={menuOpen}
								className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ring-2 ring-white"
								title={profile?.name}
							>
								<img
									src={
										profile?.avatar ??
										'/images/Profile/mock-avatar.jpg'
									}
									alt={profile?.name ?? 'User'}
								/>
							</button>

							{menuOpen && (
								<div
									ref={menuRef}
									role="menu"
									className="absolute right-0 bottom-12 z-50 w-48 overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg ring-1 ring-black/5"
								>
									<button
										role="menuitem"
										onClick={() => {
											setMenuOpen(false);
										}}
										className="block w-full px-4 py-2 text-left text-sm hover:bg-neutral-100"
									>
										Log Out
									</button>
									<button
										role="menuitem"
										onClick={() => {
											setMenuOpen(false);
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
			</aside>
		</>
	);
};

export default AdminSidebar;
