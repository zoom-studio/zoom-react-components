import React from 'react';
import { ButtonNS } from '..';
import { BaseComponent, Color } from '../../types';
export declare namespace FilterButtonNS {
    interface Props extends BaseComponent<HTMLButtonElement>, Pick<ButtonNS.Props, 'size' | 'disabled' | 'children' | 'href' | 'target' | 'loading' | 'active' | 'disabledOnLoading' | 'prefixMaterialIcon' | 'prefixEmojiIcon' | 'useSpan' | 'className' | 'onClick'> {
        color: Color;
    }
}
export declare const FilterButton: React.ForwardRefExoticComponent<FilterButtonNS.Props & React.RefAttributes<HTMLButtonElement>>;
