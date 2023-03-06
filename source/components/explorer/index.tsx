import React, { FC } from 'react'

import { useObjectedState, useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'
import { AlertNS, ButtonNS } from '..'
import { ExplorerContent } from './content'

import { ExplorerHeader } from './header'
import { ExplorerSidebar } from './sidebar'
import { UseExplorerI18n, UseExplorerI18nNS } from './use-i18n'
import { customizeFileTypeColors } from './utils'

export namespace ExplorerNS {
  export const ViewMode = ['grid', 'row'] as const
  export type ViewMode = typeof ViewMode[number]

  export const ImageType = ['png', 'jpg', 'jpeg', 'webp'] as const
  export type ImageType = typeof ImageType[number]
  export type MaybeImageType = ImageType | (string & {})

  export const FileType = [...ImageType, 'pdf'] as const
  export type FileType = typeof FileType[number]
  export type MaybeFileType = FileType | (string & {})

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
  export type NotPreviewedKnownFileType = typeof NotPreviewedKnownFileType[number]
  export type MaybeNotPreviewedKnownFileType = NotPreviewedKnownFileType | (string & {})

  export const AllFileTypes = [...FileType, ...NotPreviewedKnownFileType] as const
  export type AllFileTypes = typeof AllFileTypes[number]
  export type MaybeAllFileTypes = AllFileTypes | (string & {})
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

  export interface Props extends Omit<BaseComponent, 'children'> {
    viewMode?: ViewMode
    typeColors?: Partial<TypeColors>
    filterTypes?: ((file: FileInterface) => boolean) | MaybeAllFileTypes[]
    files?: FileInterface[]
    selectable?: boolean
    multiSelect?: boolean
    alert?: AlertNS.Props
    isDeletingFiles?: boolean
    isRenamingFiles?: boolean
    loading?: boolean
    disabled?: boolean
    typeSelectIsDisabled?: boolean
    searchInputIsDisabled?: boolean
    showFooter?: boolean
    footerActions?: ButtonNS.Props
    onDeleteFiles?: (fileIDs: ID[]) => void
    onRenameFile?: (fileID: ID, newName: string) => void
    onSearch?: (parameters: Partial<SearchParameters>) => void
    onEditImage?: (newImage: File) => void
    onUploadFiles?: (files: File[]) => void
    onSelectItems?: (items: FileInterface[]) => void
    onSelectionChange?: (items: ID[]) => void
  }
}

export const Explorer: FC<ExplorerNS.Props> = ({
  typeColors: providedTypeColors,
  viewMode: providedViewMode = 'grid',
  selectable = true,
  multiSelect = true,
  files = [],
  className,
  containerProps,
  reference,
  alert,
  onDeleteFiles,
  onEditImage,
  onRenameFile,
  onSearch,
  onSelectItems,
  onUploadFiles,
  onSelectionChange,
  filterTypes,
  isDeletingFiles,
  isRenamingFiles,
  disabled,
  loading,
  searchInputIsDisabled,
  typeSelectIsDisabled,
  showFooter,
  footerActions,
}) => {
  const typeColors: ExplorerNS.TypeColors = customizeFileTypeColors(
    ExplorerNS.DefaultTypeColors,
    providedTypeColors,
  )

  const { createClassName, globalI18ns } = useZoomComponent('explorer')
  const i18n = UseExplorerI18n(globalI18ns)

  const classes = createClassName(className)

  const viewMode = useObjectedState(providedViewMode)
  const selectedFiles = useObjectedState<number[]>([])
  const typeQuery = useObjectedState<ExplorerNS.MaybeAllFileTypesWithAll>('all')
  const searchQuery = useObjectedState('')

  return (
    <div className={classes} {...containerProps} ref={reference}>
      <ExplorerHeader
        viewMode={viewMode}
        i18n={i18n}
        typeQuery={typeQuery}
        searchQuery={searchQuery}
      />

      <div className="content">
        <ExplorerContent
          typeColors={typeColors}
          multiSelect={multiSelect}
          selectable={selectable}
          files={files}
          selectedFiles={selectedFiles}
          viewMode={viewMode.val!}
          alert={alert}
        />

        <ExplorerSidebar
          typeColors={typeColors}
          i18n={i18n}
          selectedFiles={selectedFiles.val!}
          files={files}
        />
      </div>
    </div>
  )
}
