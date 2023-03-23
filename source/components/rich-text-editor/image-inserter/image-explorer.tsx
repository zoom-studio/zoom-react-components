import React, { FC, useState } from 'react'

import { ExplorerDialog, ExplorerNS, RichTextEditorNS } from '../../..'
import { UseObjectedStateNS } from '../../../hooks'

import { useRichTextEditorI18n } from '../use-i18n'

export namespace RichTextEditorImageExplorerNS {
  export interface Props extends Pick<RichTextEditorNS.Props, 'imageExplorerProps'> {
    i18n: ReturnType<typeof useRichTextEditorI18n>
    isImageDialogOpen: UseObjectedStateNS.ReturnType<boolean>
    handleCreateImage: (imageSource: string, alt?: string) => void
  }
}

export const RichTextEditorImageExplorer: FC<RichTextEditorImageExplorerNS.Props> = ({
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
    selectedFiles.forEach(file => handleCreateImage(file.link, file.name))
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
