import React, {
  cloneElement,
  useCallback,
  type ComponentProps,
  type PropsWithChildren,
  type Ref,
  type RefObject,
} from 'react'

import AutoSizer, { type Props as AutoSizerProps, type Size } from 'react-virtualized-auto-sizer'
import {
  VariableSizeGrid,
  type GridChildComponentProps,
  type VariableSizeGridProps,
} from 'react-window'

import { type VirtualizedScrollViewNS } from '..'
import { ScrollView, type ScrollViewNS } from '../..'
import { useZoomComponent, useZoomContext } from '../../../hooks'

export namespace VariableGridVirtualizedScrollViewNS {
  export type Ref = VariableSizeGrid<any>
  export type PropsGetter<DataType extends unknown[][] = unknown[][]> = (
    width: number,
    height: number,
  ) => VariableSizeGridProps<DataType>

  export interface Child<DataType extends unknown[][] = unknown[][]> {
    data: DataType[0][0]
    rowIndex: number
    colIndex: number
    isScrolling?: boolean
  }

  export interface Props<DataType extends unknown[][] = unknown[][]>
    extends Omit<
        ComponentProps<typeof VariableSizeGrid>,
        'children' | 'itemData' | 'outerElementType' | 'direction' | 'width' | 'height'
      >,
      VirtualizedScrollViewNS.Props {
    dataset?: DataType
    reference?: RefObject<Ref | undefined>
    width: 'auto' | number
    height: 'auto' | number
    autoSizerProps?: Omit<AutoSizerProps, 'children'>
  }

  export interface PropsObject<DataType extends unknown[][] = unknown[][]>
    extends Omit<PropsWithChildren<Props<DataType>>, 'children'> {
    children: JSX.Element | ((args: Child<DataType>) => JSX.Element)
  }

  export type ChildRenderer<DataType extends unknown[][] = unknown[][]> = (
    args: GridChildComponentProps<DataType>,
  ) => React.FunctionComponentElement<unknown>
}

export function VariableGridVirtualizedScrollView<DataType extends unknown[][] = unknown[][]>({
  children,
  dataset,
  scrollViewProps,
  reference,
  width,
  height,
  autoSizerProps,
  scrollViewRef,
  ...rest
}: VariableGridVirtualizedScrollViewNS.PropsObject<DataType>): JSX.Element {
  const { createClassName } = useZoomComponent('variable-grid-virtualized-scroll-view')
  const { isRTL } = useZoomContext()

  const classes = createClassName(rest.className)

  const renderChildren = useCallback<VariableGridVirtualizedScrollViewNS.ChildRenderer<DataType>>(
    ({ isScrolling, style, columnIndex, rowIndex }) => {
      const child =
        typeof children === 'function'
          ? children({
              data: dataset?.[rowIndex][columnIndex],
              colIndex: columnIndex,
              rowIndex,
              isScrolling,
            })
          : children

      return cloneElement(child, {
        style: { ...child.props.style, ...style },
        key: rowIndex + columnIndex,
      })
    },
    [dataset, children],
  )

  const getProps: VariableGridVirtualizedScrollViewNS.PropsGetter<DataType> = (width, height) => ({
    ...rest,
    width,
    height,
    className: classes,
    direction: isRTL ? 'rtl' : 'ltr',
    outerRef: reference,
    children: renderChildren,
    outerElementType: (props: ScrollViewNS.Props) => (
      <ScrollView
        {...props}
        {...scrollViewProps}
        maxHeight={height}
        maxWidth={width}
        ref={scrollViewRef as Ref<ScrollViewNS.ContainerNode>}
      />
    ),
  })

  return width === 'auto' || height === 'auto' ? (
    <AutoSizer {...autoSizerProps}>
      {({ width, height }: Size) => (
        <VariableSizeGrid {...getProps(width, height)} key={height + width} />
      )}
    </AutoSizer>
  ) : (
    <VariableSizeGrid {...getProps(width, height)} />
  )
}
