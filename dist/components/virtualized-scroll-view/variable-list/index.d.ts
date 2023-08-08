import React, { type ComponentProps, type PropsWithChildren, type RefObject } from 'react';
import { type MaybeString } from '@zoom-studio/js-ts-utils';
import { type Props as AutoSizerProps } from 'react-virtualized-auto-sizer';
import { VariableSizeList, type ListChildComponentProps, type VariableSizeListProps } from 'react-window';
import { type VirtualizedScrollViewNS } from '..';
export declare namespace VariableListVirtualizedScrollViewNS {
    type Ref = VariableSizeList<any>;
    type PropsGetter<DataType extends unknown[] = unknown[]> = (width: number | string, height: number | string) => VariableSizeListProps<DataType>;
    interface Child<DataType extends unknown[] = unknown[]> {
        data: DataType[0];
        index: number;
        isScrolling?: boolean;
    }
    interface Props<DataType extends unknown[] = unknown[]> extends Omit<ComponentProps<typeof VariableSizeList>, 'children' | 'itemData' | 'outerElementType' | 'direction' | 'width' | 'height'>, VirtualizedScrollViewNS.Props {
        dataset?: DataType;
        reference?: RefObject<Ref | undefined>;
        width: MaybeString<'auto'> | number;
        height: MaybeString<'auto'> | number;
        autoSizerProps?: Omit<AutoSizerProps, 'children'>;
    }
    interface PropsObject<DataType extends unknown[] = unknown[]> extends Omit<PropsWithChildren<Props<DataType>>, 'children'> {
        children: JSX.Element | ((args: Child<DataType>) => JSX.Element);
    }
    type ChildRenderer<DataType extends unknown[] = unknown[]> = (args: ListChildComponentProps<DataType>) => React.FunctionComponentElement<unknown>;
}
export declare function VariableListVirtualizedScrollView<DataType extends unknown[] = unknown[]>({ children, dataset, scrollViewProps, reference, width, height, autoSizerProps, scrollViewRef, ...rest }: VariableListVirtualizedScrollViewNS.PropsObject<DataType>): JSX.Element;
