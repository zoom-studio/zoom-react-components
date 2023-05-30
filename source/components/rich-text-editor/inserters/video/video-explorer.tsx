import React, { type FC, useState } from 'react'

import { type UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils'

import {
  ExplorerDialog,
  ExplorerNS,
  type RichTextEditorMakerNS,
  type RichTextEditorNS,
} from '../../..'

import { type useRichTextEditorI18n } from '../../use-i18n'

export namespace VideoExplorerNS {
  export interface Props extends Pick<RichTextEditorNS.Props, 'videoExplorerProps'> {
    i18n: ReturnType<typeof useRichTextEditorI18n>
    isVideoDialogOpen: UseObjectedStateNS.ReturnType<boolean>
    handleCreateVideo: (videoInfo: RichTextEditorMakerNS.VideoInfo) => void
  }
}

export const VideoExplorer: FC<VideoExplorerNS.Props> = ({
  videoExplorerProps,
  i18n,
  handleCreateVideo,
  isVideoDialogOpen,
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
      defaultTypeQuery={i18n.videos}
      onSelectItems={setSelectedFileIndexes}
      selectButtonProps={{
        onClick: handleInsertVideos,
      }}
    />
  )
}
