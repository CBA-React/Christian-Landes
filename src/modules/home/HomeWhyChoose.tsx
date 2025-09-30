import React from 'react';

import SquareV1Icon from '../../../public/icons/square-v1.svg';
import SquareV2Icon from '../../../public/icons/square-v2.svg';
import SquareV3Icon from '../../../public/icons/square-v3.svg';

export const HomeWhyChoose: React.FC = () => {
	return (
		<div className="mb-[56px] flex w-full flex-col justify-end min-[900px]:flex-row md:mb-[120px]">
			<section className="mr-[50px] flex w-full max-w-[690px] flex-col justify-end pl-5 max-[900px]:px-5 min-[1280]:ml-auto md:flex-row">
				<div className="mt-[56px] md:mt-[120px] md:px-0">
					<div className="flex flex-col gap-[1px] text-[#242424] md:max-w-[385px] md:gap-3">
						<h3 className="text-[36px] leading-[48px] font-[400] md:text-[48px] md:leading-[50px] md:font-[500]">
							Why Choose
							<br /> Our Platform?
						</h3>
						<p className="pr-[5px] text-[16px] font-[400] md:pr-0">
							Our goal is to make it easy for homeowners to
							connect with trusted, local professionals — without
							the hassle of endless calls or hidden fees.
						</p>
					</div>
					<div className="mt-[24px] flex flex-col gap-[20px] md:mt-[64px] md:ml-[120px] md:gap-[35px]">
						<div className="flex items-start gap-6">
							<SquareV1Icon className="h-[36px] w-[36px] md:h-[46px] md:w-[46px]" />
							<div className="flex max-w-[275px] flex-col gap-[4px] text-[#242424] md:max-w-[380px] md:gap-3">
								<p className="text-[20px] font-[400] tracking-[-1px] md:text-[24px] md:font-[500]">
									Save time
								</p>
								<p className="text-[16px] font-[400]">
									Lorem ipsum dolor sit amet consectetur.
									Quisque mattis sapien porttitor
								</p>
							</div>
						</div>

						<div className="flex items-start gap-6">
							<SquareV2Icon className="h-[36px] w-[36px] md:h-[46px] md:w-[46px]" />
							<div className="flex max-w-[275px] flex-col gap-[4px] text-[#242424] md:max-w-[380px] md:gap-3">
								<p className="text-[20px] font-[400] tracking-[-1px] md:text-[24px] md:font-[500]">
									Local professionals
								</p>
								<p className="text-[16px] font-[400]">
									Lorem ipsum dolor sit amet consectetur.
									Quisque mattis sapien porttitor
								</p>
							</div>
						</div>

						<div className="flex items-start gap-6">
							<SquareV3Icon className="h-[36px] w-[36px] md:h-[46px] md:w-[46px]" />
							<div className="flex max-w-[275px] flex-col gap-[4px] text-[#242424] md:max-w-[380px] md:gap-3">
								<p className="text-[20px] font-[400] tracking-[-1px] md:text-[24px] md:font-[500]">
									Free for clients
								</p>
								<p className="text-[16px] font-[400]">
									Lorem ipsum dolor sit amet consectetur.
									Quisque mattis sapien porttitor
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div
				className="h-[350px] w-full overflow-hidden bg-cover max-[900px]:mt-5 min-[900px]:ml-[60px] min-[900px]:h-[800px] min-[900px]:max-w-[calc(50%_-_60px)] sm:h-[650px] sm:h-[750px]"
				style={{
					backgroundImage: "url('/icons/why-choose.svg')",
				}}
			></div>
		</div>
	);
};
