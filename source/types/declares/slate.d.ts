import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

import { EmojiNS, RichTextEditorMakerNS } from '../../components'

declare module 'slate' {
  interface CustomElement {
    type: RichTextEditorMakerNS.ElementTypes
    children?: Descendant[]
    text?: string
    imageInfo?: RichTextEditorMakerNS.ImageInfo
    videoInfo?: RichTextEditorMakerNS.VideoInfo
    fileInfo?: RichTextEditorMakerNS.FileInfo
    emojiName?: EmojiNS.Emojis.Names
    mentionInfo?: RichTextEditorMakerNS.MentionInfo
    hashtagInfo?: RichTextEditorMakerNS.HashtagInfo
    id?: string
    tableRowIndex?: number
    tableColIndex?: number
    tableInfo?: RichTextEditorMakerNS.TableInfo
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
    mentionInfo?: RichTextEditorMakerNS.MentionInfo
    hashtagInfo?: RichTextEditorMakerNS.HashtagInfo
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
