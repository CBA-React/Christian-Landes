import { JSX } from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

import HomeIcon from 'public/icons/house-outline.svg';
import ToolIcon from 'public/icons/tabler_tool.svg';

export default function SignUp(): JSX.Element {
    return (
        <main
            className="flex h-[890px] bg-cover justify-end"
            style={{
                backgroundImage: "url('/images/login-hero.png')",
            }}
        >
            <div className="max-w-[1240px] mx-auto w-full flex justify-end mt-[192px]">
                <section className="bg-[#FFFFFF]  flex flex-col rounded-[20px] p-16 h-max w-[578px] gap-5">
                    <div className="flex flex-col gap-4 text-[#242424]">
                        <h1 className="font-[500] text-[84px]">Sign Up</h1>
                        <p className="text-[20px] font-[400] ">
                            Choose your role to get started:
                            <br />
                            Homeowner – post your project and find trusted
                            contractors. Contractor – browse available jobs and
                            connect with homeowners.
                        </p>
                    </div>
                    <nav className="flex gap-4 mt-6" aria-label="Choose role">
                        <Link
                            href="/sign-up/next-step"
                            className="w-full justify-center"
                        >
                            <Button
                                type="button"
                                variant="solid"
                                color="primary"
                                icon={<HomeIcon />}
                                iconPosition="left"
                                className="!bg-[#003BFF] !h-[44px] !px-6 !py-3 !w-full justify-center"
                                aria-label="Sign up as Homeowner"
                            >
                                I’m Homeowner
                            </Button>
                        </Link>
                        <Link
                            href="/sign-up/next-step"
                            className="w-full justify-center"
                        >
                            <Button
                                type="button"
                                variant="outline"
                                color="primary"
                                icon={<ToolIcon />}
                                iconPosition="left"
                                className="!border-[#003BFF] !text-[#003BFF] !h-[44px] !px-6 !py-3 !w-full justify-center"
                                aria-label="Sign up as Contractor"
                            >
                                I’m Contractor
                            </Button>
                        </Link>
                    </nav>
                </section>
            </div>
        </main>
    );
}
