import React, { type FC } from 'react'

import { type Table } from '@tanstack/react-table'

import { CellCheckbox } from '.'
import { type UseTableI18nNS } from '../use-i18n'

export namespace HeaderCellCheckboxNS {
  export interface Props {
    table: Table<object>
    i18n: Required<UseTableI18nNS.I18n>
  }
}

export const HeaderCellCheckbox: FC<HeaderCellCheckboxNS.Props> = ({ table, i18n }) => {
  return (
    <CellCheckbox
      checked={table.getIsAllRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
      indeterminate={table.getIsSomeRowsSelected()}
      dragToSelect={false}
    />
  )
}
