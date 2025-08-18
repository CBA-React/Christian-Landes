import { JSX } from 'react';

import { ForgotPasswordSection } from '@/modules/auth/components/ForgotPassword/ForgotPasswordSection';

export default function Home(): JSX.Element {
    return (
        <main
            className="flex h-[984px] bg-cover justify-end"
            style={{
                backgroundImage: "url('/images/forgot-password-hero.png')",
            }}
        >
            <ForgotPasswordSection />/
        </main>
    );
}
