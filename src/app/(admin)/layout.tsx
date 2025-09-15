'use client';

import { JSX, ReactNode } from 'react';
import Link from 'next/link';

import AdminSidebar from '@/modules/admin/components/AdminSidebar';

import Logo from 'public/logo-admin.svg';

export default function AdminLayout({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		<div className="h-[100vh] bg-neutral-100 text-neutral-900">
			<header className="fixed flex h-[70px] w-full flex-row items-center border-b border-[#D5D5D5] bg-white">
				<div className="w-full max-w-[1388px]">
					<Link href="/" className="absolute top-4 left-[26px]">
						<Logo />
					</Link>
					<div className="flex w-full items-center justify-between pr-[31px] pl-[320px]">
						<div className="hidden w-full max-w-md items-center md:flex">
							<div className="relative w-full">
								<input
									placeholder="Search"
									className="h-[38px] w-full max-w-[338px] rounded-[19px] border border-[#D5D5D5] bg-[#F5F6FA] pr-3 pl-[45px] text-[14px] text-[#202224] outline-none"
								/>
								<svg
									className="absolute top-1/2 left-4 -translate-y-1/2"
									width="17"
									height="17"
									viewBox="0 0 17 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g opacity="0.5">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M9.69292 12.535C12.4228 11.3748 13.6952 8.22136 12.5351 5.49152C11.3749 2.76168 8.22147 1.4892 5.49164 2.64936C2.7618 3.80951 1.48932 6.96297 2.64947 9.69281C3.80963 12.4226 6.96309 13.6951 9.69292 12.535Z"
											stroke="black"
											strokeWidth="1.2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M11.3887 11.3906L15.554 15.5566"
											stroke="black"
											strokeWidth="1.2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</g>
								</svg>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="hidden text-right sm:block">
								<div className="text-sm font-medium">
									Moni Roy
								</div>
								<div className="text-xs text-neutral-500">
									Admin
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			<AdminSidebar />

			<div className="flex">
				<main className="mt-17.5 ml-[240px] w-full overflow-hidden p-8">
					{children}
				</main>
			</div>
		</div>
	);
}
