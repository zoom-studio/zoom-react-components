import React, { CSSProperties, FC } from 'react'

import { flexRender, Table } from '@tanstack/react-table'

import { TableNS } from '../../types'

export namespace TableFooterNS {
  export interface Props extends Pick<TableNS.Props, 'selectable' | 'expandableRows'> {
    table: Table<unknown>
  }
}

export const TableFooter: FC<TableFooterNS.Props> = ({ table, expandableRows, selectable }) => {
  const getStickyTableHeaderStyles = (tableHeaderIndex: number): CSSProperties => {
    if (expandableRows) {
      if (tableHeaderIndex === 0) {
        return {
          position: 'sticky',
          left: 0,
          zIndex: 1,
        }
      }
    }

    if (selectable) {
      if (tableHeaderIndex === (expandableRows ? 1 : 0)) {
        return {
          position: 'sticky',
          left: expandableRows ? '31px' : 0,
          zIndex: 1,
        }
      }
    }

    return {}
  }

  return (
    <tfoot>
      {table.getFooterGroups().map(({ id, headers }) => (
        <tr key={id}>
          {headers.map((header, tableHeaderIndex) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              style={{ ...getStickyTableHeaderStyles(tableHeaderIndex) }}
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
