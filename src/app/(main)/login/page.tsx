import { JSX } from 'react';

export default function Home(): JSX.Element {
    return (
        <main
            className="flex h-[890px] bg-cover"
            style={{
                backgroundImage: "url('/images/hero.png')",
            }}
        ></main>
    );
}
