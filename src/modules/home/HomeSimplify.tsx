import React from 'react';

export const HomeSimplify: React.FC = () => {
    return (
        <section className="max-w-[1240px] m-auto w-full flex-1 flex flex-col mt-10">
            <p className="w-[831px] text-[#242424] text-[28px] font-[400] leading-[100%]">
                At BuildConnect, we’re on a mission to simplify how people get
                home projects done. Whether it’s a small repair or a full
                renovation, our platform connects clients with trusted local
                contractors — quickly, safely, and without the back-and-forth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start min-h-[470px] mt-[120px]">
                <div className="bg-[#003BFF] text-white flex flex-col justify-between p-8 pb-4 rounded-[10px] w-full h-[309px] self-start">
                    <p className="font-[700] text-[120px] leading-[84px] tracking-[-1px]">
                        +100
                    </p>
                    <p className="pt-4 border-t border-[#FFFFFF33] font-[400] text-[16px]">
                        Projects posted today
                    </p>
                </div>
                <div className="bg-[#7EA2AD] text-white flex flex-col justify-between p-8 pb-4 rounded-[10px] w-full h-[309px] self-center">
                    <p className="font-[700] text-[120px] leading-[84px] tracking-[-1px]">
                        99%
                    </p>
                    <p className="pt-4 border-t border-[#FFFFFF33] font-[400] text-[16px]">
                        Verified professionals
                    </p>
                </div>
                <div className="bg-[#242424] text-white flex flex-col justify-between p-8 pb-4 rounded-[10px] w-full h-[309px] self-end">
                    <p className="font-[700] text-[120px] leading-[84px] tracking-[-1px]">
                        10
                    </p>
                    <p className="pt-4 border-t border-[#FFFFFF33] font-[400] text-[16px]">
                        Average bids per request
                    </p>
                </div>
            </div>
        </section>
    );
};
