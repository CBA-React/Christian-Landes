import { ReactNode } from 'react';

import KitchenIcon from '../../../public/icons/categories/categories-handyperson-icon.svg';
import BathroomIcon from '../../../public/icons/categories/categories-bathroom-icon.svg';
import RoofingIcon from '../../../public/icons/categories/categories-roofing-icon.svg';
import ElectricalIcon from '../../../public/icons/categories/categories-electrical-icon.svg';
import PlumbingIcon from '../../../public/icons/categories/categories-plumbing-icon.svg';
import LandscapingIcon from '../../../public/icons/categories/categories-landscaping-icon.svg';
import PaintingIcon from '../../../public/icons/categories/categories-painting-icon.svg';
import RenovationIcon from '../../../public/icons/categories/categories-renovation-icon.svg';
import RemodelingIcon from '../../../public/icons/categories/categories-remodeling-icon.svg';

export interface ProjectCategory {
	id: string;
	name: string;
	icon: ReactNode;
	slug: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
	{
		id: 'kitchen-remodeling',
		name: 'Kitchen Remodeling',
		slug: 'kitchen-remodeling',
		icon: <KitchenIcon />,
	},
	{
		id: 'bathroom',
		name: 'Bathroom',
		slug: 'bathroom',
		icon: <BathroomIcon />,
	},
	{
		id: 'roofing',
		name: 'Roofing',
		slug: 'roofing',
		icon: <RoofingIcon />,
	},
	{
		id: 'remodeling',
		name: 'Remodeling',
		slug: 'remodeling',
		icon: <RemodelingIcon />,
	},
	{
		id: 'electrical-work',
		name: 'Electrical Work',
		slug: 'electrical-work',
		icon: <ElectricalIcon />,
	},
	{
		id: 'plumbing',
		name: 'Plumbing',
		slug: 'plumbing',
		icon: <PlumbingIcon />,
	},
	{
		id: 'landscaping',
		name: 'Landscaping',
		slug: 'landscaping',
		icon: <LandscapingIcon />,
	},
	{
		id: 'painting',
		name: 'Painting',
		slug: 'painting',
		icon: <PaintingIcon />,
	},
	{
		id: 'renovation',
		name: 'Renovation',
		slug: 'renovation',
		icon: <RenovationIcon />,
	},
];

export const getCategoryById = (id: string): ProjectCategory | undefined => {
	return PROJECT_CATEGORIES.find((category) => category.id === id);
};

export const getCategoryBySlug = (
	slug: string,
): ProjectCategory | undefined => {
	return PROJECT_CATEGORIES.find((category) => category.slug === slug);
};

export const getCategoryNames = (): string[] => {
	return PROJECT_CATEGORIES.map((category) => category.name);
};

export const getCategorySlugs = (): string[] => {
	return PROJECT_CATEGORIES.map((category) => category.slug);
};

export const CATEGORY_OPTIONS = PROJECT_CATEGORIES.map((category) => ({
	value: category.slug,
	label: category.name,
	icon: category.icon,
}));

export default PROJECT_CATEGORIES;
