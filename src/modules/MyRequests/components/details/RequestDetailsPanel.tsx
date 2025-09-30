import { JSX } from 'react';
import CalendarIcon from 'public/icons/profile/calendar.svg';
import ClockIcon from 'public/icons/profile/clock.svg';

interface DetailItem {
	label: string;
	value: string;
	type: 'calendar' | 'clock';
}

interface RequestDetailsPanelProps {
	details: DetailItem[];
	className?: string;
}

const iconMap = {
	calendar: CalendarIcon,
	clock: ClockIcon,
};

export const RequestDetailsPanel = ({
	details,
	className,
}: RequestDetailsPanelProps): JSX.Element => {
	return (
		<div className={`rounded-lg bg-[#F1F3F6] p-6 ${className}`}>
			<h2 className="font-chalet-1960 mb-6 text-[40px] font-medium tracking-[-1px] text-[#242424]">
				Project Details
			</h2>

			<div className="space-y-3">
				{details.map((detail, idx) => {
					const IconComponent = iconMap[detail.type];

					return (
						<div
							key={idx}
							className="flex items-center gap-3 bg-white p-4"
						>
							<div className="flex-shrink-0 text-[#242424]/60">
								<IconComponent />
							</div>
							<div>
								{detail.label && (
									<span className="mr-1 text-[16px] text-[#242424]">
										{detail.label}
									</span>
								)}
								<span className="text-[16px] text-[#242424]">
									{detail.value}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
