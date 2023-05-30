import React, { type FormEvent, forwardRef, useMemo, useState } from 'react'

import { useFutureEffect, useObjectedState, type MaybeString } from '@zoom-studio/zoom-js-ts-utils'

import {
  type AlertNS,
  Dialog,
  type ImageEditorNS,
  Input,
  UploaderDialog,
  type UploaderDialogNS,
  type UploaderNS,
} from '..'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'
import { ExplorerContent } from './content'

import { ExplorerHeader } from './header'
import { ExplorerSidebar } from './sidebar'
import { UseExplorerI18n, type UseExplorerI18nNS } from './use-i18n'
import { customizeFileTypeColors, excludeFileExtension, getDefaultViewMode } from './utils'

export namespace ExplorerNS {
  export const VIEW_MODE_STORE_KEY = 'zoomrc-explorer-view-mode'

  export const ViewMode = ['grid', 'row'] as const
  export type ViewMode = (typeof ViewMode)[number]

  export const ImageType = ['png', 'jpg', 'jpeg', 'webp'] as const
  export type ImageType = (typeof ImageType)[number]
  export type MaybeImageType = MaybeString<ImageType>

  export const VideoType = ['webm', 'mkv', 'ogg', 'avi', 'mov', 'amv', 'mp4', '3gp'] as const
  export type VideoType = (typeof VideoType)[number]
  export type MaybeVideoType = MaybeString<VideoType>

  export const FileType = [...ImageType, ...VideoType, 'pdf'] as const
  export type FileType = (typeof FileType)[number]
  export type MaybeFileType = MaybeString<FileType>

  export const NotPreviewedKnownFileType = [
    'unknowns',
    'docx',
    'pdf',
    'xls',
    'mp4',
    'ppt',
    'eps',
    'psd',
    'avi',
    'mov',
    'html',
    'css',
    'mp3',
    'wav',
    'zip',
    'txt',
  ] as const
  export type NotPreviewedKnownFileType = (typeof NotPreviewedKnownFileType)[number]
  export type MaybeNotPreviewedKnownFileType = MaybeString<NotPreviewedKnownFileType>

  export const AllFileTypes = [...FileType, ...NotPreviewedKnownFileType] as const
  export type AllFileTypes = (typeof AllFileTypes)[number]
  export type MaybeAllFileTypes = MaybeString<AllFileTypes>
  export type MaybeAllFileTypesWithAll = MaybeAllFileTypes | 'all'

  export type ID = string | number
  export type I18n = UseExplorerI18nNS.I18n

  export interface MoreInfo {
    displayName: string
    value?: string | number | boolean | undefined
  }

  export interface TypeColorInfo {
    background: string
    foreground: 'white' | 'black'
  }
  export type TypeColors = {
    [key in MaybeNotPreviewedKnownFileType]: TypeColorInfo
  }

  export const DefaultTypeColors: TypeColors = {
    unknowns: { background: '#668091', foreground: 'white' },
    docx: { background: '#3597d2', foreground: 'white' },
    xls: { background: '#68ac45', foreground: 'white' },
    ppt: { background: '#f58751', foreground: 'white' },
    eps: { background: '#f1a063', foreground: 'white' },
    psd: { background: '#2e7db0', foreground: 'white' },
    mp4: { background: '#186ab6', foreground: 'white' },
    mov: { background: '#186ab6', foreground: 'white' },
    avi: { background: '#186ab6', foreground: 'white' },
    css: { background: '#96bcd4', foreground: 'white' },
    html: { background: '#549669', foreground: 'white' },
    mp3: { background: '#9951a1', foreground: 'white' },
    wav: { background: '#9951a1', foreground: 'white' },
    txt: { background: '#6269b1', foreground: 'white' },
    zip: { background: '#efbe26', foreground: 'black' },
    pdf: { background: '#aa0a00', foreground: 'white' },
  }

  export interface SearchParameters {
    query: string
    type: MaybeAllFileTypesWithAll
  }

