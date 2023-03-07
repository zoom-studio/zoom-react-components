import React, { FC, useState } from 'react'

import {
  Button,
  ButtonNS,
  Col,
  ColNS,
  Download,
  ExplorerNS,
  Image,
  ImageEditorDialog,
  PopConfirm,
  Row,
  ScrollView,
  SVGIcon,
  Text,
} from '..'
import { useZoomContext } from '../../hooks'
import { ExplorerFileInfo } from './file-info'
import { getFileTypeColors, isImage } from './utils'

export namespace ExplorerSidebarNS {
  export interface Props extends Pick<ExplorerNS.Props, 'onEditImage'> {
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
  onEditImage,
}) => {
  const { isRTL } = useZoomContext()

  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false)

  const dualActionColProps: ColNS.Props = { xs: 12, sm: 12, md: 12, lg: 12 }
  const singleActionColProps: ColNS.Props = { xs: 24, sm: 24, md: 24, lg: 24 }
  const actionProps: ButtonNS.Props = {
    className: 'sidebar-action',
    size: 'small',
    type: 'bordered',
    variant: 'info',
  }

  const firstSelectedFile = files[selectedFiles[0]]
  const firstSelectedFileColors = getFileTypeColors(firstSelectedFile?.type, typeColors)

  const openImageEditor = () => {
    setIsImageEditorOpen(true)
  }

  const closeImageEditor = () => {
    setIsImageEditorOpen(false)
  }

  return (
    <div className="sidebar">
      {isImage(firstSelectedFile?.type) && (
        <ImageEditorDialog
          src={firstSelectedFile.link}
          isOpen={isImageEditorOpen}
          onClose={closeImageEditor}
          onSave={onEditImage}
          saveButton={i18n.saveImage}
          cancelButton={i18n.cancelEditingImage}
          title={i18n.imageEditorTitle}
        />
      )}

      {selectedFiles.length === 1 ? (
        <ScrollView
          maxHeight="100%"
          minHeight="100%"
          minWidth="100%"
          className="sidebar-scroll-view"
        >
          <div className="sidebar-content">
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

            <div className="file-actions">
              <Row fixWidth={false}>
                <Col {...dualActionColProps}>
                  <Download link={firstSelectedFile.link} fileName={firstSelectedFile.name}>
                    {({ startDownload, isDownloading }) => (
                      <Button {...actionProps} onClick={startDownload} loading={isDownloading}>
                        {isDownloading ? '' : i18n.download}
                      </Button>
                    )}
                  </Download>
                </Col>

                <Col {...dualActionColProps}>
                  <Button {...actionProps}>{i18n.rename}</Button>
                </Col>

                {isImage(firstSelectedFile.type) && (
                  <Col {...dualActionColProps}>
                    <Button {...actionProps} onClick={openImageEditor}>
                      {i18n.editImage}
                    </Button>
                  </Col>
                )}

                <Col
                  {...(isImage(firstSelectedFile.type) ? dualActionColProps : singleActionColProps)}
                >
                  <PopConfirm
                    title="delete"
                    placement={
                      isImage(firstSelectedFile.type) ? (isRTL ? 'top-start' : 'top-end') : 'top'
                    }
                    buttonProps={{ ...actionProps, variant: 'error' }}
                    cancel={handlers => ({
                      onClick: () => handlers.closePopover(),
                      children: 'Cancel',
                    })}
                  >
                    {i18n.delete}
                  </PopConfirm>
                </Col>
              </Row>
            </div>

            <div className="file-info">
              <ExplorerFileInfo displayName={i18n.createdAt} value={firstSelectedFile.createdAt} />
              <ExplorerFileInfo displayName={i18n.updatedAt} value={firstSelectedFile.updatedAt} />

              {firstSelectedFile.moreInfo?.map((info, index) => (
                <ExplorerFileInfo {...info} key={index} />
              ))}
            </div>
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
