'use client';

import { JSX, useEffect, useMemo, useState } from 'react';

import { AddUserModal } from '@/modules/admin/components/AddUserModal';
import { ApiUser, UsersApi } from '@/modules/admin/services/UsersApi';

type RoleNum = 1 | 2 | 3;
const ROLES = { HOMEOWNER: 1, CONTRACTOR: 2, ADMIN: 3 } as const;

const truncate = (s: string, max: number): string =>
	s.length <= max ? s : s.slice(0, max - 1) + '…';

const truncateEmail = (email: string, max: number): string => {
	if (email.length <= max) return email;
	const at = email.indexOf('@');
	if (at === -1) return truncate(email, max);
	const local = email.slice(0, at);
	const domain = email.slice(at);
	const room = max - domain.length - 1;
	if (room <= 0) return truncate(email, max);
	return local.length <= room ? email : local.slice(0, room) + '…' + domain;
};

const MAX_SHOW = { name: 24, email: 28, phone: 18, location: 24 };

const truncatePhone = (phone: string, max: number): string => {
	if (phone.length <= max) return phone;
	const tail = phone.slice(-4);
	const headRoom = Math.max(0, max - 5);
	return phone.slice(0, headRoom) + '…' + tail;
};

const roleLabel = (r: RoleNum): 'Homeowner' | 'Contractor' | 'Admin' =>
	r === ROLES.CONTRACTOR
		? 'Contractor'
		: r === ROLES.ADMIN
			? 'Admin'
			: 'Homeowner';

const formatDate = (iso: string): string =>
	new Date(iso).toLocaleDateString(undefined, {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	});

