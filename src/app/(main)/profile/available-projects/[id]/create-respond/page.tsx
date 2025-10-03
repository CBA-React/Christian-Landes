'use client';

import { useParams } from 'next/navigation';
import { RespondToProjectForm } from '@/modules/AvailableProjects/components/details/RespondToProjectForm';

export default function RespondToProjectPage() {
	const params = useParams();
	const projectId = params.id as string;

	return (
		<div className="min-h-screen bg-white">
			<div className="bg-[#F1F3F6] pt-28 pb-8 lg:pt-40">
				<div className="relative mx-auto max-w-[1280px] px-5">
					<h1 className="font-chalet-1960 mb-2 text-center text-[36px] tracking-[-1px] text-[#242424] md:text-[40px]">
						Respond to Project with Your Offer
					</h1>
					<p className="text-center text-[16px] leading-relaxed text-[#242424]">
						Let the client know you're interested in the job and
						propose your own terms.
					</p>
				</div>
			</div>

			<div className="mx-auto max-w-[1100px] px-5 pt-6 pb-14">
				<RespondToProjectForm projectId={projectId} />
			</div>
		</div>
	);
}
