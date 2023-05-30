import { type BaseEditor, type Descendant, type BaseRange as SlateBaseRange } from 'slate'
import { type ReactEditor } from 'slate-react'

import { type EmojiNS, type RichTextEditorMakerNS } from '../../components'
import { type TableElementNS } from '../../components/rich-text-editor-maker/elements/table/types'

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
    tableStyle?: TableElementNS.TableStyles
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
    found?: boolean
  }

  interface CustomText extends Marks {
    text: string
  }

  interface BaseRange extends SlateBaseRange {
    found?: boolean
  }

  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
    BaseRange: CustomBaseRange
  }
}