  export interface FileInterface {
    name: string
    size: number
    type: MaybeAllFileTypes
    id: ID
    link: string
    createdAt: string
    updatedAt: string
    moreInfo?: MoreInfo[]
  }

  export interface UploaderProps
    extends Omit<UploaderNS.Props, 'title'>,
      Pick<UploaderDialogNS.Props, 'isUploadingFiles'> {
    handleClearFiles: () => void
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    viewMode?: ViewMode
    typeColors?: Partial<TypeColors>
    filterTypes?: ((file: FileInterface) => boolean) | MaybeAllFileTypes[]
    defaultTypeQuery?: MaybeAllFileTypesWithAll
    files?: FileInterface[]
    selectable?: boolean
    multiSelect?: boolean
    alert?: AlertNS.Props
    isDeletingFiles?: boolean
    isRenamingFile?: boolean
    loading?: boolean
    disabled?: boolean
    isTypeSelectDisabled?: boolean
    isSearchInputDisabled?: boolean
    isSavingEditedImage?: boolean
    uploaderProps?: UploaderProps
    i18n?: I18n
    onDeleteFiles?: (
      fileIDs: ID[],
      closePopConfirm: () => void,
      clearSelectedFiles: () => void,
    ) => void
    onRenameFile?: (fileID: ID, newName: string, closeModal: () => void) => void
    onSearch?: (parameters: Partial<SearchParameters>) => void
    onEditImage?: (
      imageID: ID,
      newImageResult: ImageEditorNS.ResultType | undefined,
      closeModal: () => void,
    ) => void
    onSelectItems?: (selectedIndexes: number[]) => void
  }
}

