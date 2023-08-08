import React, { type ComponentProps, type PropsWithChildren, type RefObject } from 'react';
import { type Props as AutoSizerProps } from 'react-virtualized-auto-sizer';
import { VariableSizeGrid, type GridChildComponentProps, type VariableSizeGridProps } from 'react-window';
import { type VirtualizedScrollViewNS } from '..';
export declare namespace VariableGridVirtualizedScrollViewNS {
    type Ref = VariableSizeGrid<any>;
    type PropsGetter<DataType extends unknown[][] = unknown[][]> = (width: number, height: number) => VariableSizeGridProps<DataType>;
    interface Child<DataType extends unknown[][] = unknown[][]> {
        data: DataType[0][0];
        rowIndex: number;
        colIndex: number;
        isScrolling?: boolean;
    }
    interface Props<DataType extends unknown[][] = unknown[][]> extends Omit<ComponentProps<typeof VariableSizeGrid>, 'children' | 'itemData' | 'outerElementType' | 'direction' | 'width' | 'height'>, VirtualizedScrollViewNS.Props {
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
export declare function VariableGridVirtualizedScrollView<DataType extends unknown[][] = unknown[][]>({ children, dataset, scrollViewProps, reference, width, height, autoSizerProps, scrollViewRef, ...rest }: VariableGridVirtualizedScrollViewNS.PropsObject<DataType>): JSX.Element;
