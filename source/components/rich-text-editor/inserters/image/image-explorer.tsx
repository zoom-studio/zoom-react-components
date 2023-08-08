import React, { useState, type FC } from 'react'

import { type UseObjectedStateNS } from '@zoom-studio/js-ts-utils'

import {
  ExplorerDialog,
  ExplorerNS,
  type RichTextEditorMakerNS,
  type RichTextEditorNS,
} from '../../..'

export namespace ImageExplorerNS {
  export interface Props extends Pick<RichTextEditorNS.Props, 'imageExplorerProps'> {
    isImageDialogOpen: UseObjectedStateNS.ReturnType<boolean>
    handleCreateImage: (imageInfo: RichTextEditorMakerNS.ImageInfo) => void
    defaultTypeQuery: string
  }
}

export const ImageExplorer: FC<ImageExplorerNS.Props> = ({
  imageExplorerProps,
  handleCreateImage,
  isImageDialogOpen,
  defaultTypeQuery,
}) => {
  const [selectedFileIndexes, setSelectedFileIndexes] = useState<number[]>([])

  const files = imageExplorerProps?.files

  const getSelectedFiles = (): ExplorerNS.FileInterface[] => {
    return files ? selectedFileIndexes.map(fileIndex => files[fileIndex]) : []
  }

  const handleInsertImages = () => {
    const selectedFiles = getSelectedFiles()
    selectedFiles.forEach(file => {
      handleCreateImage({ src: file.link, alt: file.name })
    })
    closeDialog()
  }

  const closeDialog = () => {
    isImageDialogOpen.set(false)
  }

  return (
    <ExplorerDialog
      {...imageExplorerProps}
      multiSelect
      isTypeSelectDisabled
      isOpen={!!isImageDialogOpen.val}
      onClose={closeDialog}
      filterTypes={[...ExplorerNS.ImageType]}
      defaultTypeQuery={defaultTypeQuery}
      onSelectItems={setSelectedFileIndexes}
      selectButtonProps={{
        onClick: handleInsertImages,
      }}
    />
  )
}
