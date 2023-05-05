import React from 'react';
import { SkeletonNS } from '..';
import { IconNS } from '../../icon';
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
