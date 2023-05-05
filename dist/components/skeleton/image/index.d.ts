import React from 'react';
import { SkeletonNS } from '..';
import { IconNS } from '../..';
import { CommonSize } from '../../../types';
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
