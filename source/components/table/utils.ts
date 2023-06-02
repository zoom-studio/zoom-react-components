import { type ColumnDef, type VisibilityState } from '@tanstack/react-table'

import { type TableNS } from './types'

export const getAllHiddenColumns = (
  invisibleColumnIds: VisibilityState,
  columns: ColumnDef<unknown, any>[],
) => {
  for (const tableColumn of columns) {
    const column = tableColumn as TableNS.NestedColumnDef
    const columnMeta = column.meta as TableNS.ColumnMeta | null

    if (columnMeta?.hidden && column.enableHiding) {
      Object.assign(invisibleColumnIds, {
        [column.id!]: false,
      })
    }

    if (column.columns) {
      getAllHiddenColumns(invisibleColumnIds, column.columns)
    }
  }
}
