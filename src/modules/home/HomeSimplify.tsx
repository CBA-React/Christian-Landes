import React from 'react';

export const HomeSimplify: React.FC = () => {
	return (
		<section className="mt-[56px] flex w-full max-w-[1240px] flex-col px-5 lg:mt-10 xl:mx-auto xl:px-0">
			<p className="w-full text-[24px] text-[#242424] md:text-[28px] lg:w-[600px] xl:w-[831px]">
				At BuildConnect, we’re on a mission to simplify how people get
				home projects done. Whether it’s a small repair or a full
				renovation, our platform connects clients with trusted local
				contractors — quickly, safely, and without the back-and-forth.
			</p>
			<div className="mt-6 grid grid-cols-1 items-start gap-4 min-[1100px]:min-h-[470px] lg:mt-[120px] lg:grid-cols-3 lg:gap-5">
				<div className="min-[1100px]pb-4 flex h-[200px] w-full flex-col justify-between self-start rounded-[10px] bg-[#003BFF] p-8 text-white min-[1100px]:h-[309px]">
					<p className="text-[80px] leading-[84px] font-[700] tracking-[-1px] min-[1100px]:text-[120px]">
						+100
					</p>
					<p className="border-t border-[#FFFFFF33] pt-4 text-[16px] font-[400] md:pb-[0px]">
						Projects posted today
					</p>
				</div>
				<div className="flex h-[200px] w-full flex-col justify-between rounded-[10px] bg-[#7EA2AD] p-7 pb-4 text-white min-[1100px]:h-[309px] min-[1100px]:self-center min-[1100px]:p-8">
					<p className="text-[80px] leading-[84px] font-[700] tracking-[-1px] min-[1100px]:text-[120px]">
						99%
					</p>
					<p className="border-t border-[#FFFFFF33] pt-4 text-[16px] font-[400] md:pb-[0px]">
						Verified professionals
					</p>
				</div>
				<div className="flex h-[200px] w-full flex-col justify-between rounded-[10px] bg-[#242424] p-8 pb-4 text-white min-[1100px]:h-[309px] min-[1100px]:self-end">
					<p className="text-[80px] leading-[84px] font-[700] tracking-[-1px] min-[1100px]:text-[120px]">
						10
					</p>
					<p className="border-t border-[#FFFFFF33] pt-4 text-[16px] font-[400] md:pb-[0px]">
						Average bids per request
					</p>
				</div>
			</div>
		</section>
	);
};
