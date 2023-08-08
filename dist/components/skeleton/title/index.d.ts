import React from 'react';
import { type Range } from '@zoom-studio/js-ts-utils';
import { type SkeletonNS } from '..';
export declare namespace TitleSkeletonNS {
    interface Props extends SkeletonNS.BaseProps {
        tagLevel?: Range<1, 7>;
        width?: string | number;
    }
}
export declare const TitleSkeleton: React.ForwardRefExoticComponent<TitleSkeletonNS.Props & React.RefAttributes<HTMLDivElement>>;
