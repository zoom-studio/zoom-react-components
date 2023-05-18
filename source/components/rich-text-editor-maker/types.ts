import {
  Dispatch,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  SetStateAction,
} from 'react'

import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

import { RichTextEditorMakerProvider } from './provider'
import { LinkUtils, RichUtils } from './utils'
import { BaseComponent } from '../../types'
import { ExplorerNS } from '../explorer'

export namespace RichTextEditorMakerNS {
  export type Editor = BaseEditor & ReactEditor

  export type ListTypes = Extract<BlockTypes, 'ordered-list' | 'unordered-list'>

  export type BlockTypes = typeof BlockTypes[number]
  export const BlockTypes = [
    'paragraph',
    'normal',
    'h1',
    'h2',
    'h3',
    'h4',
    'quote',
    'ordered-list',
    'unordered-list',
    'list-item',
    'list-item-text',
    'break',
    'table',
    'table-row',
    'table-cell',
    'image',
    'video',
    'file',
    'rule',
  ] as const

  export type MarkTypes = typeof MarkTypes[number]
  export const MarkTypes = [
    'bold',
    'italic',
    'underline',
    'link',
    'emoji',
    'mention',
    'hashtag',
    'highlight',
    'strikethrough',
  ] as const

  export type ElementTypes = typeof ElementTypes[number]
  export const ElementTypes = [...BlockTypes, ...MarkTypes] as const

  export interface LinkInfo {
    url: string
    openInNewTab?: boolean
    noFollow?: boolean
  }

  export interface MentionInfo {
    displayName: string
    [key: string]: any
  }

  export interface HashtagInfo {
    displayName: string
    [key: string]: any
  }

  export type TableData = string[][]

  export interface TableCells {
    rows: number
    cols: number
  }

  export type TableInfo = TableCells

  export interface ImageInfo {
    src: string
    alt?: string
  }

  export interface FileInfo {
    type: ExplorerNS.MaybeAllFileTypes
    src: string
    name: string
    size: number
  }

  export interface VideoInfo {
    src: string
  }

  export interface RenderLinkInfoCallbackParams extends LinkInfo {
    children: ReactNode
    handlers: ChildrenCallback
  }

  export interface ChildrenCallback
    extends Pick<
        RichUtils,
        | 'toggleHeading'
        | 'toggleBold'
        | 'isActive'
        | 'focusEditor'
        | 'toggleItalic'
        | 'toggleUnderline'
        | 'toggleStrikethrough'
        | 'toggleQuote'
        | 'insertLink'
        | 'removeLink'
        | 'toggleHighlight'
        | 'toggleList'
        | 'isRangeSelected'
        | 'insertRule'
        | 'insertParagraph'
        | 'insertTable'
        | 'insertImage'
        | 'insertVideo'
        | 'insertFile'
        | 'insertEmoji'
        | 'insertMention'
        | 'insertHashtag'
      >,
      Pick<LinkUtils, 'resetLinkInfo'> {
    renderEditor: () => JSX.Element
    setIsBlankedLink: Dispatch<SetStateAction<boolean | undefined>>
    setIsNoFollowLink: Dispatch<SetStateAction<boolean | undefined>>
    setLinkURL: Dispatch<SetStateAction<string | undefined>>
    selectionLink: Required<LinkInfo>
    undo: () => void
    redo: () => void
  }

  export interface Props extends Omit<BaseComponent, 'children' | 'id'> {
    editor: Editor
    placeholder?: string
    children?: ((handlers: ChildrenCallback) => ReactNode) | ReactNode
    renderLinkElement?: (params: RenderLinkInfoCallbackParams) => ReactNode
    id: string
    collapseOnEscape?: boolean
  }

  export type ComponentType = ForwardRefExoticComponent<Props & RefAttributes<HTMLDivElement>> & {
    provider: typeof RichTextEditorMakerProvider
  }
}
