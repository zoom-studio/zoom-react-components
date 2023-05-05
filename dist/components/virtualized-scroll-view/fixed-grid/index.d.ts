import React, { ComponentProps, PropsWithChildren, RefObject } from 'react';
import { AutoSizerProps } from 'react-virtualized-auto-sizer';
import { FixedSizeGrid, FixedSizeGridProps, GridChildComponentProps } from 'react-window';
import { VirtualizedScrollViewNS } from '..';
export declare namespace FixedGridVirtualizedScrollViewNS {
    type Ref = FixedSizeGrid<any>;
    type PropsGetter<DataType extends unknown[][] = unknown[][]> = (width: number, height: number) => FixedSizeGridProps<DataType>;
    interface Child<DataType extends unknown[][] = unknown[][]> {
        data: DataType[0][0];
        rowIndex: number;
        colIndex: number;
        isScrolling?: boolean;
    }
    interface Props<DataType extends unknown[][] = unknown[][]> extends Omit<ComponentProps<typeof FixedSizeGrid>, 'children' | 'itemData' | 'outerElementType' | 'direction' | 'width' | 'height'>, VirtualizedScrollViewNS.Props {
        dataset?: DataType;
        reference?: RefObject<Ref | undefined>;
        width: 'auto' | number;
        height: 'auto' | number;
        autoSizerProps?: Omit<AutoSizerProps, 'children'>;
    }
    interface PropsObject<DataType extends unknown[][] = unknown[][]> extends Omit<PropsWithChildren<Props<DataType>>, 'children'> {
        children: JSX.Element | ((args: Child<DataType>) => JSX.Element);
    }
    type ChildRenderer<DataType extends unknown[][] = unknown[][]> = (args: GridChildComponentProps<DataType>) => React.FunctionComponentElement<unknown>;
}
export declare function FixedGridVirtualizedScrollView<DataType extends unknown[][] = unknown[][]>({ children, dataset, scrollViewProps, reference, width, height, autoSizerProps, ...rest }: FixedGridVirtualizedScrollViewNS.PropsObject<DataType>): JSX.Element;
