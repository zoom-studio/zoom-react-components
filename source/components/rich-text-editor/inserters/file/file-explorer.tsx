import React, { type FC, useState } from 'react'

import { type UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils'

import {
  ExplorerDialog,
  type ExplorerNS,
  type RichTextEditorMakerNS,
  type RichTextEditorNS,
} from '../../..'

import { type useRichTextEditorI18n } from '../../use-i18n'

export namespace FileExplorerNS {
  export interface Props extends Pick<RichTextEditorNS.Props, 'fileExplorerProps'> {
    i18n: ReturnType<typeof useRichTextEditorI18n>
    isFileDialogOpen: UseObjectedStateNS.ReturnType<boolean>
    handleCreateFile: (fileInfo: RichTextEditorMakerNS.FileInfo) => void
  }
}

export const FileExplorer: FC<FileExplorerNS.Props> = ({
  fileExplorerProps,
  i18n,
  handleCreateFile,
  isFileDialogOpen,
}) => {
  const [selectedFileIndexes, setSelectedFileIndexes] = useState<number[]>([])

  const files = fileExplorerProps?.files

  const getSelectedFiles = (): ExplorerNS.FileInterface[] => {
    return files ? selectedFileIndexes.map(fileIndex => files[fileIndex]) : []
  }

  const handleInsertFiles = () => {
    const selectedFiles = getSelectedFiles()
    selectedFiles.forEach(file => {
      handleCreateFile({ name: file.name, size: file.size, src: file.link, type: file.type })
    })
    closeDialog()
  }

  const closeDialog = () => {
    isFileDialogOpen.set(false)
  }

  return (
    <ExplorerDialog
      {...fileExplorerProps}
      multiSelect
      isOpen={!!isFileDialogOpen.val}
      onClose={closeDialog}
      onSelectItems={setSelectedFileIndexes}
      selectButtonProps={{
        onClick: handleInsertFiles,
      }}
    />
  )
}
