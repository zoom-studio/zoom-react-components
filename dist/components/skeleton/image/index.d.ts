import React from 'react';
import { type SkeletonNS } from '..';
import { type IconNS } from '../..';
import { type CommonSize } from '../../../types';
export declare namespace ImageSkeletonNS {
    interface Size {
        width?: string | number;
        height?: string | number;
    }
    interface Props extends SkeletonNS.BaseProps {
        size?: CommonSize;
        customSize?: Size;
        icon?: IconNS.Names;
        iconSize?: string;
    }
}
export declare const ImageSkeleton: React.ForwardRefExoticComponent<ImageSkeletonNS.Props & React.RefAttributes<HTMLDivElement>>;
