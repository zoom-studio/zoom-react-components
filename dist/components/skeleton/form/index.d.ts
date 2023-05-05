import React from 'react';
import { SkeletonNS } from '..';
import { ButtonNS } from '../..';
import { CommonSize } from '../../../types';
export declare namespace FormSkeletonNS {
    interface Size {
        width?: string | number;
        height?: string | number;
    }
    interface Props extends SkeletonNS.BaseProps {
        size?: CommonSize;
        customSize?: Size;
        shape?: ButtonNS.Shapes;
    }
}
export declare const FormSkeleton: React.ForwardRefExoticComponent<FormSkeletonNS.Props & React.RefAttributes<HTMLDivElement>>;
