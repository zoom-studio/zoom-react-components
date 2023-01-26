import React, {
  cloneElement,
  ComponentProps,
  FC,
  PropsWithChildren,
  RefObject,
  useCallback,
} from 'react'

import { FixedSizeList, ListChildComponentProps } from 'react-window'

import { VirtualizedScrollViewNS } from '..'
import { ScrollView, ScrollViewNS } from '../..'
import { useZoomComponent, useZoomContext } from '../../../hooks'

export namespace FixedListVirtualizedScrollViewNS {
  export type Ref = FixedSizeList<any>

  export interface Child<DataType extends unknown[] = unknown[]> {
    data: DataType[0]
    index: number
    isScrolling?: boolean
  }

  export interface Props<DataType extends unknown[] = unknown[]>
    extends Omit<
        ComponentProps<typeof FixedSizeList>,
        'children' | 'itemData' | 'outerElementType' | 'direction'
      >,
      VirtualizedScrollViewNS.Props {
    dataset?: DataType
    reference?: RefObject<Ref | undefined>
  }

  export interface PropsObject<DataType extends unknown[] = unknown[]>
    extends Omit<PropsWithChildren<Props<DataType>>, 'children'> {
    children: JSX.Element | ((args: Child<DataType>) => JSX.Element)
  }

  export type ChildRenderer<DataType extends unknown[] = unknown[]> = (
    args: ListChildComponentProps<DataType>,
  ) => React.FunctionComponentElement<unknown>
}

export function FixedListVirtualizedScrollView<DataType extends unknown[] = unknown[]>({
  children,
  dataset,
  scrollViewProps,
  reference,
  ...rest
}: FixedListVirtualizedScrollViewNS.PropsObject<DataType>): JSX.Element {
  const { createClassName } = useZoomComponent('fixed-list-virtualized-scroll-view')
  const { isRTL } = useZoomContext()

  const classes = createClassName(rest.className)

  const ScrollViewComponent: FC<ScrollViewNS.Props> = props => (
    <ScrollView {...props} {...scrollViewProps} maxHeight={rest.height} maxWidth={rest.width} />
  )

  const renderChildren = useCallback<FixedListVirtualizedScrollViewNS.ChildRenderer<DataType>>(
    ({ isScrolling, index, style }) => {
      const child =
        typeof children === 'function'
          ? children({ data: dataset?.[index], index, isScrolling })
          : children

      return cloneElement(child, { style: { ...child.props.style, ...style }, key: index })
    },
    [dataset, children],
  )

  return (
    <FixedSizeList
      {...rest}
      outerElementType={ScrollViewComponent}
      className={classes}
      direction={isRTL ? 'rtl' : 'ltr'}
      ref={reference as RefObject<FixedListVirtualizedScrollViewNS.Ref>}
    >
      {renderChildren}
    </FixedSizeList>
  )
}
