import React, { FC } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { Alert, AlertNS, ExplorerNS, ScrollView, Selectable } from '..'

import { ExplorerFile } from './file'
import { ExplorerFilesSkeletons } from './files-skeletons'
import { UseExplorerI18nNS } from './use-i18n'

export namespace ExplorerContentNS {
  export interface Props extends Pick<ExplorerNS.Props, 'filterTypes' | 'disabled'> {
    selectable: boolean
    files: ExplorerNS.FileInterface[]
    multiSelect: boolean
    viewMode: ExplorerNS.ViewMode
    typeColors: ExplorerNS.TypeColors
    selectedFiles: number[]
    alert?: AlertNS.Props
    i18n: Required<UseExplorerI18nNS.I18n>
    loading?: boolean
    onSelectionChange: (selectedIndexes: number[]) => void
    openRenameModal: (selectedFile: ExplorerNS.FileInterface) => () => void
  }
}

export const ExplorerContent: FC<ExplorerContentNS.Props> = ({
  selectable,
  files,
  multiSelect,
  viewMode,
  typeColors,
  alert,
  onSelectionChange,
  filterTypes,
  disabled,
  loading,
  selectedFiles,
  i18n,
  openRenameModal,
}) => {
  const selectableClasses = classNames('selectable-container', {
    disabled,
    [`${viewMode}-view-mode`]: true,
  })

  return (
    <div className="items">
      <ScrollView maxHeight="100%" minHeight="100%" className="explorer-scroll-view">
        {alert && (
          <div className="explorer-alert">
            <Alert {...alert} banner />
          </div>
        )}

        {loading ? (
          <ExplorerFilesSkeletons viewMode={viewMode} />
        ) : (
          <Selectable
            className={selectableClasses}
            itemComponent={ExplorerFile}
            dataset={files}
            onSelect={onSelectionChange}
            disabled={!selectable}
            multiSelect={multiSelect}
          >
            {(File, { data, isSelected, select }) =>
              !filterTypes ||
              (typeof filterTypes === 'function' && filterTypes(data)) ||
              (typeof filterTypes === 'object' && filterTypes.includes(data.type)) ? (
                <File
                  {...data}
                  typeColors={typeColors}
                  viewMode={viewMode}
                  onClick={disabled ? undefined : select}
                  isSelected={isSelected && selectedFiles.length > 0}
                  i18n={i18n}
                  rename={openRenameModal(data)}
                />
              ) : (
                <></>
              )
            }
          </Selectable>
        )}
      </ScrollView>
    </div>
  )
}
