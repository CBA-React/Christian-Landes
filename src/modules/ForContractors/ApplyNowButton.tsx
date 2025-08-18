'use client';

import React, { JSX } from 'react';

export const ApplyNowButton = (): JSX.Element => {
    return (
        <button
            className={`
          bg-[#003BFF]  text-white font-semibold
          px-[20px] py-[20px]
            cursor-pointer
          group relative overflow-hidden
        `}
        >
            <div className="relative z-10">
                <div className="flex items-center justify-between gap-6 mb-20">
                    <h2 className="text-2xl font-bold">Apply Now</h2>
                    <div>
                        <svg
                            className="w-8 h-8"
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
                <p className="text-sm text-blue-100 text-left leading-relaxed">
                    Tell us what you need — we&#39;ll match you
                    <br />
                    with a trusted pro
                </p>
            </div>
        </button>
    );
};

export default ApplyNowButton;
