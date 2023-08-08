import React, { type DragEvent, type FormEvent, forwardRef, useRef, useState } from 'react'

import { classNames, fileListToArray, type MaybeString } from '@zoom-studio/js-ts-utils'

import { AsyncWrapper, Button, ExplorerNS, Icon, Text, Title, type TypographyNS } from '..'
import { useZoomComponent, useZoomContext } from '../../hooks'
import { type BaseComponent, type DataEntriesState } from '../../types'
import { customizeFileTypeColors } from '../explorer/utils'

import { logs } from '../../constants'
import { UploaderFile } from './file'
import { useUploaderI18n, type UseUploaderI18nNS } from './use-i18n'
import { getFileInfo } from './utils'

export namespace UploaderNS {
  export type I18n = UseUploaderI18nNS.I18n

  export const AcceptableTypes = ['audio/*', 'video/*', 'image/*'] as const
  export type AcceptableTypes = (typeof AcceptableTypes)[number]
  export type MaybeAcceptableTypes = MaybeString<AcceptableTypes>

  export interface FileInterface {
    name: string
    type: ExplorerNS.MaybeAllFileTypes
    size: number
    percentage?: number
    imageSource?: string | null
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    title?: string
    description?: string
    typeColors?: Partial<ExplorerNS.TypeColors>
    accept?: MaybeAcceptableTypes
    disabled?: boolean
    loading?: boolean
    maxFiles?: number
    onWrite?: (files: File[]) => void
    onRemove?: (fileIndex: number, closePopConfirm: () => void) => void
    state?: DataEntriesState
    i18n?: I18n
    disabledOnLoading?: boolean
    files?: (FileInterface | File)[]
    stateMessageProps?: TypographyNS.TextNS.Props
    isRemovingFile?: boolean
  }
}

export const Uploader = forwardRef<HTMLDivElement, UploaderNS.Props>(
  (
    {
      i18n: componentI18n,
      typeColors: providedTypeColors,
      disabledOnLoading = true,
      state = ['neutral'],
      files = [],
      maxFiles = 1,
      className,
      containerProps,
      description,
      stateMessageProps,
      title,
      accept,
      disabled,
      loading,
      isRemovingFile,
      onRemove,
      onWrite,
      ...rest
    },
    reference,
  ) => {
    const { createClassName, globalI18ns, sendLog } = useZoomComponent('uploader')
    const i18n = useUploaderI18n(globalI18ns, componentI18n)
    const { isRTL } = useZoomContext()
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [isDraggedOver, setIsDraggedOver] = useState(false)

    const isDisabled =
      (disabledOnLoading ? loading || disabled : disabled) || files.length >= maxFiles

    const typeColors: ExplorerNS.TypeColors = customizeFileTypeColors(
      ExplorerNS.DefaultTypeColors,
      providedTypeColors,
    )

    const stateMessageClasses = createClassName(stateMessageProps?.className, 'state-message')
    const classes = createClassName(className, '', {
      [createClassName('', state[0])]: true,
      [createClassName('', loading ? 'loading' : '')]: !!loading,
      [createClassName('', isDisabled ? 'disabled' : '')]: !!isDisabled,
    })
    const uploaderDNDClasses = classNames('uploader-dnd', {
      'dragged-over': isDraggedOver,
    })

    const handleOpenFileDialog = () => {
      if (isDisabled) {
        return
      }

      const { current: fileInput } = fileInputRef
      if (!fileInput) {
        sendLog(logs.uploaderNotFoundFileInputRef, 'handleOpenFileDialog fn')
        return
      }

      fileInput.click()
    }

    const handleWriteFiles = (files: FileList | null) => {
      let filesArray = fileListToArray(files)
      filesArray = filesArray.slice(0, maxFiles)
      onWrite?.(filesArray)
    }

    const handleOnInputChange = (evt: FormEvent<HTMLInputElement>) => {
      if (isDisabled) {
        return
      }

      const { files } = evt.currentTarget
      handleWriteFiles(files)

      const { current: fileInput } = fileInputRef
      if (!fileInput) {
        sendLog(logs.uploaderNotFoundFileInputRef, 'handleOnInputChange fn')
        return
      }
      fileInput.value = ''
    }

    const handleOnDragOver = (evt: DragEvent<HTMLDivElement>) => {
      if (isDisabled) {
        return
      }

      evt.preventDefault()
      setIsDraggedOver(true)
    }

    const handleOnDragLeave = () => {
      if (isDisabled) {
        return
      }

      setIsDraggedOver(false)
    }

    const handleOnDrop = (evt: DragEvent<HTMLDivElement>) => {
      if (isDisabled) {
        return
      }

      evt.stopPropagation()
      evt.preventDefault()
      setIsDraggedOver(false)

      const { files } = evt.dataTransfer
      handleWriteFiles(files)
    }

    return (
      <div
        {...rest}
        {...containerProps}
        ref={reference}
        className={classes}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        onDrop={handleOnDrop}
      >
        <input
          hidden
          type="file"
          ref={fileInputRef}
          onInput={handleOnInputChange}
          accept={accept}
          multiple={maxFiles > 1}
          disabled={isDisabled}
        />

        <div className="uploader-titles">
          {title && <Title className="uploader-title">{title}</Title>}
          {description && <Text className="uploader-description">{description}</Text>}

          {state[1] && (
            <Text {...stateMessageProps} className={stateMessageClasses}>
              {state[1]}
            </Text>
          )}
        </div>

        <div className={uploaderDNDClasses} onClick={handleOpenFileDialog}>
          <Icon className="uploader-dnd-icon" name="cloud_upload" />

          <Title h6 className="uploader-dnd-title">
            {i18n.dndTitle}
          </Title>

          <Text className="uploader-dnd-or">{i18n.or}</Text>

          <Button className="uploader-dnd-button" disabled={isDisabled} loading={loading}>
            {i18n.browseButton}
          </Button>
        </div>

        {files.length > 0 && (
          <div className="uploaded-files">
            <Text className="uploaded-files-title">{i18n.uploadedFiles}</Text>

            <div className="files">
              {files.map((file, index) => (
                <AsyncWrapper deps={[files]} key={index} processor={getFileInfo} processable={file}>
                  {({ processed }) => (
                    <>
                      {processed && (
                        <UploaderFile
                          {...processed}
                          index={index}
                          isRemovingFile={isRemovingFile}
                          i18n={i18n}
                          isRTL={isRTL}
                          typeColors={typeColors}
                          onRemove={onRemove}
                        />
                      )}
                    </>
                  )}
                </AsyncWrapper>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  },
)
