import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

export const HomeContractors: React.FC = () => {
    return (
        <section
            className="max-w-[1240px] mx-auto grid grid-cols-2 mt-[120px] h-[647px]"
            aria-label="For Contractors - Promote your services"
        >
            <div className="bg-[#CFEDD9] flex flex-col py-[48px] pl-[48px] pr-[130px] rounded-l-[10px] justify-between">
                <div>
                    <header className="mb-[24px] flex flex-col gap-3">
                        <p className="text-[16px] font-[400]">
                            For Contractors
                        </p>
                        <h2 className="text-[48px] font-[500] leading-[48px]">
                            Work in home services? Get clients effortlessly.
                        </h2>
                    </header>
                    <nav className="mb-8" aria-label="Call to action">
                        <Link href="#">
                            <Button
                                type="button"
                                variant="solid"
                                color="dark"
                                iconPosition="right"
                                className="!bg-[#242424] !h-[43px] !px-6 !py-3 !w-max !text-[16px] !font-[500]"
                                aria-label="Subscribe as Contractor"
                            >
                                Subscribe Now
                            </Button>
                        </Link>
                    </nav>
                </div>
                <ul
                    className="text-[16px] font-[400] text-[#242424] list-disc leading-[155%]"
                    aria-label="Benefits for contractors"
                >
                    <li>Access real client requests in your area</li>
                    <li>No commissions — just a monthly subscription</li>
                    <li>Flexible plans: Local, Regional, or Statewide</li>
                </ul>
            </div>
            <div
                className="flex bg-cover rounded-r-[10px]"
                style={{
                    backgroundImage: "url('/images/for-contractors.png')",
                }}
                role="img"
                aria-label="A contractor working at home"
            />
        </section>
    );
};
