import React from 'react'

import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

import { useZoomComponent } from '../../hooks'

import { TableNS } from './types'
import { useGenerateColumns } from './use-generate-columns'

export const Table = <Dataset extends unknown[]>({
  className,
  containerProps,
  reference,
  dataset,
  children,
}: TableNS.Props<Dataset>) => {
  const { createClassName } = useZoomComponent('table')
  const columns = useGenerateColumns({ children })
  const table = useReactTable({
    columns,
    data: dataset,
    getCoreRowModel: getCoreRowModel(),
  })

  const classes = createClassName(className)

  return (
    <div {...containerProps} ref={reference} className={classes}>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}

export type { TableNS } from './types'
