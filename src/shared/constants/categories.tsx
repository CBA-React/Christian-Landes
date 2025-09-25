import HandypersonIcon from 'public/icons/categories/categories-handyperson-icon.svg';
import LandscapingIcon from 'public/icons/categories/categories-landscaping-icon.svg';
import PlumbingIcon from 'public/icons/categories/categories-plumbing-icon.svg';
import RemodelingIcon from 'public/icons/categories/categories-remodeling-icon.svg';
import ElectricalIcon from 'public/icons/categories/categories-electrical-icon.svg';
import PaintingIcon from 'public/icons/categories/categories-painting-icon.svg';
import WindowIcon from 'public/icons/categories/categories-window-icon.svg';
import CleaningIcon from 'public/icons/categories/categories-cleaning-icon.svg';
import ConcreteIcon from 'public/icons/categories/categories-concrete-icon.svg';

export const categoriesData = [
	{
		id: 1,
		name: 'Handyperson',
		icon: <HandypersonIcon />,
	},
	{
		id: 2,
		name: 'Landscaping',
		icon: <LandscapingIcon />,
	},
	{
		id: 3,
		name: 'Plumbing',
		icon: <PlumbingIcon />,
	},
	{
		id: 4,
		name: 'Remodeling',
		icon: <RemodelingIcon />,
	},
	{
		id: 5,
		name: 'Electrical',
		icon: <ElectricalIcon />,
	},
	{
		id: 6,
		name: 'Painting',
		icon: <PaintingIcon />,
	},
	{
		id: 7,
		name: 'Window',
		icon: <WindowIcon />,
	},
	{
		id: 8,
		name: 'Cleaning',
		icon: <CleaningIcon />,
	},
	{
		id: 9,
		name: 'Concrete',
		icon: <ConcreteIcon />,
	},
];

export type CategoryItem = {
	id: number;
	name: string;
	icon: React.ReactNode;
};
