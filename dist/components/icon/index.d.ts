import React from 'react';
import { BaseComponent } from '../../types';
import { ICON_NAMES } from './constants/icon-names';
export declare namespace IconNS {
    type Names = typeof ICON_NAMES[number];
    interface Props extends BaseComponent<HTMLSpanElement> {
        name: Names;
        flipOn?: 'rtl' | 'ltr';
    }
}
export declare const Icon: React.ForwardRefExoticComponent<IconNS.Props & React.RefAttributes<HTMLSpanElement>>;
