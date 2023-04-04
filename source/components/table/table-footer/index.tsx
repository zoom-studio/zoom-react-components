import React, { FC } from 'react'

import { flexRender, Table } from '@tanstack/react-table'

export namespace TableFooterNS {
  export interface Props {
    table: Table<unknown>
  }
}

export const TableFooter: FC<TableFooterNS.Props> = ({ table }) => {
  return (
    <tfoot>
      {table.getFooterGroups().map(({ id, headers }) => (
        <tr key={id}>
          {headers.map(header => (
            <th key={header.id} colSpan={header.colSpan}>
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
