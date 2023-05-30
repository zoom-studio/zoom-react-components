import React, {
  cloneElement,
  type ComponentProps,
  type PropsWithChildren,
  type RefObject,
  useCallback,
} from 'react'

import AutoSizer, { type Props as AutoSizerProps, type Size } from 'react-virtualized-auto-sizer'
import { FixedSizeGrid, type FixedSizeGridProps, type GridChildComponentProps } from 'react-window'

import { type VirtualizedScrollViewNS } from '..'
import { ScrollView, type ScrollViewNS } from '../..'
import { useZoomComponent, useZoomContext } from '../../../hooks'

export namespace FixedGridVirtualizedScrollViewNS {
  export type Ref = FixedSizeGrid<any>
  export type PropsGetter<DataType extends unknown[][] = unknown[][]> = (
    width: number,
    height: number,
  ) => FixedSizeGridProps<DataType>

  export interface Child<DataType extends unknown[][] = unknown[][]> {
    data: DataType[0][0]
    rowIndex: number
    colIndex: number
    isScrolling?: boolean
  }

  export interface Props<DataType extends unknown[][] = unknown[][]>
    extends Omit<
        ComponentProps<typeof FixedSizeGrid>,
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

export function FixedGridVirtualizedScrollView<DataType extends unknown[][] = unknown[][]>({
  children,
  dataset,
  scrollViewProps,
  reference,
  width,
  height,
  autoSizerProps,
  ...rest
}: FixedGridVirtualizedScrollViewNS.PropsObject<DataType>): JSX.Element {
  const { createClassName } = useZoomComponent('fixed-grid-virtualized-scroll-view')
  const { isRTL } = useZoomContext()

  const classes = createClassName(rest.className)

  const renderChildren = useCallback<FixedGridVirtualizedScrollViewNS.ChildRenderer<DataType>>(
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

  const getProps: FixedGridVirtualizedScrollViewNS.PropsGetter<DataType> = (width, height) => ({
    ...rest,
    width,
    height,
    className: classes,
    direction: isRTL ? 'rtl' : 'ltr',
    outerRef: reference,
    children: renderChildren,
    outerElementType: (props: ScrollViewNS.Props) => (
      <ScrollView {...props} {...scrollViewProps} maxHeight={height} maxWidth={width} />
    ),
  })

  return width === 'auto' || height === 'auto' ? (
    <AutoSizer {...autoSizerProps}>
      {({ width, height }: Size) => (
        <FixedSizeGrid {...getProps(width, height)} key={height + width} />
      )}
    </AutoSizer>
  ) : (
    <FixedSizeGrid {...getProps(width, height)} />
  )
}
