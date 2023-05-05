import React from 'react';
import { Range } from '@zoom-studio/zoom-js-ts-utils';
import { SkeletonNS } from '..';
export declare namespace TitleSkeletonNS {
    interface Props extends SkeletonNS.BaseProps {
        tagLevel?: Range<1, 7>;
        width?: string | number;
    }
}
export declare const TitleSkeleton: React.ForwardRefExoticComponent<TitleSkeletonNS.Props & React.RefAttributes<HTMLDivElement>>;