export const Explorer = forwardRef<HTMLDivElement, ExplorerNS.Props>(
  (
    {
      typeColors: providedTypeColors,
      viewMode: providedViewMode,
      i18n: componentI18n,
      selectable = true,
      multiSelect = true,
      files = [],
      defaultTypeQuery = 'all',
      className,
      isSavingEditedImage,
      containerProps,
      alert,
      onDeleteFiles,
      onEditImage,
      onRenameFile,
      onSearch,
      onSelectItems,
      uploaderProps,
      filterTypes,
      isDeletingFiles,
      isRenamingFile,
      disabled,
      loading,
      isSearchInputDisabled,
      isTypeSelectDisabled,
      ...rest
    },
    reference,
  ) => {
    const filteredFiles = useMemo<ExplorerNS.FileInterface[]>(() => {
      if (!filterTypes) {
        return files
      }

      const filteredFiles: ExplorerNS.FileInterface[] = []

      if (typeof filterTypes === 'function') {
        files.forEach(file => {
          if (filterTypes(file)) {
            filteredFiles.push(file)
          }
        })

        return filteredFiles
      }

      files.forEach(file => {
        if (filterTypes.includes(file.type)) {
          filteredFiles.push(file)
        }
      })

      return filteredFiles
    }, [files, filterTypes])

    const typeColors: ExplorerNS.TypeColors = customizeFileTypeColors(
      ExplorerNS.DefaultTypeColors,
      providedTypeColors,
    )

    const { createClassName, globalI18ns } = useZoomComponent('explorer')
    const i18n = UseExplorerI18n(globalI18ns, componentI18n)

    const classes = createClassName(className)
    const isDisabled = disabled || loading

    const [isUploaderDialogOpen, setIsUploaderDialogOpen] = useState(false)
    const viewMode = useObjectedState(getDefaultViewMode(providedViewMode))
    const selectedFiles = useObjectedState<number[]>([])
    const typeQuery = useObjectedState<ExplorerNS.MaybeAllFileTypesWithAll>(defaultTypeQuery)
    const searchQuery = useObjectedState('')
    const isRenameModalOpen = useObjectedState(false)
    const selectedFileName = useObjectedState('')
    const selectedFileToRename = useObjectedState<ExplorerNS.FileInterface | null>(null)

    const handleOnSelectionChange = (selectedIndexes: number[]) => {
      selectedFiles.set(selectedIndexes)
      onSelectItems?.(selectedIndexes)
    }

    const handleOpenRenameModal = (selectedFile: ExplorerNS.FileInterface) => () => {
      isRenameModalOpen.set(true)
      selectedFileName.set(excludeFileExtension(selectedFile.name))
      selectedFileToRename.set(selectedFile)
    }

    const handleCloseRenameModal = () => {
      isRenameModalOpen.set(false)
      selectedFileName.set('')
      selectedFileToRename.set(null)
    }

    const handleRenameFile = (evt?: FormEvent) => {
      evt?.preventDefault()

      if (excludeFileExtension(selectedFileToRename.val?.name ?? '') === selectedFileName.val) {
        handleCloseRenameModal()
      } else {
        if (selectedFileToRename.val && selectedFileName.val) {
          onRenameFile?.(selectedFileToRename.val.id, selectedFileName.val, handleCloseRenameModal)
        }
      }
    }

    const handleCloseUploaderDialog = () => {
      setIsUploaderDialogOpen(false)
      uploaderProps?.handleClearFiles()
    }

    const handleOpenUploaderDialog = () => {
      setIsUploaderDialogOpen(true)
    }

    useFutureEffect(() => {
      onSearch?.({ query: searchQuery.val, type: typeQuery.val })
    }, [searchQuery.val, typeQuery.val])

    return (
      <div {...rest} {...containerProps} className={classes} ref={reference}>
        <Dialog
          size="small"
          isOpen={isRenameModalOpen.val}
          onClose={handleCloseRenameModal}
          withFullscreenButton={false}
          title={i18n.renameDialogTitle}
          cancelButton={i18n.cancelRename}
          closable={!isRenamingFile}
          cancelButtonProps={{ disabled: isRenamingFile }}
          actions={[
            {
              children: i18n.confirmRename,
              onClick: () => {
                handleRenameFile()
              },
              loading: isRenamingFile,
            },
          ]}
        >
          <form className="rename-file" onSubmit={handleRenameFile}>
            <Input
              autoFocus
              label={i18n.renameFileLabel}
              value={selectedFileName.val}
              onWrite={selectedFileName.set}
              disabled={isRenamingFile}
            />
          </form>
        </Dialog>

        <UploaderDialog
          isOpen={isUploaderDialogOpen}
          onClose={handleCloseUploaderDialog}
          title={i18n.uploadNewFile}
          {...uploaderProps}
        />

        <ExplorerHeader
          viewMode={viewMode}
          i18n={i18n}
          openUploaderDialog={handleOpenUploaderDialog}
          typeQuery={typeQuery}
          searchQuery={searchQuery}
          isSearchInputDisabled={isSearchInputDisabled}
          isTypeSelectDisabled={isTypeSelectDisabled}
          disabled={isDisabled}
          defaultTypeQuery={defaultTypeQuery}
        />

        <div className="content">
          <ExplorerContent
            typeColors={typeColors}
            multiSelect={multiSelect}
            selectable={selectable}
            files={filteredFiles}
            filterTypes={filterTypes}
            loading={loading}
            viewMode={viewMode.val!}
            selectedFiles={selectedFiles.val!}
            alert={alert}
            onSelectionChange={handleOnSelectionChange}
            disabled={isDisabled}
            i18n={i18n}
            openRenameModal={handleOpenRenameModal}
          />

          <ExplorerSidebar
            isDeletingFiles={isDeletingFiles}
            typeColors={typeColors}
            i18n={i18n}
            loading={loading}
            selectedFiles={selectedFiles}
            disabled={isDisabled}
            files={filteredFiles}
            handleOpenRenameModal={handleOpenRenameModal}
            onEditImage={onEditImage}
            onDeleteFiles={onDeleteFiles}
            isSavingEditedImage={isSavingEditedImage}
            isRenamingFile={isRenamingFile}
          />
        </div>
      </div>
    )
  },
)
