import React, { FC } from 'react'

import { flexRender, Table } from '@tanstack/react-table'
import { TableNS } from '../types'

export namespace TableHeaderNS {
  export interface Props
    extends Required<Pick<TableNS.Props, 'resizeColumnOnReleaseMouseButton' | 'resizableColumns'>> {
    table: Table<unknown>
  }
}

export const TableHeader: FC<TableHeaderNS.Props> = ({
  resizeColumnOnReleaseMouseButton: resizeOnEnd,
  resizableColumns,
  table,
}) => {
  return (
    <thead>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}

              {resizableColumns && (
                <div
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${header.column.getIsResizing() ? 'is-resizing' : ''}`}
                  style={{
                    transform:
                      resizeOnEnd && header.column.getIsResizing()
                        ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
                        : '',
                  }}
                />
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}
