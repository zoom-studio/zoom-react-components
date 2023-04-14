import React, { FC } from 'react'

import { Table } from '@tanstack/react-table'

import { TableNS } from '../../types'
import { Button, ButtonNS, Input, Popover, Title, Tooltip } from '../../..'

import { ColumnsToggles } from './columns-toggles'
import { useDebounce } from '../../../../hooks'

export namespace TableActionsBarNS {
  export interface Props
    extends Pick<
      TableNS.Props,
      | 'showColumnsButton'
      | 'showSearch'
      | 'title'
      | 'debounceSearchInput'
      | 'searchInputDebounceDelay'
      | 'onSearch'
    > {
    i18n: Required<TableNS.I18n>
    table: Table<unknown>
  }
}

export const TableActionsBar: FC<TableActionsBarNS.Props> = ({
  showColumnsButton,
  showSearch,
  title,
  i18n,
  table,
  debounceSearchInput,
  onSearch,
  searchInputDebounceDelay,
}) => {
  const debouncedInput = debounceSearchInput
    ? useDebounce(onSearch || (() => {}), { delay: searchInputDebounceDelay })
    : null

  const baseActionButtonProps: ButtonNS.Props = {
    shape: 'square',
    size: 'large',
    className: 'action-button',
    type: 'bordered',
  }

  const handleOnSearch = (query: string) => {
    if (debouncedInput && debounceSearchInput) {
      debouncedInput(query)
    } else {
      onSearch?.(query)
    }
  }

  return (
    <div className="table-actions-bar">
      <div className="title-container">{title && <Title>{title}</Title>}</div>

      <div className="actions-container">
        {showSearch && (
          <Input
            type="search"
            placeholder={i18n.searchPlaceholder}
            autoFocus
            onWrite={handleOnSearch}
          />
        )}

        {showColumnsButton && (
          <Tooltip title={i18n.columnsTooltip}>
            <Popover
              content={<ColumnsToggles table={table} />}
              trigger="click"
              className="column-toggles-popover"
            >
              <Button {...baseActionButtonProps} prefixMaterialIcon="view_week" />
            </Popover>
          </Tooltip>
        )}
      </div>
    </div>
  )
}
