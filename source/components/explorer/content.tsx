import React, { FC } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { Alert, AlertNS, ExplorerNS, ScrollView, Selectable } from '..'
import { UseObjectedStateNS } from '../../hooks'

import { ExplorerFile } from './file'

export namespace ExplorerContentNS {
  export interface Props {
    selectable: boolean
    files: ExplorerNS.FileInterface[]
    selectedFiles: UseObjectedStateNS.ReturnType<number[]>
    multiSelect: boolean
    viewMode: ExplorerNS.ViewMode
    typeColors: ExplorerNS.TypeColors
    alert?: AlertNS.Props
    onSelectionChange: (selectedIndexes: number[]) => void
  }
}

export const ExplorerContent: FC<ExplorerContentNS.Props> = ({
  selectable,
  files,
  selectedFiles,
  multiSelect,
  viewMode,
  typeColors,
  alert,
  onSelectionChange,
}) => {
  const selectableClasses = classNames('selectable-container', {
    [`${viewMode}-view-mode`]: true,
  })

  return (
    <div className="items">
      <ScrollView maxHeight="100%" className="explorer-scroll-view">
        {alert && (
          <div className="explorer-alert">
            <Alert {...alert} banner />
          </div>
        )}

        <Selectable
          className={selectableClasses}
          itemComponent={ExplorerFile}
          dataset={files}
          onSelect={onSelectionChange}
          disabled={!selectable}
          multiSelect={multiSelect}
        >
          {(File, { data, isSelected, select }) => (
            <File
              {...data}
              typeColors={typeColors}
              viewMode={viewMode}
              onClick={select}
              isSelected={isSelected}
            />
          )}
        </Selectable>
      </ScrollView>
    </div>
  )
}
