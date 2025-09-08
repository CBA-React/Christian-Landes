import { JSX } from 'react';

import CategoryMockIcon from 'public/icons/categoryMock.svg';

interface CategoryItemProps {
	id: number;
	name: string;
}

export const CategoryItem = ({ id, name }: CategoryItemProps): JSX.Element => {
	return (
		<div
			key={id}
			className="group w-[300px] max-w-[400px] min-w-[200px] flex-shrink-0 rounded-[10px] bg-[#F1F3F6] p-[24px] sm:w-[calc(50%-0.5rem)] md:w-full md:p-8 lg:w-[calc(33.333%-0.75rem)]"
		>
			<div className="flex h-full flex-col items-start justify-start text-left">
				<div
					className={`mb-3 flex h-12 w-12 items-center justify-center md:mb-4`}
				>
					<CategoryMockIcon />
				</div>
				<h3 className="text-[20px] font-medium text-gray-800 md:text-[24px]">
					{name}
				</h3>
			</div>
		</div>
	);
};

