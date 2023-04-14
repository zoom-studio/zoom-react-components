import React, { MouseEvent } from 'react'

import { ColumnDef, ColumnHelper, Row } from '@tanstack/react-table'

import { ExpandButton } from '../cell-components'

export namespace AddExpandersNS {
  export interface Params {
    columnHelper: ColumnHelper<object>
    result: ColumnDef<unknown, any>[]
  }
}

export const addExpanders = ({ columnHelper, result }: AddExpandersNS.Params) => {
  const handleOnExpandButtonClick = (row: Row<object>) => (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    evt.stopPropagation()
    row.getToggleExpandedHandler()()
  }

  result.unshift(
    columnHelper.display({
      id: 'zoomrc-table-expander-column',
      size: 20,
      enableResizing: false,
      enableHiding: false,
      cell: ({ row }) => (
        <ExpandButton
          onClick={handleOnExpandButtonClick(row)}
          disabled={!row.getCanExpand()}
          isExpanded={row.getIsExpanded()}
        />
      ),
    }) as ColumnDef<unknown, any>,
  )
}
