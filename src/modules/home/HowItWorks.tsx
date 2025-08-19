import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

export const HowItWorks: React.FC = () => {
	return (
		<section
			className="relative mt-[120px] flex h-[984px] justify-end bg-cover"
			style={{
				backgroundImage: "url('/images/how-it-works.png')",
			}}
		>
			<div className="mx-auto grid h-full w-full max-w-[1240px] grid-cols-2 py-[100px] text-white">
				<div className="flex max-w-[349px] flex-col gap-3">
					<h2 className="text-[48px] font-[500]">How It Works</h2>
					<p className="text-[16px] font-[400]">
						Lorem ipsum dolor sit amet consectetur. Quisque mattis
						sapien porttitor id nunc sed molestie.
					</p>
					<Link href="#">
						<Button className="mt-6 !h-[43px] !w-max !bg-white !px-6 !py-3 !text-[#242424]">
							About Us
						</Button>
					</Link>
				</div>
				<div className="flex h-full flex-col items-end justify-end gap-6">
					<div>
						<div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#003BFF] text-[20px] font-[400] text-white">
							01
						</div>
						<div className="flex flex-col gap-3">
							<h3 className="text-[32px] font-[500]">
								Submit a request with photos
							</h3>
							<p className="text-[16px] font-[400]">
								Describe your project, upload photos,
								<br />
								and set your location.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
