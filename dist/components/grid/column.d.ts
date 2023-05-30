import React from 'react';
import { type Range } from '@zoom-studio/zoom-js-ts-utils';
import { type BaseComponent } from '../../types';
export declare namespace ColNS {
    type ColumnsRange = Range<1, 25>;
    interface Props extends BaseComponent {
        xs?: ColumnsRange;
        sm?: ColumnsRange;
        md?: ColumnsRange;
        lg?: ColumnsRange;
    }
}
export declare const Col: React.ForwardRefExoticComponent<ColNS.Props & React.RefAttributes<HTMLDivElement>>;