export default function ManagementPage(): JSX.Element {
	const [users, setUsers] = useState<ApiUser[]>([]);
	const [loading, setLoading] = useState(true);
	const [role, setRole] = useState<RoleNum | ''>('');

	type SortKey = '' | 'name' | 'date' | 'blockedAsc' | 'blockedDesc';
	const [sort, setSort] = useState<SortKey>('');
	const [order, setOrder] = useState<'asc' | 'desc'>('desc');

	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [total, setTotal] = useState<number | undefined>(undefined);

	const [addOpen, setAddOpen] = useState(false);

	const effectiveSort: Exclude<SortKey, ''> = useMemo(
		() => (sort === '' ? 'date' : sort),
		[sort],
	);

	const apiSort: 'name' | 'date' = effectiveSort === 'name' ? 'name' : 'date';

	useEffect(() => {
		let ignore = false;
		setLoading(true);
		UsersApi.getUsers({ page, perPage, role, sort: apiSort, order })
			.then((d) => {
				if (ignore) return;
				setUsers(d.data ?? []);
				setTotal(d.total);
			})
			.finally(() => {
				if (!ignore) setLoading(false);
			});
		return (): void => {
			ignore = true;
		};
	}, [page, perPage, role, apiSort, order]);

	const rows = useMemo(() => {
		const filtered =
			role === '' ? users : users.filter((u) => u.role === role);

		const list = filtered.slice();
		list.sort((a, b) => {
			let cmp = 0;
			if (effectiveSort === 'name') {
				cmp = (a.full_name || '').localeCompare(
					b.full_name || '',
					undefined,
					{ sensitivity: 'base' },
				);
			} else if (
				effectiveSort === 'blockedAsc' ||
				effectiveSort === 'blockedDesc'
			) {
				const ab = (a.block ?? false) ? 1 : 0;
				const bb = (b.block ?? false) ? 1 : 0;
				cmp = ab - bb;
				if (effectiveSort === 'blockedDesc') cmp = -cmp;
			} else {
				cmp =
					new Date(a.created_at).getTime() -
					new Date(b.created_at).getTime();
			}
			return order === 'asc' ? cmp : -cmp;
		});
		return list;
	}, [users, role, effectiveSort, order]);

	const hasPrev = page > 1;
	const hasNext =
		total !== undefined ? page * perPage < total : users.length === perPage;

	const orderDisabled =
		effectiveSort === 'blockedAsc' || effectiveSort === 'blockedDesc';

	return (
		<div className="space-y-4">
			<div className="flex max-w-[1138px] flex-col items-start justify-between gap-3 min-[670px]:flex-row min-[670px]:items-center">
				<h1 className="font-chalet-1960 text-[28px] font-medium min-[680px]:text-[32px]">
					Management
				</h1>
				<button
					onClick={() => setAddOpen(true)}
					className="font-chalet-1960 w-full min-w-[186px] cursor-pointer rounded-full bg-[#003BFF] px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 min-[670px]:max-w-[186px]"
				>
					Add New User <span className="ml-1">＋</span>
				</button>
			</div>

			<section className="max-w-[1138px] rounded-[16px] bg-white p-5 shadow-sm ring-1 ring-black/5 min-[670px]:p-6">
				<header className="mb-[24px] flex items-center justify-between max-[990px]:flex-col max-[990px]:items-start max-[990px]:gap-3 min-[680px]:mb-[31px]">
					<h2 className="font-chalet-1960 text-[20px] font-medium tracking-wide min-[680px]:text-[24px]">
						REVENUE INFORMATION
					</h2>

					{/* desktop controls*/}
					<div className="hidden w-full items-center gap-2 max-[990px]:flex-col min-[990px]:max-w-[370px] sm:flex">
						<select
							className="h-9 rounded-md border border-neutral-300 bg-white px-3 text-sm max-[990px]:w-full"
							value={role}
							onChange={(e) =>
								setRole(
									(e.target.value
										? (Number(e.target.value) as RoleNum)
										: '') as RoleNum | '',
								)
							}
						>
							<option value="">All Roles</option>
							<option value={ROLES.HOMEOWNER}>
								Homeowner (1)
							</option>
							<option value={ROLES.CONTRACTOR}>
								Contractor (2)
							</option>
							<option value={ROLES.ADMIN}>Admin (3)</option>
						</select>

						<div className="flex items-center gap-2 max-[990px]:w-full">
							<select
								className="h-9 rounded-md border border-neutral-300 bg-white px-3 text-sm max-[990px]:w-full"
								value={sort}
								onChange={(e) =>
									setSort(e.target.value as SortKey)
								}
							>
								<option value="" disabled hidden>
									Sort by
								</option>
								<option value="date">Date</option>
								<option value="name">Name</option>
								<option value="blockedDesc">Unblocked</option>
								<option value="blockedAsc">Blocked</option>
							</select>
							<button
								className="h-9 rounded-md border border-neutral-300 px-3 text-sm disabled:opacity-40"
								onClick={() =>
									setOrder((o) =>
										o === 'asc' ? 'desc' : 'asc',
									)
								}
								title="Toggle order"
								disabled={orderDisabled}
							>
								{order === 'asc' ? '↑' : '↓'}
							</button>
						</div>
					</div>
				</header>

				{/* mobile controls */}
				<div className="mb-3 grid gap-2 sm:hidden">
					<div className="flex gap-2">
						<select
							className="h-10 flex-1 rounded-md border border-neutral-300 bg-white px-3 text-sm"
							value={sort}
							onChange={(e) => setSort(e.target.value as SortKey)}
						>
							<option value="" disabled hidden>
								Sort by
							</option>
							<option value="date">Date</option>
							<option value="name">Name</option>
							<option value="blockedDesc">Blocked first</option>
							<option value="blockedAsc">Unblocked first</option>
						</select>
						<select
							className="h-10 flex-1 rounded-md border border-neutral-300 bg-white px-3 text-sm"
							value={role}
							onChange={(e) =>
								setRole(
									(e.target.value
										? (Number(e.target.value) as RoleNum)
										: '') as '' | RoleNum,
								)
							}
						>
							<option value="">All</option>
							<option value={ROLES.HOMEOWNER}>Homeowner</option>
							<option value={ROLES.CONTRACTOR}>Contractor</option>
							<option value={ROLES.ADMIN}>Admin</option>
						</select>
					</div>
				</div>

				{/* table (desktop) */}
				<div className="-mx-5 overflow-x-auto min-[670px]:mx-0">
					<table className="min-w-[980px] table-fixed border-collapse sm:min-w-full">
						<thead>
							<tr className="text-left text-sm text-neutral-600">
								<th className="w-[28%] rounded-l-lg bg-neutral-100 px-4 py-3 font-medium">
									Name
								</th>
								<th className="w-[22%] bg-neutral-100 px-4 py-3 font-medium">
									Email
								</th>
								<th className="w-[15%] bg-neutral-100 px-4 py-3 font-medium">
									Phone
								</th>
								<th className="w-[12%] bg-neutral-100 px-4 py-3 font-medium">
									Role
								</th>
								<th className="w-[15%] bg-neutral-100 px-4 py-3 font-medium">
									Date Registered
								</th>
								<th className="w-[8%] bg-neutral-100 px-4 py-3 font-medium">
									Status
								</th>
								<th className="w-[10%] rounded-r-lg bg-neutral-100 px-4 py-3 font-medium">
									Action
								</th>
							</tr>
						</thead>

						<tbody className="text-sm">
							{loading ? (
								<tr>
									<td
										colSpan={7}
										className="px-4 py-8 text-center text-neutral-500"
									>
										Loading…
									</td>
								</tr>
							) : rows.length === 0 ? (
								<tr>
									<td
										colSpan={7}
										className="px-4 py-8 text-center text-neutral-500"
									>
										No users found
									</td>
								</tr>
							) : (
								rows.map((u) => (
									<tr
										key={u.id}
										className="border-b align-middle last:border-b-0"
									>
										<td className="px-4 py-4">
											<div className="flex min-w-0 items-center gap-3">
												<img
													src={
														u.logo?.url ||
														'/images/profile/mock-avatar.jpg'
													}
													alt={u.full_name}
													className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-black/5"
												/>
												<div className="min-w-0 overflow-hidden">
													<div
														className="truncate font-medium"
														title={u.full_name}
													>
														{truncate(
															u.full_name ?? '',
															MAX_SHOW.name,
														)}
													</div>
												</div>
											</div>
										</td>
										<td className="px-4 py-4 text-neutral-700">
											<div className="min-w-0 overflow-hidden">
												<span
													className="block truncate whitespace-nowrap"
													title={u.email}
												>
													{truncateEmail(
														u.email ?? '',
														MAX_SHOW.email,
													)}
												</span>
											</div>
										</td>
										<td className="px-4 py-4">
											{u.phone ? (
												<a
													className="block truncate whitespace-nowrap text-[#003BFF] hover:underline"
													href={`tel:${u.phone}`}
													title={u.phone}
												>
													{truncatePhone(
														u.phone,
														MAX_SHOW.phone,
													)}
												</a>
											) : (
												<span className="text-neutral-400">
													—
												</span>
											)}
										</td>
										<td className="px-4 py-4 whitespace-nowrap">
											{roleLabel(u.role as RoleNum)}
										</td>
										<td className="px-4 py-4 whitespace-nowrap">
											{formatDate(u.created_at)}
										</td>
										<td className="px-4 py-4 whitespace-nowrap">
											<span
												className={
													(u.block ?? false) === true
														? 'text-orange-500'
														: 'text-emerald-600'
												}
											>
												{(u.block ?? false) === true
													? 'Blocked'
													: 'Unblocked'}
											</span>
										</td>
										<td className="px-4 py-4">
											<div className="flex items-center gap-2 whitespace-nowrap">
												{(u.block ?? false) === true ? (
													<button
														onClick={() =>
															UsersApi.toggleBlock(
																u.id,
															).then(() =>
																setUsers((x) =>
																	x.map(
																		(y) =>
																			y.id ===
																			u.id
																				? {
																						...y,
																						block: false,
																					}
																				: y,
																	),
																),
															)
														}
														className="rounded-full border border-emerald-500 px-2 py-1 text-emerald-600 hover:bg-emerald-50"
														title="Unblock"
													>
														⟳
													</button>
												) : (
													<button
														onClick={() =>
															UsersApi.toggleBlock(
																u.id,
															).then(() =>
																setUsers((x) =>
																	x.map(
																		(y) =>
																			y.id ===
																			u.id
																				? {
																						...y,
																						block: true,
																					}
																				: y,
																	),
																),
															)
														}
														className="rounded-full border border-orange-500 px-2 py-1 text-orange-600 hover:bg-orange-50"
														title="Block"
													>
														✕
													</button>
												)}
												<button
													onClick={() =>
														UsersApi.deleteUser(
															u.id,
														).then(() =>
															setUsers((x) =>
																x.filter(
																	(y) =>
																		y.id !==
																		u.id,
																),
															),
														)
													}
													className="rounded-full border border-rose-500 px-2 py-1 text-rose-600 hover:bg-rose-50"
													title="Delete"
												>
													🗑
												</button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</section>

			<div className="flex items-center gap-2">
				<label className="text-sm text-neutral-600">Rows:</label>
				<select
					className="h-9 rounded-md border border-neutral-300 bg-white px-2 text-sm"
					value={perPage}
					onChange={(e) => {
						setPage(1);
						setPerPage(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 50].map((n) => (
						<option key={n} value={n}>
							{n}
						</option>
					))}
				</select>
				<button
					className="h-9 rounded-md border border-neutral-300 px-3 text-sm disabled:opacity-40"
					onClick={() => setPage((p) => Math.max(1, p - 1))}
					disabled={!hasPrev || loading}
				>
					Prev
				</button>
				<button
					className="h-9 rounded-md border border-neutral-300 px-3 text-sm disabled:opacity-40"
					onClick={() => setPage((p) => p + 1)}
					disabled={!hasNext || loading}
				>
					Next
				</button>
			</div>

			<AddUserModal open={addOpen} onClose={() => setAddOpen(false)} />
		</div>
	);
}
