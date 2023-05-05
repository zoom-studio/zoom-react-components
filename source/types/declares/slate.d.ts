import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

import { RichTextEditorMakerNS, EmojiNS } from '../../components'

declare module 'slate' {
  interface CustomElement {
    type: RichTextEditorMakerNS.ElementTypes
    children?: Descendant[]
    text?: string
    tableInfo?: RichTextEditorMakerNS.TableInfo
    imageInfo?: RichTextEditorMakerNS.ImageInfo
    videoInfo?: RichTextEditorMakerNS.VideoInfo
    fileInfo?: RichTextEditorMakerNS.FileInfo
    emojiName?: EmojiNS.Emojis.Names
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
    hashtag?: boolean
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
