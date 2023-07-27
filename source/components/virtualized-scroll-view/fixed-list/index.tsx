import React, {
  cloneElement,
  useCallback,
  type ComponentProps,
  type PropsWithChildren,
  type Ref,
  type RefObject,
} from 'react'

import { type MaybeString } from '@zoom-studio/zoom-js-ts-utils'
import AutoSizer, { type Props as AutoSizerProps, type Size } from 'react-virtualized-auto-sizer'
import { FixedSizeList, type FixedSizeListProps, type ListChildComponentProps } from 'react-window'

import { type VirtualizedScrollViewNS } from '..'
import { ScrollView, type ScrollViewNS } from '../..'
import { useZoomComponent, useZoomContext } from '../../../hooks'

export namespace FixedListVirtualizedScrollViewNS {
  export type Ref = FixedSizeList<any>
  export type PropsGetter<DataType extends unknown[] = unknown[]> = (
    width: number | string,
    height: number | string,
  ) => FixedSizeListProps<DataType>

  export interface Child<DataType extends unknown[] = unknown[]> {
    data: DataType[0]
    index: number
    isScrolling?: boolean
  }

  export interface Props<DataType extends unknown[] = unknown[]>
    extends Omit<
        ComponentProps<typeof FixedSizeList>,
        'children' | 'itemData' | 'outerElementType' | 'direction' | 'width' | 'height'
      >,
      VirtualizedScrollViewNS.Props {
    dataset?: DataType
    reference?: RefObject<Ref | undefined>
    width: MaybeString<'auto'> | number
    height: MaybeString<'auto'> | number
    autoSizerProps?: Omit<AutoSizerProps, 'children'>
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
  width,
  height,
  autoSizerProps,
  scrollViewRef,
  ...rest
}: FixedListVirtualizedScrollViewNS.PropsObject<DataType>): JSX.Element {
  const { createClassName } = useZoomComponent('fixed-list-virtualized-scroll-view')
  const { isRTL } = useZoomContext()

  const classes = createClassName(rest.className)

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

  const getProps: FixedListVirtualizedScrollViewNS.PropsGetter<DataType> = (width, height) => ({
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
        <FixedSizeList {...getProps(width, height)} key={height + width} />
      )}
    </AutoSizer>
  ) : (
    <FixedSizeList {...getProps(width, height)} />
  )
}
