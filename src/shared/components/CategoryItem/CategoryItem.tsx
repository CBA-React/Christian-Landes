import { JSX, ReactNode } from 'react';

interface CategoryItemProps {
	id: number;
	name: string;
	icon: ReactNode;
}

export const CategoryItem = ({
	id,
	name,
	icon,
}: CategoryItemProps): JSX.Element => {
	return (
		<div
			key={id}
			className="group s sm:max-w-[100%]] h-full w-full max-w-[450px] min-w-[200px] rounded-[10px] bg-[#F1F3F6] p-5 lg:p-7"
		>
			<div className="flex h-full flex-col items-start justify-start text-left">
				<div
					className={`mb-3 flex h-12 w-12 items-center justify-center md:mb-4`}
				>
					{icon}
				</div>
				<h3 className="text-[20px] font-medium text-gray-800 md:text-[24px]">
					{name}
				</h3>
			</div>
		</div>
	);
};

