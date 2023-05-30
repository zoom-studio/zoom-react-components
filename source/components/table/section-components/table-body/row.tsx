import React, { type CSSProperties, type FC } from 'react'

import { type Row, flexRender } from '@tanstack/react-table'
import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { Collapse, type TableNS } from '../../..'

import { UseTableInfiniteScrollNS, type useTableInfiniteScroll } from '../../use-infinite-scroll'

export namespace TableBodyRowNS {
  export interface Props
    extends Pick<
        TableNS.Props,
        'renderRowExpanded' | 'infiniteScroll' | 'toggleSelectOnRowClick' | 'selectable'
      >,
      Partial<Pick<ReturnType<typeof useTableInfiniteScroll>, 'lastRowRef'>> {
    row: Row<unknown>
    totalRows: number
    rowIndex: number
    getStickyTableDataStyles: (tableDataIndex: number) => CSSProperties
  }
}

export const TableBodyRow: FC<TableBodyRowNS.Props> = ({
  row,
  rowIndex,
  renderRowExpanded,
  totalRows,
  infiniteScroll,
  lastRowRef,
  getStickyTableDataStyles,
  toggleSelectOnRowClick,
  selectable,
}) => {
  const className = classNames('zoomrc-table-row', {
    selected: row.getIsSelected(),
  })

  const selectRow = () => {
    if (toggleSelectOnRowClick && selectable) {
      row.getToggleSelectedHandler()({})
    }
  }

  const expandableRowClasses = classNames('expanded-row-section', {
    expanded: row.getIsExpanded(),
  })

  return (
    <>
      <tr
        className={className}
        onClick={selectRow}
        ref={node =>
          totalRows ===
          rowIndex + (infiniteScroll?.threshold ?? UseTableInfiniteScrollNS.DEFAULT_THRESHOLD)
            ? lastRowRef?.(node)
            : undefined
        }
      >
        {row.getVisibleCells().map((cell, tableDataIndex) => (
          <td
            key={cell.id}
            className={cell.column.getIsSorted() ? 'sorted' : ''}
            style={{
              width: cell.column.getSize(),
              ...getStickyTableDataStyles(tableDataIndex),
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>

      {renderRowExpanded && (
        <tr>
          <td style={{ padding: 0, border: 0 }} colSpan={row.getVisibleCells().length}>
            <Collapse
              expanded={row.getIsExpanded()}
              transition={{ property: 'all' }}
              childHeight={detectedHeight => detectedHeight + 20}
            >
              <div className={expandableRowClasses}>{renderRowExpanded(row.original)}</div>
            </Collapse>
          </td>
        </tr>
      )}
    </>
  )
}
