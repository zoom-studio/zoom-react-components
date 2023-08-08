import React from 'react';
import { type MaybeString } from '@zoom-studio/js-ts-utils';
import { type Transition } from '../../types';
export declare namespace CollapseNS {
    interface Props {
        expanded?: boolean;
        children?: JSX.Element;
        childHeight?: MaybeString<'auto-detect'> | number | ((detectedHeight: number) => number);
        transition?: Transition;
    }
}
export declare const Collapse: React.ForwardRefExoticComponent<CollapseNS.Props & React.RefAttributes<HTMLElement>>;
