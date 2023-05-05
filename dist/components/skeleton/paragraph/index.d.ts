import React from 'react';
import { SkeletonNS } from '..';
export declare namespace ParagraphSkeletonNS {
    interface Props extends SkeletonNS.BaseProps {
        lines?: number;
    }
}
export declare const ParagraphSkeleton: React.ForwardRefExoticComponent<ParagraphSkeletonNS.Props & React.RefAttributes<HTMLDivElement>>;
