import { ReactNode } from 'react';

import KitchenIcon from 'public/icons/profile/project-categories/categories-kitchen-icon.svg';
import BathroomIcon from 'public/icons/profile/project-categories/categories-bathroom-icon.svg';
import RoofingIcon from 'public/icons/profile/project-categories/categories-roofing-icon.svg';
import RenovationIcon from 'public/icons/profile/project-categories/categories-renovation-icon.svg';
import ElectricalIcon from 'public/icons/profile/project-categories/categories-electrical-icon.svg';

export interface ProjectCategory {
	id: string;
	name: string;
	slug: string;
	icon: ReactNode;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
	{
		id: 'renovation',
		name: 'Renovation',
		slug: 'Renovation',
		icon: <RenovationIcon className="h-5 w-5 flex-shrink-0" />,
	},
	{
		id: 'electrical-plumbing',
		name: 'Electrical Plumbing',
		slug: 'Electrical Plumbing',
		icon: <ElectricalIcon className="h-5 w-5 flex-shrink-0" />,
	},
	{
		id: 'bathroom',
		name: 'Bathroom',
		slug: 'Bathroom',
		icon: <BathroomIcon className="h-5 w-5 flex-shrink-0" />,
	},
	{
		id: 'kitchen',
		name: 'Kitchen',
		slug: 'Kitchen',
		icon: <KitchenIcon className="h-5 w-5 flex-shrink-0" />,
	},
	{
		id: 'roof-renovation',
		name: 'Roof Renovation',
		slug: 'Roof-renovation',
		icon: <RoofingIcon className="h-5 w-5 flex-shrink-0" />,
	},
	{
		id: 'electrical',
		name: 'Electrical',
		slug: 'Electrical',
		icon: <ElectricalIcon className="h-5 w-5 flex-shrink-0" />,
	},
	{
		id: 'remodeling',
		name: 'Remodeling',
		slug: 'Remodeling',
		icon: <RenovationIcon className="h-5 w-5 flex-shrink-0" />,
	},
];

export const getCategoryById = (id: string): ProjectCategory | undefined => {
	return PROJECT_CATEGORIES.find((category) => category.id === id);
};

export const getCategoryByName = (
	name: string,
): ProjectCategory | undefined => {
	return PROJECT_CATEGORIES.find(
		(category) =>
			category.name.toLowerCase() === name.toLowerCase() ||
			category.slug.toLowerCase() === name.toLowerCase(),
	);
};

export const getCategoryIcon = (categoryName: string): ReactNode | null => {
	const category = getCategoryByName(categoryName);
	return category?.icon || null;
};

const categoryMap = new Map<string, ProjectCategory>();
PROJECT_CATEGORIES.forEach((category) => {
	categoryMap.set(category.name.toLowerCase(), category);
	categoryMap.set(category.slug.toLowerCase(), category);
});

export const getCategoryFromMap = (
	name: string,
): ProjectCategory | undefined => {
	return categoryMap.get(name.toLowerCase());
};

export const getCategoryNames = (): string[] => {
	return PROJECT_CATEGORIES.map((category) => category.name);
};

export const CATEGORY_OPTIONS = PROJECT_CATEGORIES.map((category) => ({
	label: category.name,
	icon: category.icon,
}));

export default PROJECT_CATEGORIES;
