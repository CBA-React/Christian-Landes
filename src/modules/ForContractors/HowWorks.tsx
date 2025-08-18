import React, { JSX } from 'react';
import Link from 'next/link';

import ApplyNowButton from '@/modules/ForContractors/ApplyNowButton';

const howWorks = [
    {
        num: '01',
        title: 'Post Your Job',
        description:
            'Share the details of your renovation or construction project. Be specific about requirements, timeline, and budget.',
    },
    {
        num: '02',
        title: 'Receive Bids',
        description:
            'Qualified contractors will review your project and submit competitive bids. Compare prices, timelines, and credentials.',
    },
    {
        num: '03',
        title: 'Hire & Manage',
        description:
            'Select the right contractor for your project and use our tools to manage payments, track progress, and communicate.',
    },
];

export const HowWorks = (): JSX.Element => {
    return (
        <section className="relative w-full h-[800px] overflow-visible">
            <div className="relative z-10 max-w-[1240px] mx-auto h-full flex gap-6">
                <div className="w-1/2 h-full">
                    <h1 className="text-[48px] mt-[80px]">
                        How ServiceBridge Works
                    </h1>
                    <div className="mt-[230px]">
                        {howWorks.map((work, index, array) => (
                            <div key={work.num}>
                                <div
                                    className={`flex gap-12 ${index === 0 ? 'mt-0' : 'mt-[20px]'}`}
                                >
                                    <p className="text-[24px] leading-[100%]">
                                        {work.num}
                                    </p>
                                    <div className="max-w-[495px]">
                                        <p className="text-[24px] leading-[100%]">
                                            {work.title}
                                        </p>
                                        <p className="text-[16px] mt-3">
                                            {work.description}
                                        </p>
                                    </div>
                                </div>
                                {index !== array.length - 1 && (
                                    <div className="max-w-[571px] bg-[#24242440] h-[1px] mt-[20px]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2" />
            </div>

            <div
                className="absolute inset-y-0 left-1/2 right-0 bg-cover bg-right"
                style={{
                    backgroundImage:
                        "url('/images/for-contractors-apply-now.png')",
                }}
            >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <Link href="#">
                        <ApplyNowButton />
                    </Link>
                </div>
            </div>
        </section>
    );
};
