import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

export const HomeReviews: React.FC = () => {
    return (
        <section className="max-w-[1240px] mx-auto w-full flex flex-col mt-[120px]">
            <div className="flex flex-col items-center justify-center mb-10">
                <h3 className="text-[48px] font-[500] text-[#242424] mb-[28px]">
                    What users say
                </h3>
                <div className="flex gap-3">
                    <Link href="#">
                        <Button
                            type="button"
                            variant="solid"
                            color="dark"
                            iconPosition="right"
                            className="!bg-[#242424] !rounded-none !h-[58px] !px-6 !py-3 !w-[160px] !text-[20px] !font-[400] !flex items-center justify-center"
                        >
                            Clients
                        </Button>
                    </Link>
                    <Link href="#">
                        <Button
                            type="button"
                            variant="outline"
                            color="dark"
                            iconPosition="right"
                            className="!rounded-none !h-[58px] !px-6 !py-3 !w-[160px] !text-[20px] !font-[400] !flex items-center justify-center !text-[#242424] !border-[#242424]"
                        >
                            Contractors
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start min-h-[470px]">
                <div className="p-8 bg-[#F1F3F6] flex flex-col rounded-[20px] w-full text-[#242424] h-[415px] self-start">
                    <div className="flex flex-col flex-1 justify-between h-full">
                        <p className="text-[24px] font-[400]">
                            This platform made it so easy to find a great
                            contractor. I submitted one request and had three
                            offers within hours.
                        </p>
                        <div className="mt-10 text-[16px] font-[400]">
                            <p>Peter Parker</p>
                            <p className="text-[#24242480]">Client</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-[#7EA2AD] flex flex-col rounded-[20px] w-full text-[#FFFFFF] h-[415px] self-end">
                    <div className="flex flex-col flex-1 justify-between h-full">
                        <p className="text-[24px] font-[400]">
                            I hired a handyman to fix a few things in the
                            kitchen — he arrived on time and did everything
                            neatly. It’s super convenient to find verified
                            workers with real reviews. Highly recommend
                        </p>
                        <div className="mt-10 text-[16px] font-[400]">
                            <p>Peter Parker</p>
                            <p className="text-[#FFFFFF80]">Client</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-[#CFEDD9] flex flex-col rounded-[20px] w-full text-[#242424] h-[415px] self-start ">
                    <div className="flex flex-col flex-1 justify-between h-full">
                        <p className="text-[24px] font-[400]">
                            Needed an electrician urgently and the site really
                            saved the day. Found someone within 15 minutes, and
                            everything was fixed the next day. Fair prices and
                            easy-to-use platform.
                        </p>
                        <div className="mt-10 text-[16px] font-[400]">
                            <p>Peter Parker</p>
                            <p className="text-[#24242480]">Client</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
