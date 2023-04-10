import React, { FC } from 'react'

import { Table } from '@tanstack/react-table'

import { Menu, MenuNS, TableNS } from '../..'

import { CellCheckbox } from '.'
import { UseTableI18nNS } from '../use-i18n'

export namespace HeaderCellCheckboxNS {
  export interface Props extends Pick<TableNS.Props, 'enableSelectCheckboxOptions'> {
    table: Table<object>
    i18n: Required<UseTableI18nNS.I18n>
  }
}

export const HeaderCellCheckbox: FC<HeaderCellCheckboxNS.Props> = ({
  table,
  i18n,
  enableSelectCheckboxOptions,
}) => {
  const options: MenuNS.Item[] = [
    {
      title: i18n.selectAll,
      onClick: table.getToggleAllRowsSelectedHandler(),
      isActive: table.getIsAllRowsSelected(),
    },
    {
      title: i18n.selectCurrentPage,
      onClick: table.getToggleAllPageRowsSelectedHandler(),
    },
  ]

  return (
    <CellCheckbox
      checked={table.getIsAllRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
      indeterminate={table.getIsSomeRowsSelected()}
    >
      {enableSelectCheckboxOptions && (
        <div className="checkbox-option">
          <Menu
            items={options}
            prefixMaterialIcon="expand_more"
            shape="square"
            type="link"
            className="options-button"
          />
        </div>
      )}
    </CellCheckbox>
  )
}
