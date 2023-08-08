import React, { type FC } from 'react'

import { type UseObjectedStateNS } from '@zoom-studio/js-ts-utils'

import { Button, Input, Select } from '..'

import { type ExplorerNS } from '.'
import { getFileTypesFilterOptions } from './utils'

export namespace ExplorerHeaderNS {
  export interface Props
    extends Pick<
      ExplorerNS.Props,
      'isSearchInputDisabled' | 'isTypeSelectDisabled' | 'disabled' | 'defaultTypeQuery'
    > {
    i18n: Required<ExplorerNS.I18n>
    typeQuery: UseObjectedStateNS.ReturnType<ExplorerNS.MaybeAllFileTypesWithAll>
    searchQuery: UseObjectedStateNS.ReturnType<string>
    openUploaderDialog: () => void
  }
}

export const ExplorerHeader: FC<ExplorerHeaderNS.Props> = ({
  i18n,
  typeQuery,
  searchQuery,
  isSearchInputDisabled,
  isTypeSelectDisabled,
  disabled,
  openUploaderDialog,
  defaultTypeQuery,
}) => {
  return (
    <div className="header">
      <div className="filters">
        <Select
          options={getFileTypesFilterOptions(i18n, defaultTypeQuery)}
          showSearch={false}
          size="small"
          className="file-type-select"
          defaultValue={typeQuery.val}
          onWrite={typeQuery.set}
          disabled={isTypeSelectDisabled || disabled}
        />

        <Input
          placeholder={i18n.searchPlaceholder}
          value={searchQuery.val}
          onWrite={searchQuery.set}
          size="small"
          className="search-input"
          type="search"
          disabled={isSearchInputDisabled || disabled}
        />
      </div>

      <div className="actions">
        <Button
          disabled={disabled}
          suffixMaterialIcon="add"
          size="small"
          className="upload-content"
          onClick={openUploaderDialog}
          type="bordered"
        >
          {i18n.uploadNewFile}
        </Button>
      </div>
    </div>
  )
}
