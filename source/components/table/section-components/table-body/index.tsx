import React, { type CSSProperties, type FC, type RefObject } from 'react'

import { type Row, type Table } from '@tanstack/react-table'

import { Button, SVGIcon, Text, Tooltip } from '../../..'

import { CellSkeleton } from '../../cell-components'
import { type TableNS } from '../../types'
import { type useTableInfiniteScroll } from '../../use-infinite-scroll'
import { type UseTableRowsNS } from '../../use-table-rows'

import { TableBodyRow } from './row'

export namespace TableBodyNS {
  export interface Props
    extends Pick<
        TableNS.Props,
        | 'selectable'
        | 'renderRowExpanded'
        | 'toggleSelectOnRowClick'
        | 'infiniteScroll'
        | 'endMessage'
      >,
      Partial<Pick<ReturnType<typeof useTableInfiniteScroll>, 'lastRowRef'>> {
    rows: Row<unknown>[]
    virtualizedRowObservers: UseTableRowsNS.VirtualizedRowObservers
    isLoading: boolean
    table: Table<unknown>
    isMoreDataRemaining: boolean
    i18n: Required<TableNS.I18n>
    hasData: boolean
    onBackToTop: () => void
    tableContainerRef: RefObject<HTMLDivElement>
    virtualizedSettings?: TableNS.VirtualizedSettings
  }
}

export const TableBody: FC<TableBodyNS.Props> = ({
  virtualizedRowObservers: { firstRow, lastRow },
  selectable,
  renderRowExpanded,
  rows,
  toggleSelectOnRowClick,
  isLoading,
  table,
  lastRowRef,
  infiniteScroll,
  isMoreDataRemaining,
  endMessage,
  i18n,
  onBackToTop,
  hasData,
  tableContainerRef,
  virtualizedSettings,
}) => {
  const getStickyTableDataStyles = (tableDataIndex: number): CSSProperties => {
    if (isLoading || !hasData) {
      return {}
    }

    if (renderRowExpanded) {
      if (tableDataIndex === 0) {
        return {
          position: 'sticky',
          left: 0,
        }
      }
    }

    if (selectable) {
      if (tableDataIndex === (renderRowExpanded ? 1 : 0)) {
        return {
          position: 'sticky',
          left: renderRowExpanded ? '31px' : 0,
        }
      }
    }

    return {}
  }

  const isScrollNearBottom = (): boolean => {
    if (!virtualizedSettings) {
      return true
    }

    const { current: tableContainer } = tableContainerRef
    if (!tableContainer) {
      return true
    }

    const { scrollHeight, scrollTop, clientHeight } = tableContainer
    const isScrollNearBottom = scrollHeight - scrollTop - clientHeight < 120

    return isScrollNearBottom
  }

  return (
    <tbody>
      {!hasData && !isLoading && (
        <tr className="no-data-row">
          <td colSpan={table.getVisibleLeafColumns().length}>
            <div className="no-data-row-content">
              <SVGIcon name="empty-box" />
              <Text large bold>
                {i18n.noData}
              </Text>
            </div>
          </td>
        </tr>
      )}

      {firstRow}

      {isLoading
        ? Array.from(Array(10)).map((_, index) => (
            <tr key={index}>
              {Array.from(Array(table.getVisibleLeafColumns().length)).map((_, index) => (
                <td key={index}>
                  <CellSkeleton />
                </td>
              ))}
            </tr>
          ))
        : rows.map((row, rowIndex) => (
            <TableBodyRow
              row={row}
              key={row.id}
              totalRows={rows.length}
              rowIndex={rowIndex}
              renderRowExpanded={renderRowExpanded}
              infiniteScroll={infiniteScroll}
              lastRowRef={lastRowRef}
              getStickyTableDataStyles={getStickyTableDataStyles}
              toggleSelectOnRowClick={toggleSelectOnRowClick}
              selectable={selectable}
            />
          ))}

      {!isMoreDataRemaining && !!endMessage && isScrollNearBottom() && (
        <tr className="end-message-row">
          <td colSpan={table.getVisibleLeafColumns().length}>
            <div className="end-message-container">
              {endMessage === 'default-end-message' ? (
                <Text large bold>
                  {i18n.endMessage}
                </Text>
              ) : (
                endMessage
              )}

              <Tooltip title={i18n.backToTio}>
                <Button
                  onClick={onBackToTop}
                  prefixMaterialIcon="arrow_upward"
                  shape="circle"
                  type="bordered"
                  size="large"
                />
              </Tooltip>
            </div>
          </td>
        </tr>
      )}

      {lastRow}
    </tbody>
  )
}
