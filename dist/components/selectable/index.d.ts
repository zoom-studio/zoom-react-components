import React, { type FC } from 'react';
import { type BaseComponent } from '../../types';
export declare namespace SelectableNS {
    const KEY = "data-key";
    const CLASSNAMES: {
        SELECTED: string;
        SELECTABLE: string;
    };
    interface ChildrenItemProps {
        [KEY]: number;
        className: string;
    }
    interface ChildrenCallbackParams<DataType extends unknown[]> {
        data: DataType[0];
        isSelected: boolean;
        index: number;
        props: ChildrenItemProps;
        select: () => void;
    }
    interface Props<ItemComponentProps extends object, DataType extends unknown[]> extends Omit<BaseComponent, 'reference' | 'children'> {
        itemComponent: FC<ItemComponentProps>;
        disabled?: boolean;
        dataset?: DataType;
        multiSelect?: boolean;
        defaultSelections?: Set<number>;
        onSelect?: (selectedIndexes: number[]) => void;
        children: (SelectableComponent: FC<ItemComponentProps>, params: ChildrenCallbackParams<DataType>) => JSX.Element;
    }
}
export declare const Selectable: <ItemComponentProps extends object, DataType extends unknown[]>({ multiSelect, defaultSelections, className, containerProps, itemComponent, disabled, dataset, children, onSelect, ...rest }: SelectableNS.Props<ItemComponentProps, DataType>) => React.JSX.Element;
