import { JSX } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { SpecialityTag } from '../../../shared/components/SpecialityTag/SpecialityTag';

interface SpecialitySelectorProps {
	selectedSpecialities: string[];
	availableOptions: string[];
	onAdd: (speciality: string) => void;
	onRemove: (index: number) => void;
	placeholder: string;
	label: string;
	maxItems?: number;
	error?: string;
}

export const SpecialitySelector = ({
	selectedSpecialities,
	availableOptions,
	onAdd,
	onRemove,
	placeholder,
	label,
	error,
}: SpecialitySelectorProps): JSX.Element => {
	const filteredOptions = availableOptions.filter(
		(option) => !selectedSpecialities.includes(option),
	);

	return (
		<div className="space-y-2">
			<label className="font-medium text-[#242424] md:text-base">
				{label}
			</label>

			<Select
				value=""
				onValueChange={(value) => {
					if (value) {
						onAdd(value);
					}
				}}
			>
				<SelectTrigger className="mt-2 !h-12 w-full rounded-none border border-[#242424]/50 px-4 text-left text-[#242424] transition-colors outline-none">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent className="max-h-60 overflow-y-auto rounded-none border border-[#242424]/50 bg-[#F1F3F6]">
					{filteredOptions.length === 0 ? (
						<div className="px-4 py-2 text-sm text-[#242424]/50">
							'No options available'
						</div>
					) : (
						filteredOptions.map((item) => (
							<SelectItem
								key={item}
								value={item}
								className="cursor-pointer rounded-none px-4 py-2 text-[#242424] hover:bg-[#003BFF]/10 hover:text-[#003BFF] focus:bg-[#003BFF]/10 focus:text-[#003BFF]"
							>
								{item}
							</SelectItem>
						))
					)}
				</SelectContent>
			</Select>

			{selectedSpecialities.length > 0 && (
				<div className="mt-3 flex flex-wrap gap-2">
					{selectedSpecialities.map((speciality, index) => (
						<SpecialityTag
							key={index}
							variant="removable"
							onRemove={() => onRemove(index)}
						>
							{speciality}
						</SpecialityTag>
					))}
				</div>
			)}

			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	);
};
