import React, { ComponentProps, PropsWithChildren, RefObject } from 'react';
import { AutoSizerProps } from 'react-virtualized-auto-sizer';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';
import { VirtualizedScrollViewNS } from '..';
export declare namespace FixedListVirtualizedScrollViewNS {
    type Ref = FixedSizeList<any>;
    type PropsGetter<DataType extends unknown[] = unknown[]> = (width: number | string, height: number | string) => FixedSizeListProps<DataType>;
    interface Child<DataType extends unknown[] = unknown[]> {
        data: DataType[0];
        index: number;
        isScrolling?: boolean;
    }
    interface Props<DataType extends unknown[] = unknown[]> extends Omit<ComponentProps<typeof FixedSizeList>, 'children' | 'itemData' | 'outerElementType' | 'direction' | 'width' | 'height'>, VirtualizedScrollViewNS.Props {
        dataset?: DataType;
        reference?: RefObject<Ref | undefined>;
        width: 'auto' | number | (string & {});
        height: 'auto' | number | (string & {});
        autoSizerProps?: Omit<AutoSizerProps, 'children'>;
    }
    interface PropsObject<DataType extends unknown[] = unknown[]> extends Omit<PropsWithChildren<Props<DataType>>, 'children'> {
        children: JSX.Element | ((args: Child<DataType>) => JSX.Element);
    }
    type ChildRenderer<DataType extends unknown[] = unknown[]> = (args: ListChildComponentProps<DataType>) => React.FunctionComponentElement<unknown>;
}
export declare function FixedListVirtualizedScrollView<DataType extends unknown[] = unknown[]>({ children, dataset, scrollViewProps, reference, width, height, autoSizerProps, ...rest }: FixedListVirtualizedScrollViewNS.PropsObject<DataType>): JSX.Element;
