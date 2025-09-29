import { JSX } from 'react';

interface DetailItem {
    icon: JSX.Element;
    label: string;
    value: string;
}

interface RequestDetailsPanelProps {
    details: DetailItem[];
}

export const RequestDetailsPanel = ({
    details,
}: RequestDetailsPanelProps): JSX.Element => {
    return (
        <div className="rounded-lg bg-[#F8F9FA] p-6">
            <h2 className="mb-6 text-[24px] font-normal text-[#242424]">
                Project Details
            </h2>
            
            <div className="space-y-4">
                {details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 text-[#242424]/60">
                            {detail.icon}
                        </div>
                        <div>
                            {detail.label && (
                                <p className="text-xs text-[#242424]/60">
                                    {detail.label}
                                </p>
                            )}
                            <p className="text-sm font-medium text-[#242424]">
                                {detail.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};