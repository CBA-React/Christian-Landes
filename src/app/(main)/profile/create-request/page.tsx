'use client';

import { CreateRequestForm } from '@/modules/Profile/components/CreateRequestForm';

export default function CreateRequestPage() {
	return (
		<div className="min-h-screen bg-white">
			<header className="bg-[#F1F3F6] pt-28 pb-8 lg:pt-40">
				<div className="mx-auto max-w-[1280px] px-5">
					<h1 className="font-chalet-1960 mb-2 text-center text-[36px] tracking-[-1px] text-[#242424] md:text-[40px]">
						Create Your Project Request
					</h1>
					<p className="text-center text-[16px] leading-relaxed text-[#242424]">
						Tell us what you need done, where, and when. Upload
						photos so pros can see the job. Add a budget range if
						you have one. We only share your exact address after you
						hire a contractor.
					</p>
				</div>
			</header>

			<main className="mx-auto max-w-[1100px] px-5 pt-6 pb-14">
				<CreateRequestForm />
			</main>
		</div>
	);
}
