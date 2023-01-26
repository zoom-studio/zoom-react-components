import React, {
  cloneElement,
  ComponentProps,
  PropsWithChildren,
  RefObject,
  useCallback,
} from 'react'

import AutoSizer, { AutoSizerProps } from 'react-virtualized-auto-sizer'
import { ListChildComponentProps, VariableSizeList, VariableSizeListProps } from 'react-window'

import { VirtualizedScrollViewNS } from '..'
import { ScrollView, ScrollViewNS } from '../..'
import { useZoomComponent, useZoomContext } from '../../../hooks'

export namespace VariableListVirtualizedScrollViewNS {
  export type Ref = VariableSizeList<any>
  export type PropsGetter<DataType extends unknown[] = unknown[]> = (
    width: number | string,
    height: number | string,
  ) => VariableSizeListProps<DataType>

  export interface Child<DataType extends unknown[] = unknown[]> {
    data: DataType[0]
    index: number
    isScrolling?: boolean
  }

  export interface Props<DataType extends unknown[] = unknown[]>
    extends Omit<
        ComponentProps<typeof VariableSizeList>,
        'children' | 'itemData' | 'outerElementType' | 'direction' | 'width' | 'height'
      >,
      VirtualizedScrollViewNS.Props {
    dataset?: DataType
    reference?: RefObject<Ref | undefined>
    width: 'auto' | number | (string & {})
    height: 'auto' | number | (string & {})
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

export function VariableListVirtualizedScrollView<DataType extends unknown[] = unknown[]>({
  children,
  dataset,
  scrollViewProps,
  reference,
  width,
  height,
  autoSizerProps,
  ...rest
}: VariableListVirtualizedScrollViewNS.PropsObject<DataType>): JSX.Element {
  const { createClassName } = useZoomComponent('variable-list-virtualized-scroll-view')
  const { isRTL } = useZoomContext()

  const classes = createClassName(rest.className)

  const renderChildren = useCallback<VariableListVirtualizedScrollViewNS.ChildRenderer<DataType>>(
    ({ isScrolling, index, style }) => {
      const child =
        typeof children === 'function'
          ? children({ data: dataset?.[index], index, isScrolling })
          : children

      return cloneElement(child, { style: { ...child.props.style, ...style }, key: index })
    },
    [dataset, children, reference],
  )

  const getProps: VariableListVirtualizedScrollViewNS.PropsGetter<DataType> = (width, height) => ({
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
      {({ width, height }) => (
        <VariableSizeList {...getProps(width, height)} key={height + width} />
      )}
    </AutoSizer>
  ) : (
    <VariableSizeList {...getProps(width, height)} />
  )
}
