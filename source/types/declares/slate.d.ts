import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

import { RichTextEditorMakerNS } from '../../components/rich-text-editor-maker'

declare module 'slate' {
  interface CustomElement {
    type: RichTextEditorMakerNS.ElementTypes
    children?: Descendant[]
    text?: string
    tableInfo?: RichTextEditorMakerNS.TableInfo
    imageInfo?: RichTextEditorMakerNS.ImageInfo
    videoInfo?: RichTextEditorMakerNS.VideoInfo
    fileInfo?: RichTextEditorMakerNS.FileInfo
  }

  interface Marks {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    link?: boolean
    emoji?: boolean
    mention?: boolean
    highlight?: boolean
    strikethrough?: boolean
    linkInfo?: RichTextEditorMakerNS.LinkInfo
  }

  interface CustomText extends Marks {
    text: string
  }

  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
