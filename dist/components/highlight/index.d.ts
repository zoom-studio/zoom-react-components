import React from 'react';
import { type MaybeArray } from '@zoom-studio/js-ts-utils';
import { type BaseComponent } from '../../types';
export declare namespace HighlightNS {
    interface Props extends BaseComponent {
        search?: MaybeArray<string>;
    }
}
export declare const Highlight: React.ForwardRefExoticComponent<HighlightNS.Props & React.RefAttributes<HTMLDivElement>>;
