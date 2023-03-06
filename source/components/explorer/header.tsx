import React, { FC } from 'react'

import { Button, Input, Select } from '..'
import { UseObjectedStateNS } from '../../hooks'

import { ExplorerNS } from '.'
import { getFileTypesFilterOptions } from './utils'

export namespace ExplorerHeaderNS {
  export interface Props {
    viewMode: UseObjectedStateNS.ReturnType<ExplorerNS.ViewMode>
    i18n: Required<ExplorerNS.I18n>
    typeQuery: UseObjectedStateNS.ReturnType<ExplorerNS.MaybeAllFileTypesWithAll>
    searchQuery: UseObjectedStateNS.ReturnType<string>
  }
}

export const ExplorerHeader: FC<ExplorerHeaderNS.Props> = ({
  viewMode,
  i18n,
  typeQuery,
  searchQuery,
}) => {
  const handleToggleViewMode = () => {
    viewMode.set(currentViewMode => (currentViewMode === 'grid' ? 'row' : 'grid'))
  }

  return (
    <div className="header">
      <div className="filters">
        <Select
          options={getFileTypesFilterOptions(i18n)}
          showSearch={false}
          size="small"
          className="file-type-select"
          defaultValue={typeQuery.val}
          onWrite={values => typeQuery.set(values[0])}
        />

        <Input
          placeholder={i18n.searchPlaceholder}
          value={searchQuery.val}
          onWrite={searchQuery.set}
          size="small"
          className="search-input"
        />
      </div>

      <div className="actions">
        <Button
          suffixMaterialIcon={viewMode.val === 'grid' ? 'view_list' : 'grid_view'}
          onClick={handleToggleViewMode}
          type="link"
          shape="square"
          size="large"
          className="toggle-view-mode"
        />

        <Button suffixMaterialIcon="add" size="small" className="upload-content">
          {i18n.uploadNewFile}
        </Button>
      </div>
    </div>
  )
}
