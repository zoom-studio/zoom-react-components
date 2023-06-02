import React from 'react';
import { type BaseComponent } from '../../types';
import { type ICON_NAMES } from './constants/icon-names';
export declare namespace IconNS {
    type Names = (typeof ICON_NAMES)[number];
    interface Props extends BaseComponent<HTMLSpanElement> {
        name: Names;
        flipOn?: 'rtl' | 'ltr';
    }
}
export declare const Icon: React.ForwardRefExoticComponent<IconNS.Props & React.RefAttributes<HTMLSpanElement>>;
