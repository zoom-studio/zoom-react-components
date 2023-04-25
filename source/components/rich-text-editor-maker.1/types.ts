import { EditorState } from 'draft-js'
import { Dispatch, ReactNode, SetStateAction } from 'react'

import { EmojiNS } from '..'

import { useExportData } from './utils'

export namespace RichTextEditorMakerNS {
  export type InlineAndBlockStyles = BlockStyles | InlineStyles

  export type TextSizes = typeof TextSizes[number]
  export const TextSizes = ['normal', 'h1', 'h2', 'h3', 'h4'] as const

  export type BlockStyles = typeof BlockStyles[number]
  export const BlockStyles = [
    'header-one',
    'header-two',
    'header-three',
    'header-four',
    'unordered-list-item',
    'ordered-list-item',
    'blockquote',
    'unstyled',
  ] as const

  export type InlineStyles = typeof InlineStyles[number]
  export const InlineStyles = ['BOLD', 'ITALIC', 'UNDERLINE'] as const

  export type ExportData = ReturnType<typeof useExportData>

  export interface LinkInfo {
    url: string
    openInNewTab?: boolean
    noFollow?: boolean
  }

  export interface ImageInfo {
    src: string
    alt?: string
  }

  export interface TableInfo {
    rows: number
    cols: number
  }

  export interface DataInfo {
    characters: number
    words: number
    lines: number
  }

  export interface StickerInfo {
    src: string
  }

  export interface VideoInfo {
    src: string
  }

  export interface ChildrenCallback {
    editorState: EditorState
    setEditorState: Dispatch<SetStateAction<EditorState>>
    isRangeSelected: boolean
    isLinkSelected: boolean
    exportData: ExportData
    selectionLink: Required<LinkInfo>
    dataInfo: DataInfo
    setIsBlankedLink: Dispatch<SetStateAction<boolean | undefined>>
    setIsNoFollowLink: Dispatch<SetStateAction<boolean | undefined>>
    setLinkURL: Dispatch<SetStateAction<string | undefined>>
    undo: () => void
    redo: () => void
    renderEditor: () => JSX.Element
    toggleStyle: (style: InlineAndBlockStyles) => void
    insertEmoji: (emojiName: EmojiNS.Emojis.Names) => void
    insertLink: (linkInfo: LinkInfo) => void
    insertTable: (tableInfo: TableInfo) => void
    insertSticker: (stickerInfo: StickerInfo) => void
    insertVideo: (videoInfo: VideoInfo) => void
    insertHR: () => void
    removeLink: () => void
    insertImage: (imageInfo: ImageInfo) => void
    insertFile: (file: File | string) => void
    focusEditor: () => void
    containsStyle: (style: InlineAndBlockStyles) => boolean
    resetLinkInfo: () => void
    isValidURL: (URL: string | undefined) => boolean
  }

  export interface Props {
    placeholder?: string
    autoFocus?: boolean
    stripPastedStyles?: boolean
    spellCheck?: boolean
    linkify?: boolean
    hashtagify?: boolean
    children?: ((handlers: ChildrenCallback) => ReactNode) | ReactNode
  }
}
