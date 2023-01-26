import React from 'react'

import AutoSizer, { AutoSizerProps } from 'react-virtualized-auto-sizer'

import { VirtualizedScrollView } from '..'

export namespace AutoFixedListVirtualizedScrollViewNS {
  export type Virtualizer<DataType extends unknown[] = unknown[]> = Omit<
    VirtualizedScrollView.FixedListNS.PropsObject<DataType>,
    'width' | 'height'
  > &
    Omit<AutoSizerProps, 'children'>

  export interface Props<DataType extends unknown[] = unknown[]> extends Virtualizer<DataType> {}
}

export function FixedListVirtualizedScrollView<DataType extends unknown[] = unknown[]>({
  ...rest
}: AutoFixedListVirtualizedScrollViewNS.Props<DataType>): JSX.Element {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <VirtualizedScrollView.FixedList {...rest} width={width} height={height} />
      )}
    </AutoSizer>
  )
}
