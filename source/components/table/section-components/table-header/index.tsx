import React, { CSSProperties, FC, MouseEvent } from 'react'

import { flexRender, Header, Table } from '@tanstack/react-table'
import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { TableNS } from '../../types'
import { SVGIcon, SVGIconNS } from '../../../'

export namespace TableHeaderNS {
  export interface Props
    extends Required<Pick<TableNS.Props, 'resizeColumnOnReleaseMouseButton' | 'resizableColumns'>>,
      Pick<TableNS.Props, 'selectable' | 'renderRowExpanded'> {
    table: Table<unknown>
    isLoading: boolean
    hasData: boolean
  }
}

export const TableHeader: FC<TableHeaderNS.Props> = ({
  resizeColumnOnReleaseMouseButton: resizeOnEnd,
  resizableColumns,
  table,
  selectable,
  renderRowExpanded,
  isLoading,
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

  const getHeaderClasses = (header: Header<unknown, unknown>): string => {
    return classNames('', {
      clickable: header.column.getCanSort() && !header.isPlaceholder,
      sorted: !!header.column.getIsSorted(),
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

              {resizableColumns && header.column.getCanResize() && (
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
