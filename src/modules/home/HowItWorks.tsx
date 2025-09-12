import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

export const HowItWorks: React.FC = () => {
	return (
		<section
			className="relative mt-[56px] flex h-[786px] justify-end bg-cover bg-[right_850px_top_0px] px-5 max-[1100]:mt-[120px] md:h-[800px] md:bg-[right_0px_top_0px] xl:px-[0px]"
			style={{
				backgroundImage: "url('/images/how-it-works.png')",
			}}
		>
			<div className="mx-auto h-full w-full max-w-[1240px] py-[40px] text-white md:grid md:grid-cols-2 md:py-[100px]">
				<div className="flex max-w-[349px] flex-col gap-1.5 md:gap-3">
					<h2 className="font-chalet-1960 text-[36px] font-[400] md:text-[48px] md:leading-[58px] md:font-[500]">
						How It Works
					</h2>
					<p className="text-[16px] font-[400] md:leading-[25px]">
						Lorem ipsum dolor sit amet consectetur. Quisque mattis
						sapien porttitor id nunc sed molestie.
					</p>
					<Link className="max-w-[115px]" href="#">
						<Button className="mt-2 !h-[43px] !w-max !bg-white !px-6 !py-3 !text-[#242424] md:mt-3">
							About Us
						</Button>
					</Link>
				</div>
				<div className="mt-[56px] ml-[115px] flex flex-col items-end justify-end gap-[56px] md:mt-0 md:ml-0 md:h-full md:items-start md:gap-6 md:pl-[130px]">
					<div>
						<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#003BFF] text-[20px] font-[400] text-white md:mb-6">
							01
						</div>
						<div className="flex flex-col gap-[6px] md:gap-3">
							<h3 className="font-chalet-1960 text-[24px] leading-[30px] font-medium md:text-[32px] md:leading-none">
								Submit a request with photos
							</h3>
							<p className="text-[16px] font-[400]">
								Describe your project, upload photos,
								<br className="hidden md:block" />
								and set your location.
							</p>
						</div>
					</div>
					<div className="md:hidden">
						<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#003BFF] text-[20px] font-[400] text-white md:mb-6">
							02
						</div>
						<div className="flex flex-col gap-[6px] md:gap-3">
							<h3 className="font-chalet-1960 text-[24px] leading-[30px] font-medium md:text-[32px] md:leading-none">
								Contractors send you offers
							</h3>
							<p className="text-[16px] font-[400]">
								Lorem ipsum dolor sit amet consectetur. Quisque
								mattis sapien porttitor id nunc sed molestie.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
