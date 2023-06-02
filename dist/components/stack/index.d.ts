import { type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';
import { type MaybeArray } from '@zoom-studio/zoom-js-ts-utils';
import { type BaseComponent } from '../../types';
import { StackItem } from './stack-item';
export declare namespace StackNS {
    const BaseCSSValues: readonly ["initial", "unset", "inherit"];
    type BaseCSSValues = (typeof BaseCSSValues)[number];
    const Aligns: readonly ["flex-start", "center", "flex-end", "stretch", "baseline"];
    type Aligns = (typeof Aligns)[number] | BaseCSSValues;
    const Directions: readonly ["row", "row-reverse", "column", "column-reverse"];
    type Directions = (typeof Directions)[number] | BaseCSSValues;
    const Justifies: readonly ["flex-start", "center", "flex-end", "space-between", "space-around"];
    type Justifies = (typeof Justifies)[number] | BaseCSSValues;
    interface Props extends BaseComponent {
        align?: Aligns;
        justify?: Justifies;
        direction?: Directions;
        spacing?: number | string;
        broken?: boolean;
        inline?: boolean;
        dividerFirst?: boolean;
        dividers?: MaybeArray<ReactNode>;
    }
    type StackComponent = ForwardRefExoticComponent<Props & RefAttributes<HTMLDivElement>> & {
        item: typeof StackItem;
    };
}
export declare const Stack: StackNS.StackComponent;
