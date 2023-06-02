import React, { type FC, useState } from 'react'

import { type UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils'

import {
  ExplorerDialog,
  ExplorerNS,
  type RichTextEditorMakerNS,
  type RichTextEditorNS,
} from '../../..'

import { type useRichTextEditorI18n } from '../../use-i18n'

export namespace ImageExplorerNS {
  export interface Props extends Pick<RichTextEditorNS.Props, 'imageExplorerProps'> {
    i18n: ReturnType<typeof useRichTextEditorI18n>
    isImageDialogOpen: UseObjectedStateNS.ReturnType<boolean>
    handleCreateImage: (imageInfo: RichTextEditorMakerNS.ImageInfo) => void
  }
}

export const ImageExplorer: FC<ImageExplorerNS.Props> = ({
  imageExplorerProps,
  i18n,
  handleCreateImage,
  isImageDialogOpen,
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
      defaultTypeQuery={i18n.images}
      onSelectItems={setSelectedFileIndexes}
      selectButtonProps={{
        onClick: handleInsertImages,
      }}
    />
  )
}
