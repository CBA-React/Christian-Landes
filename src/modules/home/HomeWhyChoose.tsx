import React from 'react';
import Image from 'next/image';

import SquareV1Icon from '../../../public/icons/square-v1.svg';
import SquareV2Icon from '../../../public/icons/square-v2.svg';
import SquareV3Icon from '../../../public/icons/square-v3.svg';

export const HomeWhyChoose: React.FC = () => {
	return (
		<section className="mb-[120px] flex w-full justify-between">
			<div className="mx-auto mt-[120px] max-w-[590px]">
				<div className="flex flex-col gap-3 text-[#242424] md:max-w-[385px]">
					<h3 className="text-[48px] leading-[48px] font-[500]">
						Why Choose Our Platform?
					</h3>
					<p className="text-[16px] font-[400]">
						Our goal is to make it easy for homeowners to connect
						with trusted, local professionals — without the hassle
						of endless calls or hidden fees.
					</p>
				</div>
				<div className="mt-[64px] ml-[120px] flex flex-col gap-10">
					<div className="flex items-start gap-6">
						<SquareV1Icon />
						<div className="flex max-w-[380px] flex-col gap-3 text-[#242424]">
							<p className="text-[24px] font-[500]">Save time</p>
							<p className="text-[16px] font-[400]">
								Lorem ipsum dolor sit amet consectetur. Quisque
								mattis sapien porttitor
							</p>
						</div>
					</div>

					<div className="flex items-start gap-6">
						<SquareV2Icon />
						<div className="flex max-w-[380px] flex-col gap-3 text-[#242424]">
							<p className="text-[24px] font-[500]">
								Local professionals
							</p>
							<p className="text-[16px] font-[400]">
								Lorem ipsum dolor sit amet consectetur. Quisque
								mattis sapien porttitor
							</p>
						</div>
					</div>

					<div className="flex items-start gap-6">
						<SquareV3Icon />
						<div className="flex max-w-[380px] flex-col gap-3 text-[#242424]">
							<p className="text-[24px] font-[500]">
								Free for clients
							</p>
							<p className="text-[16px] font-[400]">
								Lorem ipsum dolor sit amet consectetur. Quisque
								mattis sapien porttitor
							</p>
						</div>
					</div>
				</div>
			</div>
			<Image
				src="/icons/why-choose.svg"
				alt={''}
				width={650}
				height={890}
				className="flex justify-end bg-no-repeat"
			/>
		</section>
	);
};
