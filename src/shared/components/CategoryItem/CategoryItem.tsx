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
			className="group s w-full max-w-[450px] min-w-[200px] flex-shrink-0 rounded-[10px] bg-[#F1F3F6] p-5 sm:max-w-[100%] md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
		>
			<div className="flex h-full flex-col items-start justify-start text-left">
				<div
					className={`mb-4 flex h-12 w-12 items-center justify-center`}
				>
					{icon}
				</div>
				<h3 className="text-lg font-medium text-gray-800">{name}</h3>
			</div>
		</div>
	);
};
