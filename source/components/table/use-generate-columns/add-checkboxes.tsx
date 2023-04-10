import React from 'react'

import { ColumnDef, ColumnHelper } from '@tanstack/react-table'

import { CellCheckbox, HeaderCellCheckbox } from '../cell-components'
import { UseTableI18nNS } from '../use-i18n'
import { TableNS } from '../types'

export namespace AddCheckBoxesNS {
  export interface Params extends Pick<TableNS.Props, 'enableSelectCheckboxOptions'> {
    columnHelper: ColumnHelper<object>
    result: ColumnDef<unknown, any>[]
    i18n: Required<UseTableI18nNS.I18n>
  }
}

export const addCheckBoxes = ({
  columnHelper,
  result,
  i18n,
  enableSelectCheckboxOptions,
}: AddCheckBoxesNS.Params) => {
  result.unshift(
    columnHelper.display({
      id: 'zoomrc-table-selectable-column',
      size: enableSelectCheckboxOptions ? 40 : 20,
      maxSize: 40,
      enableResizing: false,
      header: ({ table }) => (
        <HeaderCellCheckbox
          table={table}
          i18n={i18n}
          enableSelectCheckboxOptions={enableSelectCheckboxOptions}
        />
      ),
      cell: ({ row }) => (
        <CellCheckbox
          enableDragToSelect
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    }) as ColumnDef<unknown, any>,
  )
}
