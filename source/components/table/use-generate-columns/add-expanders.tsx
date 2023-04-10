import React from 'react'

import { ColumnDef, ColumnHelper } from '@tanstack/react-table'

import { ExpandButton } from '../cell-components'

export namespace AddExpandersNS {
  export interface Params {
    columnHelper: ColumnHelper<object>
    result: ColumnDef<unknown, any>[]
  }
}

export const addExpanders = ({ columnHelper, result }: AddExpandersNS.Params) => {
  result.unshift(
    columnHelper.display({
      id: 'zoomrc-table-expander-column',
      size: 20,
      enableResizing: false,
      cell: ({ row }) => (
        <ExpandButton
          onClick={row.getToggleExpandedHandler()}
          disabled={!row.getCanExpand()}
          isExpanded={row.getIsExpanded()}
        />
      ),
    }) as ColumnDef<unknown, any>,
  )
}
