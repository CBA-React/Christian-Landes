import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

export const HomeContractors: React.FC = () => {
	return (
		<section
			className="mx-auto mt-[120px] grid h-[647px] max-w-[1240px] grid-cols-2"
			aria-label="For Contractors - Promote your services"
		>
			<div className="flex flex-col justify-between rounded-l-[10px] bg-[#CFEDD9] py-[48px] pr-[130px] pl-[48px]">
				<div>
					<header className="mb-[24px] flex flex-col gap-3">
						<p className="text-[16px] font-[400]">
							For Contractors
						</p>
						<h2 className="text-[48px] leading-[48px] font-[500]">
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
								className="!h-[43px] !w-max !bg-[#242424] !px-6 !py-3 !text-[16px] !font-[500]"
								aria-label="Subscribe as Contractor"
							>
								Subscribe Now
							</Button>
						</Link>
					</nav>
				</div>
				<ul
					className="list-disc text-[16px] leading-[155%] font-[400] text-[#242424]"
					aria-label="Benefits for contractors"
				>
					<li>Access real client requests in your area</li>
					<li>No commissions — just a monthly subscription</li>
					<li>Flexible plans: Local, Regional, or Statewide</li>
				</ul>
			</div>
			<div
				className="flex rounded-r-[10px] bg-cover"
				style={{
					backgroundImage: "url('/images/for-contractors.png')",
				}}
				role="img"
				aria-label="A contractor working at home"
			/>
		</section>
	);
};
