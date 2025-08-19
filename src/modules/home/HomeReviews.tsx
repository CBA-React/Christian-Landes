import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

export const HomeReviews: React.FC = () => {
	return (
		<section className="mx-auto mt-[120px] flex w-full max-w-[1240px] flex-col">
			<div className="mb-10 flex flex-col items-center justify-center">
				<h3 className="mb-[28px] text-[48px] font-[500] text-[#242424]">
					What users say
				</h3>
				<div className="flex gap-3">
					<Link href="#">
						<Button
							type="button"
							variant="solid"
							color="dark"
							iconPosition="right"
							className="!flex !h-[58px] !w-[160px] items-center justify-center !rounded-none !bg-[#242424] !px-6 !py-3 !text-[20px] !font-[400]"
						>
							Clients
						</Button>
					</Link>
					<Link href="#">
						<Button
							type="button"
							variant="outline"
							color="dark"
							iconPosition="right"
							className="!flex !h-[58px] !w-[160px] items-center justify-center !rounded-none !border-[#242424] !px-6 !py-3 !text-[20px] !font-[400] !text-[#242424]"
						>
							Contractors
						</Button>
					</Link>
				</div>
			</div>
			<div className="grid min-h-[470px] grid-cols-1 items-start gap-5 md:grid-cols-3">
				<div className="flex h-[415px] w-full flex-col self-start rounded-[20px] bg-[#F1F3F6] p-8 text-[#242424]">
					<div className="flex h-full flex-1 flex-col justify-between">
						<p className="text-[24px] font-[400]">
							This platform made it so easy to find a great
							contractor. I submitted one request and had three
							offers within hours.
						</p>
						<div className="mt-10 text-[16px] font-[400]">
							<p>Peter Parker</p>
							<p className="text-[#24242480]">Client</p>
						</div>
					</div>
				</div>

				<div className="flex h-[415px] w-full flex-col self-end rounded-[20px] bg-[#7EA2AD] p-8 text-[#FFFFFF]">
					<div className="flex h-full flex-1 flex-col justify-between">
						<p className="text-[24px] font-[400]">
							I hired a handyman to fix a few things in the
							kitchen — he arrived on time and did everything
							neatly. It’s super convenient to find verified
							workers with real reviews. Highly recommend
						</p>
						<div className="mt-10 text-[16px] font-[400]">
							<p>Peter Parker</p>
							<p className="text-[#FFFFFF80]">Client</p>
						</div>
					</div>
				</div>

				<div className="flex h-[415px] w-full flex-col self-start rounded-[20px] bg-[#CFEDD9] p-8 text-[#242424]">
					<div className="flex h-full flex-1 flex-col justify-between">
						<p className="text-[24px] font-[400]">
							Needed an electrician urgently and the site really
							saved the day. Found someone within 15 minutes, and
							everything was fixed the next day. Fair prices and
							easy-to-use platform.
						</p>
						<div className="mt-10 text-[16px] font-[400]">
							<p>Peter Parker</p>
							<p className="text-[#24242480]">Client</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
