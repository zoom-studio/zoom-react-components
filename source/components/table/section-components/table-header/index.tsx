import React, { CSSProperties, FC, MouseEvent } from 'react'

import { flexRender, Header, Table } from '@tanstack/react-table'
import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { TableNS } from '../../types'
import { SVGIcon, SVGIconNS } from '../../../'

export namespace TableHeaderNS {
  export interface Props
    extends Required<Pick<TableNS.Props, 'resizeColumnOnReleaseMouseButton' | 'resizableColumns'>>,
      Pick<TableNS.Props, 'selectable' | 'expandableRows'> {
    table: Table<unknown>
  }
}

export const TableHeader: FC<TableHeaderNS.Props> = ({
  resizeColumnOnReleaseMouseButton: resizeOnEnd,
  resizableColumns,
  table,
  expandableRows,
  selectable,
}) => {
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

  const getHeaderClasses = (header: Header<unknown, unknown>): string => {
    return classNames('', {
      clickable: header.column.getCanSort() && !header.isPlaceholder,
    })
  }

  const renderHeaderSortIcon = (header: Header<unknown, unknown>): JSX.Element => {
    const iconsProps: Omit<SVGIconNS.Props, 'name'> = { size: 10 }

    switch (header.column.getIsSorted()) {
      case false: {
        return (
          <SVGIcon
            name="not-sorted"
            className="initial-sort"
            color={color => color({ source: 'text', tone: 3 })}
            {...iconsProps}
          />
        )
      }
      case 'asc': {
        return (
          <SVGIcon
            name="sort-ascending"
            color={color => color({ source: 'accent' })}
            {...iconsProps}
          />
        )
      }
      case 'desc': {
        return (
          <SVGIcon
            name="sort-descending"
            color={color => color({ source: 'accent' })}
            {...iconsProps}
          />
        )
      }
    }
  }

  const handleOnTableHeaderClick =
    (header: Header<unknown, unknown>) => (evt: MouseEvent<HTMLTableCellElement>) => {
      if (header.isPlaceholder) {
        return null
      }

      header.column.getToggleSortingHandler()?.(evt)
    }

  return (
    <thead>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, tableHeaderIndex) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              style={{ width: header.getSize(), ...getStickyTableHeaderStyles(tableHeaderIndex) }}
              className={getHeaderClasses(header)}
              onClick={handleOnTableHeaderClick(header)}
            >
              <div className="table-header-content">
                {!header.isPlaceholder && (
                  <>
                    <span className="header-title">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </span>

                    {header.column.getCanSort() && (
                      <span className="sort-icon">{renderHeaderSortIcon(header)}</span>
                    )}
                  </>
                )}
              </div>

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
