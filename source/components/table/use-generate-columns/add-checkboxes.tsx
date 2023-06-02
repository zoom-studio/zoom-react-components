import React, { type MutableRefObject } from 'react'

import { type ColumnDef, type ColumnHelper } from '@tanstack/react-table'

import { CellCheckbox, HeaderCellCheckbox } from '../cell-components'
import { type UseTableI18nNS } from '../use-i18n'
import { type TableNS } from '../types'

export namespace AddCheckBoxesNS {
  export interface Params extends Pick<TableNS.Props, 'dragToSelect'> {
    columnHelper: ColumnHelper<object>
    result: ColumnDef<unknown, any>[]
    i18n: Required<UseTableI18nNS.I18n>
    isStartedToSelectViaDragRef: MutableRefObject<boolean>
    isClickedCheckboxCheckedRef: MutableRefObject<boolean>
    isLoading: boolean
  }
}

export const addCheckBoxes = ({
  columnHelper,
  result,
  i18n,
  isStartedToSelectViaDragRef,
  isClickedCheckboxCheckedRef,
  dragToSelect,
  isLoading,
}: AddCheckBoxesNS.Params) => {
  result.unshift(
    columnHelper.display({
      id: 'zoomrc-table-selectable-column',
      size: 20,
      maxSize: 40,
      enableResizing: false,
      enableHiding: false,
      header: ({ table }) => (isLoading ? <></> : <HeaderCellCheckbox table={table} i18n={i18n} />),
      cell: ({ row }) => (
        <CellCheckbox
          row={row}
          dragToSelect={!!dragToSelect}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
          isStartedToSelectViaDragRef={isStartedToSelectViaDragRef}
          isClickedCheckboxCheckedRef={isClickedCheckboxCheckedRef}
        />
      ),
    }) as ColumnDef<unknown, any>,
  )
}
