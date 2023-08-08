import React, { type FC, useState } from 'react'

import { type UseObjectedStateNS } from '@zoom-studio/js-ts-utils'

import {
  Button,
  type ButtonNS,
  Col,
  type ColNS,
  Download,
  type ExplorerNS,
  Image,
  ImageEditorDialog,
  type ImageEditorNS,
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
  export interface Props
    extends Pick<
      ExplorerNS.Props,
      'onEditImage' | 'onDeleteFiles' | 'isSavingEditedImage' | 'isDeletingFiles' | 'isRenamingFile'
    > {
    i18n: Required<ExplorerNS.I18n>
    files: ExplorerNS.FileInterface[]
    selectedFiles: UseObjectedStateNS.ReturnType<number[]>
    typeColors: ExplorerNS.TypeColors
    handleOpenRenameModal: (selectedFile: ExplorerNS.FileInterface) => () => void
    disabled?: boolean
    loading?: boolean
  }
}

export const ExplorerSidebar: FC<ExplorerSidebarNS.Props> = ({
  i18n,
  selectedFiles,
  files,
  typeColors,
  onEditImage,
  onDeleteFiles,
  handleOpenRenameModal,
  isSavingEditedImage,
  disabled,
  isDeletingFiles,
  isRenamingFile,
  loading,
}) => {
  const actionsPopoverWidth = '176px'

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

  const firstSelectedFile = files[selectedFiles.val![0]]
  const firstSelectedFileColors = getFileTypeColors(firstSelectedFile?.type, typeColors)

  const openImageEditor = () => {
    setIsImageEditorOpen(true)
  }

  const closeImageEditor = () => {
    setIsImageEditorOpen(false)
  }

  const getSelectedFilesIDs = (): ExplorerNS.ID[] => {
    const IDs: ExplorerNS.ID[] = []
    selectedFiles.val!.forEach(fileIndex => IDs.push(files[fileIndex].id))
    return IDs
  }

  const handleClearSelectedFiles = () => {
    selectedFiles.set([])
  }

  const handleDeleteFile = (closePopConfirm: () => void) => {
    onDeleteFiles?.(getSelectedFilesIDs(), closePopConfirm, handleClearSelectedFiles)
  }

  const handleOnEditImage = (result: ImageEditorNS.ResultType | undefined) => {
    onEditImage?.(firstSelectedFile.id, result, closeImageEditor)
  }

  return (
    <div className="sidebar">
      {isImage(firstSelectedFile?.type) && (
        <ImageEditorDialog
          src={firstSelectedFile.link}
          isOpen={isImageEditorOpen}
          onClose={closeImageEditor}
          onSave={handleOnEditImage}
          saveButton={i18n.saveImage}
          cancelButton={i18n.cancelEditingImage}
          saveButtonProps={{ loading: isSavingEditedImage }}
          title={i18n.imageEditorTitle}
          disabled={isSavingEditedImage}
          closable={!isSavingEditedImage}
        />
      )}

      {selectedFiles.val!.length === 1 ? (
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
                  <Button
                    {...actionProps}
                    disabled={isRenamingFile}
                    onClick={handleOpenRenameModal(firstSelectedFile)}
                  >
                    {i18n.rename}
                  </Button>
                </Col>

                {isImage(firstSelectedFile.type) && (
                  <Col {...dualActionColProps}>
                    <Button
                      {...actionProps}
                      disabled={isSavingEditedImage}
                      onClick={openImageEditor}
                    >
                      {i18n.editImage}
                    </Button>
                  </Col>
                )}

                <Col
                  {...(isImage(firstSelectedFile.type) ? dualActionColProps : singleActionColProps)}
                >
                  <PopConfirm
                    title={i18n.confirmDeleteTitle}
                    description={i18n.confirmDeleteDescription}
                    width={actionsPopoverWidth}
                    variant="error"
                    buttonProps={{ ...actionProps, variant: 'error', disabled: isDeletingFiles }}
                    placement={
                      isImage(firstSelectedFile.type) ? (isRTL ? 'top-start' : 'top-end') : 'top'
                    }
                    confirm={handlers => ({
                      onClick: () => {
                        handleDeleteFile(handlers.closePopover)
                      },
                      children: i18n.confirmDelete,
                      variant: 'error',
                      loading: isDeletingFiles,
                    })}
                    cancel={handlers => ({
                      onClick: () => {
                        handlers.closePopover()
                      },
                      children: i18n.cancelDelete,
                      variant: 'success',
                      type: 'link',
                      disabled: isDeletingFiles,
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
          {(!disabled || loading) && (
            <Text>
              {loading
                ? i18n.loadingFiles
                : selectedFiles.val!.length === 0
                ? i18n.previewMessage
                : `${selectedFiles.val!.length} ${i18n.moreThanOneFileSelectedMessage}`}
            </Text>
          )}
        </div>
      )}
    </div>
  )
}
