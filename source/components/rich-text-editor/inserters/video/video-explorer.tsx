import React, { useState, type FC } from 'react'

import { type UseObjectedStateNS } from '@zoom-studio/js-ts-utils'

import {
  ExplorerDialog,
  ExplorerNS,
  type RichTextEditorMakerNS,
  type RichTextEditorNS,
} from '../../..'

export namespace VideoExplorerNS {
  export interface Props extends Pick<RichTextEditorNS.Props, 'videoExplorerProps'> {
    isVideoDialogOpen: UseObjectedStateNS.ReturnType<boolean>
    handleCreateVideo: (videoInfo: RichTextEditorMakerNS.VideoInfo) => void
    defaultTypeQuery: string
  }
}

export const VideoExplorer: FC<VideoExplorerNS.Props> = ({
  videoExplorerProps,
  handleCreateVideo,
  isVideoDialogOpen,
  defaultTypeQuery,
}) => {
  const [selectedFileIndexes, setSelectedFileIndexes] = useState<number[]>([])

  const files = videoExplorerProps?.files

  const getSelectedFiles = (): ExplorerNS.FileInterface[] => {
    return files ? selectedFileIndexes.map(fileIndex => files[fileIndex]) : []
  }

  const handleInsertVideos = () => {
    const selectedFiles = getSelectedFiles()
    selectedFiles.forEach(file => {
      handleCreateVideo({ src: file.link })
    })
    closeDialog()
  }

  const closeDialog = () => {
    isVideoDialogOpen.set(false)
  }

  return (
    <ExplorerDialog
      {...videoExplorerProps}
      multiSelect
      isTypeSelectDisabled
      isOpen={!!isVideoDialogOpen.val}
      onClose={closeDialog}
      filterTypes={[...ExplorerNS.VideoType]}
      defaultTypeQuery={defaultTypeQuery}
      onSelectItems={setSelectedFileIndexes}
      selectButtonProps={{
        onClick: handleInsertVideos,
      }}
    />
  )
}
