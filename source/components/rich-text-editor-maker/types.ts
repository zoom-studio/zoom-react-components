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
import { RichUtils } from './utils'
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
    'break',
    'table',
    'image',
    'video',
    'file',
    'sticker',
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

  export interface TableInfo {
    rows: number
    cols: number
  }

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
      | 'resetLinkInfo'
      | 'toggleHighlight'
      | 'toggleList'
      | 'insertRule'
      | 'insertParagraph'
      | 'insertTable'
      | 'insertImage'
      | 'insertVideo'
      | 'insertFile'
    > {
    renderEditor: () => JSX.Element
    setIsBlankedLink: Dispatch<SetStateAction<boolean | undefined>>
    setIsNoFollowLink: Dispatch<SetStateAction<boolean | undefined>>
    setLinkURL: Dispatch<SetStateAction<string | undefined>>
    selectionLink: Required<LinkInfo>
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    editor: Editor
    placeholder?: string
    children?: ((handlers: ChildrenCallback) => ReactNode) | ReactNode
    renderLinkElement?: (params: RenderLinkInfoCallbackParams) => ReactNode
  }

  export type ComponentType = ForwardRefExoticComponent<Props & RefAttributes<HTMLDivElement>> & {
    provider: typeof RichTextEditorMakerProvider
  }
}
