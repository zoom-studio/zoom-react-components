import React, { type ReactNode, useRef } from 'react'

import { type Row, type Table } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useVariable } from '@zoom-studio/zoom-js-ts-utils'

import { type TableNS } from '../types'

export namespace UseTableRowsNS {
  export interface VirtualizedRowObservers {
    firstRow: ReactNode
    lastRow: ReactNode
  }
}

export const useTableRows = (table: Table<unknown>, virtualized?: TableNS.VirtualizedSettings) => {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = virtualized
    ? useVirtualizer({
        count: rows.length,
        estimateSize: () => virtualized.estimateRowSize,
        getScrollElement: () => tableContainerRef.current,
      })
    : null

  const tableRows = useVariable<Row<unknown>[]>(() => {
    if (virtualized && rowVirtualizer) {
      const { getVirtualItems } = rowVirtualizer
      return getVirtualItems().map(virtualItem => rows[virtualItem.index])
    }
    return rows
  })

  const virtualizedRowObservers = useVariable<UseTableRowsNS.VirtualizedRowObservers>(() => {
    if (!virtualized || !rowVirtualizer) {
      return { firstRow: <></>, lastRow: <></> }
    }

    const { getVirtualItems, getTotalSize } = rowVirtualizer
    const totalSize = getTotalSize()
    const virtualItems = getVirtualItems()

    const paddingTop = virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0

    const paddingBottom =
      virtualItems.length > 0 ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end || 0) : 0

    return {
      firstRow: (
        <>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
        </>
      ),
      lastRow: (
        <>
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </>
      ),
    }
  })

  return { tableContainerRef, tableRows, virtualizedRowObservers }
}
