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
            className="bg-[#F1F3F6] rounded-[10px] p-8 group w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] min-w-[200px] max-w-[400px] flex-shrink-0"
        >
            <div className="flex flex-col items-start justify-start text-left h-full">
                <div
                    className={`w-12 h-12 mb-4 flex items-center justify-center`}
                >
                    <CategoryMockIcon />
                </div>
                <h3 className="text-gray-800 font-medium text-lg">{name}</h3>
            </div>
        </div>
    );
};
