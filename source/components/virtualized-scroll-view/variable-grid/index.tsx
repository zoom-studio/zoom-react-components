import React, {
  cloneElement,
  ComponentProps,
  FC,
  PropsWithChildren,
  RefObject,
  useCallback,
} from 'react'

import { VariableSizeGrid, GridChildComponentProps } from 'react-window'

import { VirtualizedScrollViewNS } from '..'
import { ScrollView, ScrollViewNS } from '../..'
import { useZoomComponent, useZoomContext } from '../../../hooks'

export namespace VariableGridVirtualizedScrollViewNS {
  export type Ref = VariableSizeGrid<any>

  export interface Child<DataType extends unknown[][] = unknown[][]> {
    data: DataType[0][0]
    rowIndex: number
    colIndex: number
    isScrolling?: boolean
  }

  export interface Props<DataType extends unknown[][] = unknown[][]>
    extends Omit<
        ComponentProps<typeof VariableSizeGrid>,
        'children' | 'itemData' | 'outerElementType' | 'direction'
      >,
      VirtualizedScrollViewNS.Props {
    dataset?: DataType
    reference?: RefObject<Ref | undefined>
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
  ...rest
}: VariableGridVirtualizedScrollViewNS.PropsObject<DataType>): JSX.Element {
  const { createClassName } = useZoomComponent('variable-grid-virtualized-scroll-view')
  const { isRTL } = useZoomContext()

  const classes = createClassName(rest.className)

  const ScrollViewComponent: FC<ScrollViewNS.Props> = props => (
    <ScrollView {...props} {...scrollViewProps} maxHeight={rest.height} maxWidth={rest.width} />
  )

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

  return (
    <VariableSizeGrid
      {...rest}
      outerElementType={ScrollViewComponent}
      className={classes}
      direction={isRTL ? 'rtl' : 'ltr'}
      ref={reference as RefObject<VariableGridVirtualizedScrollViewNS.Ref>}
    >
      {renderChildren}
    </VariableSizeGrid>
  )
}
