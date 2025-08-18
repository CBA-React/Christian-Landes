import { JSX } from 'react';

import { PointDescriptionItem } from '@/shared/components/PointDescriptionItem/PointDescriptionItem';

export const PointsDescription = (): JSX.Element => {
    return (
        <article className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-0 mt-[80px]">
            <h1 className={'text-[36px] lg:text-[48px]'}>
                How ServiceBridge Works
            </h1>
            <div className="flex flex-col lg:flex-row gap-5 mt-[64px]">
                <PointDescriptionItem
                    backgroundColor={'#242424'}
                    number={1}
                    title={'Describe your project'}
                    description={
                        'Quickly fill out a request and add photos or documents.'
                    }
                />
                <PointDescriptionItem
                    number={2}
                    backgroundColor={'#CFEDD9'}
                    title={'Receive bids in real time'}
                    description={
                        'Get offers from local contractors matching your location.'
                    }
                />
                <PointDescriptionItem
                    number={3}
                    backgroundColor={'#7EA2AD'}
                    title={'Pick the best bid & stay in control'}
                    description={
                        'Chat, manage and track everything inside the platform.'
                    }
                />
            </div>
        </article>
    );
};
