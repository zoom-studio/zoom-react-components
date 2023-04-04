import React, { FC } from 'react'

import { flexRender, Table } from '@tanstack/react-table'

export namespace TableBodyNS {
  export interface Props {
    table: Table<unknown>
  }
}

export const TableBody: FC<TableBodyNS.Props> = ({ table }) => {
  return (
    <tbody>
      {table.getRowModel().rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id} style={{ width: cell.column.getSize() }}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
