'use client';

import { JSX } from 'react';
import Link from 'next/link';

import { useMyPlan } from '@/modules/Pricing/hooks/usePlans';
import ProfileLayout from '@/shared/components/ProfileLayout/ProfileLayout';
import { useProfile } from '@/shared/hooks/useProfile';

export default function PricingPlanPage(): JSX.Element {
	const { data, isLoading, isError } = useMyPlan();
	const { data: profile } = useProfile(2);

	const displayEmail = profile?.email ?? '—';

	return (
		<ProfileLayout showHeader={true} showSidebar={true}>
			<div className="mx-auto max-w-3xl p-6 lg:p-10">
				<h1 className="mb-1 text-[32px] leading-none tracking-[-0.5px] text-[#242424] lg:text-[40px]">
					My Plan
				</h1>
				<p className="mb-6 text-[14px] text-[#242424]/60 lg:text-[16px]">
					Details about your current subscription and features.
				</p>

				<div className="mb-10 rounded-[10px] bg-[#F1F3F6] p-5 lg:p-6">
					{isLoading ? (
						<div className="animate-pulse">
							<div className="mb-2 h-8 w-24 rounded bg-black/10" />
							<div className="mb-1 h-4 w-56 rounded bg-black/10" />
							<div className="h-4 w-40 rounded bg-black/10" />
						</div>
					) : isError || !data ? (
						<div className="flex items-start justify-between gap-4">
							<div>
								<div className="flex items-end gap-2">
									<span className="text-[36px] leading-none font-semibold text-[#242424]">
										$0
									</span>
									<span className="pb-1 text-sm text-[#242424]/60">
										Per Month
									</span>
								</div>
								<div className="mt-2 text-[15px] text-[#242424]">
									<span className="font-medium">Free</span>
								</div>
							</div>
							<Link
								href="/profile/pricing-plan/upgrade-plan"
								className="text-sm font-medium text-[#3B82F6] hover:underline"
							>
								Upgrade plan
							</Link>
						</div>
					) : (
						<div className="flex items-start justify-between gap-4">
							<div>
								<div className="flex items-end gap-2">
									<span className="text-[36px] leading-none font-semibold text-[#242424]">
										{(data.currency === 'USD' ? '$' : '') +
											data.price}
									</span>
									<span className="pb-1 text-sm text-[#242424]/60">
										Per{' '}
										{data.interval === 'year'
											? 'Year'
											: 'Month'}
									</span>
								</div>
								<div className="mt-2 text-[15px] text-[#242424]">
									<span className="font-medium">
										{data.name}
									</span>
									{data.tagline ? (
										<span className="ml-1">
											{data.tagline}
										</span>
									) : null}
								</div>
							</div>
							<Link
								href="/profile/pricing-plan/upgrade-plan"
								className="text-sm font-medium text-[#3B82F6] hover:underline"
							>
								Upgrade plan
							</Link>
						</div>
					)}
				</div>

				<div>
					<h2 className="mb-1 text-[28px] leading-none tracking-[-0.5px] text-[#242424]">
						Billing Information
					</h2>
					<p className="mb-4 text-[14px] text-[#242424]/60 lg:text-[16px]">
						Manage your payment methods, invoices, and billing
						history.
					</p>

					<div className="flex items-center justify-between rounded-[10px] bg-[#F1F3F6] px-5 py-4 lg:p-6">
						<div>
							<p className="text-[15px] font-medium text-[#242424]">
								{profile?.name}
							</p>
							<p className="text-sm text-[#242424]/70">
								{displayEmail}
							</p>
						</div>
						<button
							type="button"
							className="text-sm font-medium text-[#3B82F6] hover:underline"
						>
							Billing history
						</button>
					</div>
				</div>
			</div>
		</ProfileLayout>
	);
}
