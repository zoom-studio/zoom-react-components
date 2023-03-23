import React, { FC } from 'react'

import { Button, Input, Select } from '..'
import { UseObjectedStateNS } from '../../hooks'

import { ExplorerNS } from '.'
import { getFileTypesFilterOptions } from './utils'

export namespace ExplorerHeaderNS {
  export interface Props
    extends Pick<
      ExplorerNS.Props,
      'isSearchInputDisabled' | 'isTypeSelectDisabled' | 'disabled' | 'defaultTypeQuery'
    > {
    viewMode: UseObjectedStateNS.ReturnType<ExplorerNS.ViewMode>
    i18n: Required<ExplorerNS.I18n>
    typeQuery: UseObjectedStateNS.ReturnType<ExplorerNS.MaybeAllFileTypesWithAll>
    searchQuery: UseObjectedStateNS.ReturnType<string>
    openUploaderDialog: () => void
  }
}

export const ExplorerHeader: FC<ExplorerHeaderNS.Props> = ({
  viewMode,
  i18n,
  typeQuery,
  searchQuery,
  isSearchInputDisabled,
  isTypeSelectDisabled,
  disabled,
  openUploaderDialog,
  defaultTypeQuery,
}) => {
  const handleToggleViewMode = () => {
    viewMode.set(currentViewMode => {
      const newViewMode = currentViewMode === 'grid' ? 'row' : 'grid'
      localStorage.setItem(ExplorerNS.VIEW_MODE_STORE_KEY, newViewMode)
      return newViewMode
    })
  }

  return (
    <div className="header">
      <div className="filters">
        <Select
          options={getFileTypesFilterOptions(i18n, defaultTypeQuery)}
          showSearch={false}
          size="small"
          className="file-type-select"
          defaultValue={typeQuery.val}
          onWrite={values => typeQuery.set(values[0])}
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
          suffixMaterialIcon={viewMode.val === 'grid' ? 'view_list' : 'grid_view'}
          onClick={handleToggleViewMode}
          type="link"
          shape="square"
          size="large"
          disabled={disabled}
          className="toggle-view-mode"
        />

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
