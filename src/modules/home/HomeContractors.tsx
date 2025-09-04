import React from 'react';
import Link from 'next/link';

import { Button } from '@/shared/components/Button/Button';

export const HomeContractors: React.FC = () => {
	return (
		<section
			className="relative mx-auto mt-[56px] flex h-[691px] max-w-[1240px] flex-col px-[20px] md:mt-[120px] md:grid md:h-[647px] md:grid-cols-2 md:px-0"
			aria-label="For Contractors - Promote your services"
		>
			<div className="flex flex-col justify-between rounded-t-[10px] bg-[#CFEDD9] px-[20px] pt-[40px] pb-[85px] md:rounded-t-[0px] md:rounded-l-[10px] md:py-[48px] md:pr-[130px] md:pl-[48px]">
				<div>
					<header className="mb-[6px] flex flex-col gap-[3px] md:mb-[24px] md:gap-3">
						<p className="text-[16px] font-[400]">
							For Contractors
						</p>
						<h2 className="text-[34px] leading-[41px] font-[400] md:text-[48px] md:leading-[48px] md:font-[500]">
							Work in home services? Get clients effortlessly.
						</h2>
					</header>
					<nav
						className="absolute top-[375px] mb-8 md:block"
						aria-label="Call to action"
					>
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
					className="ml-[29px] flex list-disc flex-col gap-[6px] text-[16px] leading-[155%] font-[400] text-[#242424] md:ml-0 md:block"
					aria-label="Benefits for contractors"
				>
					<li>Access real client requests in your area</li>
					<li>No commissions — just a monthly subscription</li>
					<li>Flexible plans: Local, Regional, or Statewide</li>
				</ul>
			</div>
			<div
				className="flex h-[250px] rounded-b-[10px] bg-cover md:hidden"
				style={{
					backgroundImage:
						"url('/images/for-contractors-mobile.png')",
				}}
				role="img"
				aria-label="A contractor working at home"
			/>
			<div
				className="hidden rounded-r-[10px] bg-cover md:flex"
				style={{
					backgroundImage: "url('/images/for-contractors.png')",
				}}
				role="img"
				aria-label="A contractor working at home"
			/>
		</section>
	);
};

