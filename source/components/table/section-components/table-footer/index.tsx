import React, { CSSProperties, FC } from 'react'

import { flexRender, Table } from '@tanstack/react-table'

import { TableNS } from '../../types'
import { Spin } from '../../..'

export namespace TableFooterNS {
  export interface Props extends Pick<TableNS.Props, 'selectable' | 'renderRowExpanded'> {
    table: Table<unknown>
    isLoadingMoreData: boolean
    isLoading: boolean
    hasData: boolean
    i18n: Required<TableNS.I18n>
  }
}

export const TableFooter: FC<TableFooterNS.Props> = ({
  table,
  renderRowExpanded,
  selectable,
  isLoading,
  i18n,
  isLoadingMoreData,
  hasData,
}) => {
  const getStickyTableHeaderStyles = (tableHeaderIndex: number): CSSProperties => {
    if (isLoading || !hasData) {
      return {}
    }

    if (renderRowExpanded) {
      if (tableHeaderIndex === 0) {
        return {
          position: 'sticky',
          left: 0,
          zIndex: 1,
        }
      }
    }

    if (selectable) {
      if (tableHeaderIndex === (renderRowExpanded ? 1 : 0)) {
        return {
          position: 'sticky',
          left: renderRowExpanded ? '31px' : 0,
          zIndex: 1,
        }
      }
    }

    return {}
  }

  return (
    <tfoot>
      {isLoadingMoreData && (
        <tr className="loading-more-data-row">
          <th colSpan={table.getVisibleLeafColumns().length}>
            <div className="spinner-container">
              <Spin size="large" tip={i18n.loadingMoreData} tipProps={{ bold: true }} />
            </div>
          </th>
        </tr>
      )}

      {table.getFooterGroups().map(({ id, headers }) => (
        <tr key={id}>
          {headers.map((header, tableHeaderIndex) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              style={{ ...getStickyTableHeaderStyles(tableHeaderIndex) }}
              className={header.column.getIsSorted() ? 'sorted' : ''}
            >
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.footer, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </tfoot>
  )
}
