import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

export const HowItWorks: React.FC = () => {
    return (
        <section
            className=" relative flex h-[984px] bg-cover justify-end mt-[120px]"
            style={{
                backgroundImage: "url('/images/how-it-works.png')",
            }}
        >
            <div className="py-[100px] mx-auto max-w-[1240px] w-full text-white grid grid-cols-2 h-full">
                <div className="flex flex-col gap-3 max-w-[349px]">
                    <h2 className="text-[48px] font-[500]">How It Works</h2>
                    <p className="text-[16px] font-[400]">
                        Lorem ipsum dolor sit amet consectetur. Quisque mattis
                        sapien porttitor id nunc sed molestie.
                    </p>
                    <Link href="#">
                        <Button className="mt-6 !h-[43px] !w-max !px-6 !py-3 !bg-white !text-[#242424]">
                            About Us
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col justify-end items-end h-full gap-6">
                    <div>
                        <div className="flex items-center justify-center w-10 h-10 mb-5 bg-[#003BFF] rounded-full text-[20px] font-[400] text-white">
                            01
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="font-[500] text-[32px]">
                                Submit a request with photos
                            </h3>
                            <p className="font-[400] text-[16px]">
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
