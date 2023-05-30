import React, { type FC } from 'react'

import { type Column, type Table } from '@tanstack/react-table'
import { ListView, type ListViewNS } from '../../../list-view'
import { type TableNS } from '../../types'

export namespace ColumnsTogglesNS {
  export interface Props {
    table: Table<unknown>
  }
}

export const ColumnsToggles: FC<ColumnsTogglesNS.Props> = ({ table }) => {
  const getColumnTogglerLabel = (column: Column<unknown, unknown>) => {
    const columnMeta = column.columnDef.meta as TableNS.ColumnMeta
    return columnMeta.togglerLabel ?? column.id
  }

  const getListViewDataset = (): ListViewNS.ListData<Column<unknown, unknown>>[] => {
    const columns: ListViewNS.ListData<Column<unknown, unknown>>[] = []

    table.getAllLeafColumns().forEach(column => {
      if (column.getCanHide()) {
        columns.push({
          switcher: {
            label: getColumnTogglerLabel(column),
            checked: column.getIsVisible(),
            onChange: column.getToggleVisibilityHandler(),
          },
        })
      }
    })

    return columns
  }

  return (
    <div className="zoomrc-table-columns-toggles">
      <ListView dataset={getListViewDataset()} maxHeight="70vh" hover={false} />
    </div>
  )
}
