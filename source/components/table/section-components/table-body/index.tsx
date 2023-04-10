import React, { CSSProperties, FC, Fragment, HTMLAttributes, MouseEvent } from 'react'

import { flexRender, Row } from '@tanstack/react-table'

import { TableNS } from '../../types'
import { UseTableRowsNS } from '../../use-table-rows'
import { classNames } from '@zoom-studio/zoom-js-ts-utils'

export namespace TableBodyNS {
  export interface Props
    extends Pick<
      TableNS.Props,
      | 'selectable'
      | 'expandableRows'
      | 'renderRowExpanded'
      | 'virtualized'
      | 'toggleSelectOnRowClick'
    > {
    rows: Row<unknown>[]
    virtualizedRowObservers: UseTableRowsNS.VirtualizedRowObservers
  }
}

export const TableBody: FC<TableBodyNS.Props> = ({
  virtualizedRowObservers: { firstRow, lastRow },
  expandableRows,
  selectable,
  renderRowExpanded,
  rows,
  toggleSelectOnRowClick,
}) => {
  const getStickyTableDataStyles = (tableDataIndex: number): CSSProperties => {
    if (expandableRows) {
      if (tableDataIndex === 0) {
        return {
          position: 'sticky',
          left: 0,
        }
      }
    }

    if (selectable) {
      if (tableDataIndex === (expandableRows ? 1 : 0)) {
        return {
          position: 'sticky',
          left: expandableRows ? '31px' : 0,
        }
      }
    }

    return {}
  }

  const getRowProps = (row: Row<unknown>): HTMLAttributes<HTMLTableRowElement> => {
    const className = classNames('zoomrc-table-row', {
      selected: row.getIsSelected(),
    })

    const onClick = (evt: MouseEvent<HTMLTableRowElement>) => {
      if (toggleSelectOnRowClick) {
        row.getToggleSelectedHandler()(evt)
      }
    }

    return { className, onClick }
  }

  return (
    <tbody>
      {firstRow}

      {rows.map(row => (
        <Fragment key={row.id}>
          <tr {...getRowProps(row)}>
            {row.getVisibleCells().map((cell, tableDataIndex) => (
              <td
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                  ...getStickyTableDataStyles(tableDataIndex),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>

          {row.getIsExpanded() && (
            <tr>
              <td style={{ padding: 0 }} colSpan={row.getVisibleCells().length}>
                <div className="expanded-row-section">{renderRowExpanded?.(row.original)}</div>
              </td>
            </tr>
          )}
        </Fragment>
      ))}

      {lastRow}
    </tbody>
  )
}
