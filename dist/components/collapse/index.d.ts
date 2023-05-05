import React from 'react';
import { Transition } from '../../types';
export declare namespace CollapseNS {
    interface Props {
        expanded?: boolean;
        children?: JSX.Element;
        childHeight?: 'auto-detect' | number | (string & {}) | ((detectedHeight: number) => number);
        transition?: Transition;
    }
}
export declare const Collapse: React.ForwardRefExoticComponent<CollapseNS.Props & React.RefAttributes<HTMLElement>>;
