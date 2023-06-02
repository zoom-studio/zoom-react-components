import React from 'react';
import { type SkeletonNS } from '..';
import { type IconNS } from '../../icon';
export declare namespace PaperSkeletonNS {
    interface Size {
        width: string | number;
        height: string | number;
    }
    interface Props extends SkeletonNS.BaseProps {
        size: Size;
        icon?: IconNS.Names;
        iconSize?: string;
        circular?: boolean;
    }
}
export declare const PaperSkeleton: React.ForwardRefExoticComponent<PaperSkeletonNS.Props & React.RefAttributes<HTMLDivElement>>;
