import React, { JSX } from 'react';

export const Advantages = (): JSX.Element => {
	return (
		<section className="mb-[56px] flex flex-col-reverse lg:mb-[120px] lg:flex-row">
			<div
				className="h-[350px] bg-cover lg:h-auto lg:w-1/2"
				style={{
					backgroundImage: "url('/images/about_advantages.png')",
				}}
			></div>
			<div className="flex flex-col bg-[#CFEDD9] px-[20px] py-[40px] lg:w-1/2 lg:px-0 lg:pt-[80px] lg:pr-[80px] lg:pb-[36px] lg:pl-[40px]">
				<h2 className="mb-14 text-[36px] leading-11 lg:mb-38 lg:text-[48px] lg:leading-12">
					We simplify home improvement by connecting people with
					trusted local pros
				</h2>
				<div className="lg:ml-25">
					<p className="leading-[25px]">
						We take the stress out of finding reliable help by
						connecting homeowners with vetted, local professionals —
						quickly and securely.
						<br />
						No cold calls, no confusing paperwork — just real pros,
						ready to work.From first request to final review, we
						help you manage your home project with confidence.
					</p>
					<ul className="mt-4 ml-1 flex flex-wrap justify-center gap-[28px]">
						<li className="flex flex-col">
							<div className="text-[40px] font-[500] lg:text-[48px]">
								1000+
							</div>
							<div className="w-[130px] text-[14px] lg:w-full lg:text-[16px]">
								Project Completed
							</div>
						</li>
						<li className="flex flex-col">
							<div className="text-[40px] font-[500] lg:text-[48px]">
								300+
							</div>
							<div className="w-[132px] text-[14px] lg:w-full lg:text-[16px]">
								Verified Contractors
							</div>
						</li>
						<li className="flex flex-col">
							<div className="text-[40px] font-[500] lg:text-[48px]">
								20+
							</div>
							<div className="w-[130px] text-[14px] lg:w-full lg:text-[16px]">
								Cities Served
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

