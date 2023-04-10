import React, { CSSProperties, UIEvent, useState } from 'react'

import {
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useFutureEffect, useZoomComponent } from '../../hooks'

import { TableBody, TableFooter, TableHeader } from './section-components'
import { TableNS } from './types'
import { useGenerateColumns } from './use-generate-columns'
import { useTableI18n } from './use-i18n'
import { useTableRows } from './use-table-rows'

export const Table = <Dataset extends unknown[]>({
  resizeColumnOnReleaseMouseButton: resizeOnEnd,
  maxHeight = '700px',
  stickyHeader = true,
  stickyFooter = true,
  resizableColumns = true,
  stickyActions = true,
  actions = [],
  toggleSelectOnRowClick = true,
  expandableRows,
  striped,
  hoverable,
  renderFooter,
  selectable,
  className,
  containerProps,
  reference,
  dataset,
  children,
  maxWidth,
  minHeight,
  minWidth,
  onSelectionChange,
  enableSelectCheckboxOptions,
  actionsColumnWidth,
  id,
  renderRowExpanded,
  isRowExpandable,
  virtualized,
  onSortChange,
  sortable,
}: TableNS.Props<Dataset>) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const { createClassName, globalI18ns } = useZoomComponent('table')
  const i18n = useTableI18n(globalI18ns)
  const columns = useGenerateColumns({
    children,
    selectable,
    i18n,
    enableSelectCheckboxOptions,
    expandableRows,
    actions,
    actionsColumnWidth,
  })

  const table = useReactTable({
    columns,
    state: { rowSelection, sorting },
    data: dataset,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: resizeOnEnd ? 'onEnd' : 'onChange',
    enableRowSelection:
      typeof selectable === 'function' ? ({ original }) => selectable(original) : selectable,
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: ({ original }) => (isRowExpandable ? isRowExpandable(original) : true),
    enableSorting: !!sortable,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  })
  const { tableContainerRef, tableRows, virtualizedRowObservers } = useTableRows(table, virtualized)

  const handleOnScroll = (evt: UIEvent<HTMLDivElement>) => {
    if (virtualized) {
      table.toggleAllRowsExpanded(false)
    }
  }

  const classes = createClassName(className, '', {
    [createClassName('', 'sticky-header')]: stickyHeader,
    [createClassName('', 'sticky-footer')]: stickyFooter,
    [createClassName('', 'sticky-actions')]: stickyActions && actions.length > 0,
    [createClassName('', 'hoverable')]: !!hoverable,
    [createClassName('', 'striped')]: !!striped,
    [createClassName('', 'selectable')]: !!selectable,
    [createClassName('', 'expandable-rows')]: !!expandableRows,
  })

  const tableStyles: CSSProperties = {
    width: table.getCenterTotalSize(),
  }

  useFutureEffect(() => {
    onSelectionChange?.(Object.keys(rowSelection).map(rowIndex => parseInt(rowIndex)))
  }, [rowSelection])

  useFutureEffect(() => {
    onSortChange?.(sorting[0])
  }, [sorting])

  return (
    <div {...containerProps} ref={reference} id={id} className={classes}>
      <div
        className="table-scroll-view"
        ref={tableContainerRef}
        style={{ maxHeight, maxWidth, minHeight, minWidth }}
        onScroll={handleOnScroll}
      >
        <table cellSpacing={0} style={tableStyles}>
          <TableHeader
            table={table}
            resizableColumns={resizableColumns}
            resizeColumnOnReleaseMouseButton={!!resizeOnEnd}
            expandableRows={expandableRows}
            selectable={selectable}
          />

          <TableBody
            expandableRows={expandableRows}
            selectable={selectable}
            renderRowExpanded={renderRowExpanded}
            rows={tableRows}
            virtualized={virtualized}
            virtualizedRowObservers={virtualizedRowObservers}
            toggleSelectOnRowClick={toggleSelectOnRowClick}
          />

          {renderFooter && (
            <TableFooter table={table} expandableRows={expandableRows} selectable={selectable} />
          )}
        </table>
      </div>
    </div>
  )
}

export type { TableNS } from './types'
