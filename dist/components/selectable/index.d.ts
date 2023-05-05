import { FC, MouseEvent } from 'react';
import { BaseComponent } from '../../types';
export declare namespace SelectableNS {
    interface ChildrenCallbackParams<DataType extends unknown[]> {
        data: DataType[0];
        isSelected: boolean;
        select: (evt: MouseEvent) => void;
        deselect: () => void;
    }
    interface Props<ItemComponentProps extends object, DataType extends unknown[]> extends Omit<BaseComponent, 'reference' | 'children'> {
        itemComponent: FC<ItemComponentProps>;
        disabled?: boolean;
        tolerance?: number;
        dataset?: DataType;
        deselectOnOutsideClick?: boolean;
        multiSelect?: boolean;
        defaultSelections?: number[];
        onSelect?: (selectedIndexes: number[]) => void;
        children: (SelectableComponent: FC<ItemComponentProps>, params: ChildrenCallbackParams<DataType>) => JSX.Element;
    }
}
export declare const Selectable: <ItemComponentProps extends object, DataType extends unknown[]>({ deselectOnOutsideClick, tolerance, multiSelect, defaultSelections, className, containerProps, itemComponent, disabled, dataset, children, onSelect, ...rest }: SelectableNS.Props<ItemComponentProps, DataType>) => JSX.Element;
