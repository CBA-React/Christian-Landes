import { JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import DashboardIcon from 'public/admin-icons/dashboard.svg';
import ManagementIcon from 'public/admin-icons/management.svg';
import SettingsIcon from 'public/admin-icons/settings.svg';

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

	const isActive = (href: string): boolean => {
		if (href === '/admin') return pathname === '/admin';
		return pathname === href || pathname.startsWith(href + '/');
	};
	return (
		<aside className="fixed top-[69px] left-0 z-10 min-h-full w-[240px] border-r border-[#D5D5D5] bg-white">
			{/* Desktop */}
			<nav className="mt-[52px] flex flex-col gap-2" aria-label="Sidebar">
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
									active ? 'bg-[#003BFF]' : 'bg-transparent'
								}`}
								aria-hidden
							/>
							<div
								className={`mr-[23px] flex h-[50px] w-full items-center gap-4 rounded-[6px] pl-[18px] font-semibold transition-colors ${active ? 'bg-[#003BFF] text-white' : 'bg-transparent text-[#202224] hover:bg-neutral-100'} `}
							>
								<Icon
									className={`[&_*]:fill-current ${item.label === 'Management' ? '[&_*]:stroke-current' : ''} ${active ? 'text-white' : 'text-[#202224]'} `}
									aria-hidden
								/>
								<span
									className={
										active ? 'text-white' : 'text-[#202224]'
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
	);
};

export default AdminSidebar;
