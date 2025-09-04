import React from 'react';

export const HomeSimplify: React.FC = () => {
	return (
		<section className="m-auto mt-[56px] flex w-full max-w-[1240px] flex-1 flex-col pr-[20px] pl-[20px] md:mt-10 md:pr-[0px] md:pl-[20px]">
			<p className="w-[335px] text-[24px] leading-[31px] font-[400] text-[#242424] md:w-[831px] md:text-[28px] md:leading-[100%]">
				At BuildConnect, we’re on a mission to simplify how people get
				home projects done. Whether it’s a small repair or a full
				renovation, our platform connects clients with trusted local
				contractors — quickly, safely, and without the back-and-forth.
			</p>
			<div className="mt-[24px] grid min-h-[470px] grid-cols-1 items-start gap-[16px] md:mt-[120px] md:grid-cols-3 md:gap-5">
				<div className="flex h-[200px] w-full flex-col justify-between self-start rounded-[10px] bg-[#003BFF] p-8 pb-4 text-white md:h-[309px]">
					<p className="text-[80px] leading-[84px] font-[700] tracking-[-1px] md:text-[120px]">
						+100
					</p>
					<p className="border-t border-[#FFFFFF33] pt-4 pb-[10px] text-[16px] font-[400] md:pb-[0px]">
						Projects posted today
					</p>
				</div>
				<div className="flex h-[200px] w-full flex-col justify-between self-center rounded-[10px] bg-[#7EA2AD] p-8 pb-4 text-white md:h-[309px]">
					<p className="text-[80px] leading-[84px] font-[700] tracking-[-1px] md:text-[120px]">
						99%
					</p>
					<p className="border-t border-[#FFFFFF33] pt-4 pb-[10px] text-[16px] font-[400] md:pb-[0px]">
						Verified professionals
					</p>
				</div>
				<div className="flex h-[200px] w-full flex-col justify-between self-end rounded-[10px] bg-[#242424] p-8 pb-4 text-white md:h-[309px]">
					<p className="text-[80px] leading-[84px] font-[700] tracking-[-1px] md:text-[120px]">
						10
					</p>
					<p className="border-t border-[#FFFFFF33] pt-4 pb-[10px] text-[16px] font-[400] md:pb-[0px]">
						Average bids per request
					</p>
				</div>
			</div>
		</section>
	);
};

