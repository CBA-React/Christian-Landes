'use client';

import React, { JSX } from 'react';

export const ApplyNowButton = (): JSX.Element => {
	return (
		<button
			className={`group relative h-full w-full cursor-pointer overflow-hidden bg-[#003BFF] px-[20px] py-[20px] font-semibold text-white`}
		>
			<div className="relative z-10 h-full">
				<div className="mb-[100px] flex items-center justify-between gap-6 md:mb-20">
					<h2 className="text-[28px] leading-[48px] font-bold md:text-2xl">
						Apply Now
					</h2>
					<div>
						<svg
							className="h-8 w-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M7 17l9.2-9.2M17 17V7H7"
							/>
						</svg>
					</div>
				</div>
				<p className="text-left text-[16px] text-blue-100 md:text-sm md:leading-relaxed">
					Tell us what you need — we&#39;ll match you with a trusted
					pro
				</p>
			</div>
		</button>
	);
};

export default ApplyNowButton;

