import React from 'react';

export const HomeSimplify: React.FC = () => {
	return (
		<section className="m-auto mt-10 flex w-full max-w-[1240px] flex-1 flex-col">
			<p className="w-[375px] text-[28px] leading-[100%] font-[400] text-[#242424] md:w-[831px]">
				At BuildConnect, we’re on a mission to simplify how people get
				home projects done. Whether it’s a small repair or a full
				renovation, our platform connects clients with trusted local
				contractors — quickly, safely, and without the back-and-forth.
			</p>
			<div className="mt-[120px] grid min-h-[470px] grid-cols-1 items-start gap-5 md:grid-cols-3">
				<div className="flex h-[309px] w-full flex-col justify-between self-start rounded-[10px] bg-[#003BFF] p-8 pb-4 text-white">
					<p className="text-[120px] leading-[84px] font-[700] tracking-[-1px]">
						+100
					</p>
					<p className="border-t border-[#FFFFFF33] pt-4 text-[16px] font-[400]">
						Projects posted today
					</p>
				</div>
				<div className="flex h-[309px] w-full flex-col justify-between self-center rounded-[10px] bg-[#7EA2AD] p-8 pb-4 text-white">
					<p className="text-[120px] leading-[84px] font-[700] tracking-[-1px]">
						99%
					</p>
					<p className="border-t border-[#FFFFFF33] pt-4 text-[16px] font-[400]">
						Verified professionals
					</p>
				</div>
				<div className="flex h-[309px] w-full flex-col justify-between self-end rounded-[10px] bg-[#242424] p-8 pb-4 text-white">
					<p className="text-[120px] leading-[84px] font-[700] tracking-[-1px]">
						10
					</p>
					<p className="border-t border-[#FFFFFF33] pt-4 text-[16px] font-[400]">
						Average bids per request
					</p>
				</div>
			</div>
		</section>
	);
};

