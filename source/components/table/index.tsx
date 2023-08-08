import React, { type CSSProperties, type UIEvent, useState } from 'react'

import {
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useFutureEffect } from '@zoom-studio/js-ts-utils'

import { useZoomComponent } from '../../hooks'

import { logs } from '../../constants'
import { TableActionsBar, TableBody, TableFooter, TableHeader } from './section-components'
import { type TableNS } from './types'
import { useGenerateColumns } from './use-generate-columns'
import { useTableI18n } from './use-i18n'
import { useTableInfiniteScroll } from './use-infinite-scroll'
import { useTableRows } from './use-table-rows'
import { getAllHiddenColumns } from './utils'

export const Table = <Dataset extends unknown[]>({
  i18n: componentI18n,
  resizeColumnOnReleaseMouseButton: resizeOnEnd,
  infiniteScroll: infiniteScrollSettings,
  maxHeight = '700px',
  stickyHeader = true,
  stickyFooter = true,
  resizableColumns = true,
  stickyActions = true,
  actions = [],
  toggleSelectOnRowClick = true,
  dragToSelect = true,
  renderHeader = true,
  endMessage = 'default-end-message',
  showColumnsButton = true,
  showSearch = true,
  renderActionsBar = true,
  debounceSearchInput = true,
  searchInputDebounceDelay = 700,
  fullHeight,
  title,
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
  actionsColumnWidth,
  id,
  renderRowExpanded,
  isRowExpandable,
  virtualized,
  onSortChange,
  sortable,
  useDefaultSortAlgorithm,
  loading,
  onSearch,
  ...rest
}: TableNS.Props<Dataset>) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const isLoading = !!loading && dataset.length < 1
  const isLoadingMoreData = !!loading && dataset.length > 0
  const isHeaderSticky = !isLoading && stickyHeader
  const isFooterSticky = !isLoading && stickyFooter
  const isHoverable = !!hoverable && !isLoading
  const isActionsBarEnabled = renderActionsBar && (showColumnsButton || showSearch || title)
  const hasData = !isLoading && dataset.length > 0

  const { createClassName, globalI18ns, sendLog } = useZoomComponent('table')
  const i18n = useTableI18n(globalI18ns, componentI18n)
  const columns = useGenerateColumns({
    children,
    selectable,
    i18n,
    actions,
    actionsColumnWidth,
    dragToSelect,
    isLoading,
    renderRowExpanded,
  })

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    const IDs: VisibilityState = {}
    getAllHiddenColumns(IDs, columns)
    return IDs
  })

  const table = useReactTable({
    columns,
    state: { rowSelection, sorting, columnVisibility },
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
    getSortedRowModel: useDefaultSortAlgorithm ? getSortedRowModel() : undefined,
    onColumnVisibilityChange: setColumnVisibility,
  })

  const { tableContainerRef, tableRows, virtualizedRowObservers } = useTableRows(table, virtualized)

  const infiniteScroll = infiniteScrollSettings
    ? useTableInfiniteScroll({
        isLoading: !!loading,
        virtualizedSettings: virtualized,
        scrollableContainerRef: tableContainerRef,
        infiniteScrollSettings,
        dataset,
        sendLog,
      })
    : null

  const classes = createClassName(className, '', {
    [createClassName('', 'sticky-header')]: isHeaderSticky,
    [createClassName('', 'sticky-footer')]: isFooterSticky,
    [createClassName('', 'sticky-actions')]: stickyActions && actions.length > 0,
    [createClassName('', 'hoverable')]: isHoverable,
    [createClassName('', 'striped')]: !!striped,
    [createClassName('', 'selectable')]: !!selectable,
    [createClassName('', 'expandable-rows')]: !!renderRowExpanded,
    [createClassName('', 'loading')]: isLoading,
    [createClassName('', 'loading-more-data')]: isLoadingMoreData,
    [createClassName('', 'full-height')]: !!fullHeight,
  })

  const tableStyles: CSSProperties = {
    width: table.getCenterTotalSize(),
  }

  const handleOnScroll = (evt: UIEvent<HTMLDivElement> | Event) => {
    if (virtualized) {
      table.toggleAllRowsExpanded(false)
    }
  }

  const handleScrollToTop = () => {
    const { current: tableContainer } = tableContainerRef
    if (!tableContainer) {
      sendLog(logs.tableContainerRefNotFound, 'handleScrollToTop fn')
      return
    }

    tableContainer.scrollTop = 0
  }

  useFutureEffect(() => {
    onSelectionChange?.(Object.keys(rowSelection).map(rowIndex => parseInt(rowIndex)))
  }, [rowSelection])

  useFutureEffect(() => {
    onSortChange?.(sorting[0])
  }, [sorting])

  return (
    <div {...containerProps} {...rest} ref={reference} id={id} className={classes}>
      {isLoading && <div className="loading-placeholder" />}

      {isActionsBarEnabled && (
        <TableActionsBar
          showColumnsButton={showColumnsButton}
          showSearch={showSearch}
          title={title}
          i18n={i18n}
          debounceSearchInput={debounceSearchInput}
          searchInputDebounceDelay={searchInputDebounceDelay}
          table={table}
          onSearch={onSearch}
        />
      )}

      <div
        className="table-scroll-view"
        ref={tableContainerRef}
        style={{ maxHeight, maxWidth, minHeight, minWidth }}
        onScroll={handleOnScroll}
      >
        <table cellSpacing={0} style={tableStyles}>
          {renderHeader && (
            <TableHeader
              table={table}
              resizableColumns={resizableColumns}
              resizeColumnOnReleaseMouseButton={!!resizeOnEnd}
              renderRowExpanded={renderRowExpanded}
              selectable={selectable}
              isLoading={isLoading}
              hasData={hasData}
            />
          )}

          <TableBody
            selectable={selectable}
            renderRowExpanded={renderRowExpanded}
            rows={tableRows}
            hasData={hasData}
            virtualizedRowObservers={virtualizedRowObservers}
            toggleSelectOnRowClick={toggleSelectOnRowClick}
            isLoading={isLoading}
            table={table}
            lastRowRef={infiniteScroll?.lastRowRef}
            infiniteScroll={infiniteScrollSettings}
            isMoreDataRemaining={!!infiniteScroll?.isMoreDataRemaining}
            endMessage={endMessage}
            i18n={i18n}
            onBackToTop={handleScrollToTop}
            tableContainerRef={tableContainerRef}
            virtualizedSettings={virtualized}
          />

          {renderFooter && (
            <TableFooter
              i18n={i18n}
              table={table}
              isLoading={isLoading}
              isLoadingMoreData={isLoadingMoreData}
              hasData={hasData}
              renderRowExpanded={renderRowExpanded}
              selectable={selectable}
            />
          )}
        </table>
      </div>
    </div>
  )
}

export type { TableNS } from './types'
