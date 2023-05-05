import React from 'react';
import { SkeletonNS } from '..';
import { CommonSize } from '../../../types';
export declare namespace AvatarSkeletonNS {
    interface Props extends SkeletonNS.BaseProps {
        type?: 'group' | 'single';
        groupLength?: number;
        size?: CommonSize;
        customSize?: number;
    }
}
export declare const AvatarSkeleton: React.ForwardRefExoticComponent<AvatarSkeletonNS.Props & React.RefAttributes<HTMLDivElement>>;
