import React, { FC, ReactNode } from 'react'

import { Button, ButtonNS, Divider, ExplorerNS, Image, ScrollView, Stack, SVGIcon, Text } from '..'
import { getFileTypeColors, isImage } from './utils'

export namespace ExplorerSidebarNS {
  export interface Props {
    i18n: Required<ExplorerNS.I18n>
    files: ExplorerNS.FileInterface[]
    selectedFiles: number[]
    typeColors: ExplorerNS.TypeColors
  }
}

export const ExplorerSidebar: FC<ExplorerSidebarNS.Props> = ({
  i18n,
  selectedFiles,
  files,
  typeColors,
}) => {
  const actionProps: ButtonNS.Props = {
    shape: 'square',
    type: 'text',
    className: 'sidebar-action',
  }

  const firstSelectedFile = files[selectedFiles[0]]
  const firstSelectedFileColors = getFileTypeColors(firstSelectedFile?.type, typeColors)

  const renderInfo = (
    title: string,
    value: ExplorerNS.MoreInfo['value'],
    key?: number,
  ): ReactNode => {
    return (
      <div key={key} className="info">
        <Text className="title" bold>
          {title}:
        </Text>
        <Text className="value">{value ?? '-'}</Text>
      </div>
    )
  }

  return (
    <div className="sidebar">
      {selectedFiles.length === 1 ? (
        <ScrollView
          maxHeight="100%"
          minHeight="100%"
          minWidth="100%"
          className="sidebar-scroll-view"
        >
          <div className="actions">
            <Stack dividers={<Divider vertical />} justify="space-around" spacing={0}>
              <Button suffixMaterialIcon="delete" variant="error" {...actionProps} />
              <Button suffixMaterialIcon="edit" variant="info" {...actionProps} />
              <Button suffixMaterialIcon="download" {...actionProps} />
            </Stack>
          </div>

          <div className="file-preview">
            {isImage(firstSelectedFile.type) ? (
              <Image src={firstSelectedFile.link} width="90%" height="100px" withImageViewer />
            ) : (
              <div className="unknown-file-preview">
                <SVGIcon name="file" color={firstSelectedFileColors.background} />
                <Text
                  bold
                  large
                  className="format"
                  style={{ color: firstSelectedFileColors.foreground }}
                >
                  {firstSelectedFile.type.toUpperCase()}
                </Text>
              </div>
            )}
          </div>

          <Text className="file-name" large>
            {firstSelectedFile.name}
          </Text>

          <div className="file-info">
            {renderInfo(i18n.createdAt, firstSelectedFile.createdAt)}
            {renderInfo(i18n.updatedAt, firstSelectedFile.updatedAt)}

            {firstSelectedFile.moreInfo?.map((info, index) =>
              renderInfo(info.displayName, info.value, index),
            )}
          </div>
        </ScrollView>
      ) : (
        <div className="preview-message">
          <Text>
            {selectedFiles.length === 0
              ? i18n.previewMessage
              : `${selectedFiles.length} ${i18n.moreThanOneFileSelectedMessage}`}
          </Text>
        </div>
      )}
    </div>
  )
}
