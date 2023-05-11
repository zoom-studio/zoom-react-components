import { Range, randomString } from '@zoom-studio/zoom-js-ts-utils'
import { BaseRange, Editor, Element, Range as SlateRange, Text, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import { EmojiNS, RichTextEditorMakerNS } from '../..'

import { EditorCurrentWord } from '.'
import { RichTextEditorMakerProviderNS } from '../provider'

export namespace RichUtilsNS {
  export interface Params {
    editor: RichTextEditorMakerNS.Editor
    editorContext?: Required<RichTextEditorMakerProviderNS.ProviderValue>
  }

  export interface GetCurrentWordReturnType {
    currentWord: string
    currentRange: BaseRange
  }
}

export class RichUtils {
  editor!: RichTextEditorMakerNS.Editor
  currentWord!: EditorCurrentWord
  context?: Required<RichTextEditorMakerProviderNS.ProviderValue>

  constructor(params: RichUtilsNS.Params) {
    this.editor = params.editor
    this.currentWord = new EditorCurrentWord({ editor: params.editor })
    this.context = params.editorContext
  }

  private readonly getHeadingType = (
    headingLevel: Range<1, 5>,
  ): RichTextEditorMakerNS.ElementTypes => {
    return headingLevel === 1 ? 'h1' : headingLevel === 2 ? 'h2' : headingLevel === 3 ? 'h3' : 'h4'
  }

  private readonly getLocationToApplyMarks = (): BaseRange | undefined => {
    if (!this.isRangeSelected()) {
      const currentWord = this.currentWord.getCurrentWord()
      if (currentWord?.currentWord) {
        return currentWord.currentRange
      }
    }
  }

  focusEditor = (): void => {
    ReactEditor.focus(this.editor)
  }

  collapseSelection = (): void => {
    const { selection } = this.editor
    if (!selection || SlateRange.isCollapsed(selection)) {
      return
    }
    this.focusEditor()
    Transforms.setSelection(this.editor, { ...selection, anchor: selection.focus })
  }

  isActive = (elementType: RichTextEditorMakerNS.ElementTypes): boolean => {
    if (RichTextEditorMakerNS.MarkTypes.includes(elementType as RichTextEditorMakerNS.MarkTypes)) {
      return !!Editor.marks(this.editor)?.[elementType as RichTextEditorMakerNS.MarkTypes]
    }

    const { selection } = this.editor

    if (!selection) {
      return false
    }

    const [isActive] = Array.from(
      Editor.nodes(this.editor, {
        at: Editor.unhangRange(this.editor, selection),
        match: node =>
          !Editor.isEditor(node) && Element.isElement(node) && node.type === elementType,
      }),
    )

    return !!isActive
  }

  toggleHeading = (headingLevel: Range<1, 5>) => (): void => {
    Transforms.setNodes(
      this.editor,
      {
        type: this.isActive(this.getHeadingType(headingLevel))
          ? 'normal'
          : this.getHeadingType(headingLevel),
      },
      { match: node => Element.isElement(node) && Editor.isBlock(this.editor, node) },
    )
    this.focusEditor()
  }

  toggleQuote = (): void => {
    Transforms.setNodes(
      this.editor,
      { type: this.isActive('quote') ? 'normal' : 'quote' },
      { match: node => Element.isElement(node) && Editor.isBlock(this.editor, node) },
    )
    this.focusEditor()
  }

  isRangeSelected = (): boolean => {
    const { selection } = this.editor
    if (!selection) {
      return false
    }
    return !SlateRange.isCollapsed(selection)
  }

  toggleBold = (): void => {
    Transforms.setNodes(
      this.editor,
      { bold: !this.isActive('bold') },
      {
        match: node => Text.isText(node),
        split: true,
        at: this.getLocationToApplyMarks(),
      },
    )
    this.focusEditor()
  }

  toggleItalic = (): void => {
    Transforms.setNodes(
      this.editor,
      { italic: !this.isActive('italic') },
      {
        match: node => Text.isText(node),
        split: true,
        at: this.getLocationToApplyMarks(),
      },
    )
    this.focusEditor()
  }

  toggleUnderline = (): void => {
    Transforms.setNodes(
      this.editor,
      { underline: !this.isActive('underline') },
      {
        match: node => Text.isText(node),
        split: true,
        at: this.getLocationToApplyMarks(),
      },
    )
    this.focusEditor()
  }

  toggleHighlight = (): void => {
    Transforms.setNodes(
      this.editor,
      { highlight: !this.isActive('highlight') },
      {
        match: node => Text.isText(node),
        split: true,
        at: this.getLocationToApplyMarks(),
      },
    )
    this.focusEditor()
  }

  toggleStrikethrough = (): void => {
    Transforms.setNodes(
      this.editor,
      { strikethrough: !this.isActive('strikethrough') },
      {
        match: node => Text.isText(node),
        split: true,
        at: this.getLocationToApplyMarks(),
      },
    )
    this.focusEditor()
  }

  insertTable = (tableInfo: RichTextEditorMakerNS.TableInfo): void => {
    this.insertParagraph()
    Transforms.insertNodes(this.editor, [
      {
        type: 'table',
        children: [{ text: '' }],
        tableInfo,
        id: 'zoomrc-rich-text-editor-table-generator-'.concat(randomString(10)),
      },
    ])
    this.insertParagraph()
    this.focusEditor()
  }

  insertLink = (linkInfo: RichTextEditorMakerNS.LinkInfo): void => {
    Transforms.setNodes(
      this.editor,
      { link: true, linkInfo },
      { match: node => Text.isText(node), split: true, at: this.getLocationToApplyMarks() },
    )
    this.focusEditor()
  }

  removeLink = (): void => {
    Transforms.setNodes(this.editor, { link: false }, { match: node => Text.isText(node) })
    this.focusEditor()
  }

  getLinkInfo = (): RichTextEditorMakerNS.LinkInfo | undefined => {
    const currentMark = Editor.marks(this.editor)
    if (!currentMark || !currentMark.link || !currentMark.linkInfo) {
      return undefined
    }
    return currentMark.linkInfo
  }

  toggleList = (listModel: RichTextEditorMakerNS.ListTypes) => (): void => {
    const listTypes: RichTextEditorMakerNS.ElementTypes[] = ['ordered-list', 'unordered-list']
    const isListActive = this.isActive(listModel)

    Transforms.unwrapNodes(this.editor, {
      match: node =>
        !Editor.isEditor(node) && Element.isElement(node) && listTypes.includes(node.type),
      split: true,
    })

    Transforms.setNodes(this.editor, {
      type: isListActive ? 'paragraph' : 'list-item',
    })

    if (!isListActive) {
      Transforms.wrapNodes(this.editor, { type: listModel, children: [] })
    }

    this.focusEditor()
  }

  insertParagraph = (text = ''): void => {
    Transforms.insertNodes(this.editor, {
      type: 'paragraph',
      children: [{ text }],
    })
    this.focusEditor()
  }

  insertRule = (): void => {
    Transforms.insertNodes(this.editor, [{ type: 'rule', children: [{ text: '' }] }])
    this.insertParagraph()
    this.focusEditor()
  }

  insertImage = (imageInfo: RichTextEditorMakerNS.ImageInfo) => {
    this.insertParagraph()
    Transforms.insertNodes(this.editor, [{ type: 'image', children: [{ text: '' }], imageInfo }])
    this.insertParagraph()
    this.focusEditor()
  }

  insertVideo = (videoInfo: RichTextEditorMakerNS.VideoInfo) => {
    this.insertParagraph()
    Transforms.insertNodes(this.editor, [{ type: 'video', children: [{ text: '' }], videoInfo }])
    this.insertParagraph()
    this.focusEditor()
  }

  insertFile = (fileInfo: RichTextEditorMakerNS.FileInfo) => {
    this.insertParagraph()
    Transforms.insertNodes(this.editor, [{ type: 'file', children: [{ text: '' }], fileInfo }])
    this.insertParagraph()
    this.focusEditor()
  }

  insertEmoji = (emojiName: EmojiNS.Emojis.Names) => {
    Transforms.insertNodes(this.editor, [
      {
        type: 'emoji',
        children: [{ text: '' }],
        emojiName,
      },
    ])
    this.focusEditor()
  }

  insertMention = (mentionInfo: RichTextEditorMakerNS.MentionInfo) => {
    const { context } = this

    if (context?.mention) {
      const { mentionTarget } = context.mention

      if (mentionTarget) {
        Transforms.select(this.editor, mentionTarget)
      }
    }

    Transforms.insertNodes(this.editor, {
      type: 'mention',
      children: [{ text: '' }],
      mentionInfo,
    })
    this.focusEditor()

    if (context?.mention) {
      const { mentionTarget, setMentionTarget } = context.mention

      if (mentionTarget) {
        Transforms.move(this.editor)
        setMentionTarget?.(undefined)
      }
    }
  }

  insertHashtag = (hashtagInfo: RichTextEditorMakerNS.HashtagInfo) => {
    const { context } = this

    if (context?.hashtag) {
      const { hashtagTarget } = context.hashtag

      if (hashtagTarget) {
        Transforms.select(this.editor, hashtagTarget)
      }
    }

    Transforms.insertNodes(this.editor, {
      type: 'hashtag',
      children: [{ text: '' }],
      hashtagInfo,
    })
    this.focusEditor()

    if (context?.hashtag) {
      const { hashtagTarget, setHashtagTarget } = context.hashtag

      if (hashtagTarget) {
        Transforms.move(this.editor)
        setHashtagTarget?.(undefined)
      }
    }
  }
}
