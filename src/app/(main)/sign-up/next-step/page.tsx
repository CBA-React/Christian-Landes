import { JSX } from 'react';

import { SignUp } from '@/modules/auth/components/SignUp/SignUp';

export default function NextStep(): JSX.Element {
    return (
        <main
            className="flex h-[100%] bg-cover justify-end"
            style={{
                backgroundImage: "url('/images/login-hero.png')",
            }}
        >
            <div className="max-w-[1240px] mb-[122px] px-4 mx-auto w-full flex justify-end mt-[161px]">
                <section className="p-16 rounded-[20px] max-w-[578px] w-full bg-[#FFFFFFD9] backdrop-blur-[20px] h-fit">
                    <article className="flex flex-col gap-4">
                        <h1 className="font-medium text-[84px] text-[#242424] leading-[84px]">
                            Sign Up
                        </h1>
                        <p className="text-[20px]">
                            Create an account to post projects and find
                            contractors
                        </p>
                    </article>
                    <article className="mt-6">
                        <SignUp />
                    </article>
                </section>
            </div>
        </main>
    );
}
