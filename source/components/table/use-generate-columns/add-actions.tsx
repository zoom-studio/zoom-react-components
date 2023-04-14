import React from 'react'

import { ColumnDef, ColumnHelper } from '@tanstack/react-table'

import { TableNS } from '../types'
import { CellActions } from '../cell-components'

export namespace AddActionsNS {
  export interface Params extends Pick<TableNS.Props, 'actionsColumnWidth'> {
    columnHelper: ColumnHelper<object>
    result: ColumnDef<unknown, any>[]
    actions: TableNS.Action<unknown[]>[]
  }
}

export const addActions = ({
  columnHelper,
  result,
  actions,
  actionsColumnWidth,
}: AddActionsNS.Params) => {
  result.push(
    columnHelper.display({
      size: actionsColumnWidth,
      id: 'zoomrc-table-action-column',
      cell: ({ row: { original } }) => <CellActions data={original} actions={actions} />,
      enableHiding: false,
    }) as ColumnDef<unknown, any>,
  )
}
