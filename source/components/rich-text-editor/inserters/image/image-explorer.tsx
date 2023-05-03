import React, { FC, useState } from 'react'

import { UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils'

import { ExplorerDialog, ExplorerNS, RichTextEditorMakerNS, RichTextEditorNS } from '../../..'

import { useRichTextEditorI18n } from '../../use-i18n'

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
    // selectedFiles.forEach(file => handleCreateImage({ src: file.link, alt: file.name }))
    selectedFiles.forEach(file =>
      handleCreateImage({ src: 'https://placekitten.com/500/500', alt: file.name }),
    )
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
