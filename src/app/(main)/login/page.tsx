import { JSX } from 'react';

import { LoginSection } from '@/modules/auth/components/LoginSection';

export default function Home(): JSX.Element {
	return (
		<main
			className="flex h-[984px] justify-end bg-cover"
			style={{
				backgroundImage: "url('/images/login-hero.png')",
			}}
		>
			<LoginSection />
		</main>
	);
}
