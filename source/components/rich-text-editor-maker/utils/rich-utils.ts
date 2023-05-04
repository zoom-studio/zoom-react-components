import { cloneDeep } from 'lodash'
import { BasePoint, BaseRange, Editor, Element, Range as SlateRange, Text, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { Range, UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils'

import { RichTextEditorMakerNS } from '../..'

export namespace RichUtilsNS {
  export interface Params {
    editor: RichTextEditorMakerNS.Editor
    noFollowedLink: UseObjectedStateNS.ReturnType<boolean>
    blankedLink: UseObjectedStateNS.ReturnType<boolean>
    linkURL: UseObjectedStateNS.ReturnType<string>
  }

  export interface GetCurrentWordReturnType {
    currentWord: string
    currentRange: BaseRange
  }
}

export class RichUtils {
  editor!: RichTextEditorMakerNS.Editor
  noFollowedLink!: UseObjectedStateNS.ReturnType<boolean>
  blankedLink!: UseObjectedStateNS.ReturnType<boolean>
  linkURL!: UseObjectedStateNS.ReturnType<string>
  wordRegExp = /(\S+)/g

  constructor(params: RichUtilsNS.Params) {
    this.editor = params.editor
    this.noFollowedLink = params.noFollowedLink
    this.blankedLink = params.blankedLink
    this.linkURL = params.linkURL
  }

  private readonly getHeadingType = (
    headingLevel: Range<1, 5>,
  ): RichTextEditorMakerNS.ElementTypes => {
    return headingLevel === 1 ? 'h1' : headingLevel === 2 ? 'h2' : headingLevel === 3 ? 'h3' : 'h4'
  }

  private readonly getLeftChar = (point: BasePoint): string => {
    const end = SlateRange.end(this.editor.selection as SlateRange)
    return Editor.string(this.editor, {
      anchor: {
        path: end.path,
        offset: point.offset - 1,
      },
      focus: {
        path: end.path,
        offset: point.offset,
      },
    })
  }

  private readonly getRightChar = (point: BasePoint): string => {
    const end = SlateRange.end(this.editor.selection as SlateRange)
    return Editor.string(this.editor, {
      anchor: {
        path: end.path,
        offset: point.offset,
      },
      focus: {
        path: end.path,
        offset: point.offset + 1,
      },
    })
  }

  private readonly getCurrentWord = (): RichUtilsNS.GetCurrentWordReturnType | null => {
    const { selection } = this.editor

    if (!selection) {
      return null
    }

    const end = SlateRange.end(selection)
    let currentWord = ''
    const currentPosition = cloneDeep(end)
    let startOffset = end.offset
    let endOffset = end.offset

    while (
      currentPosition.offset >= 0 &&
      this.getLeftChar(currentPosition).match(this.wordRegExp)
    ) {
      currentWord = this.getLeftChar(currentPosition) + currentWord
      startOffset = currentPosition.offset - 1
      currentPosition.offset--
    }

    currentPosition.offset = end.offset
    while (currentWord.length && this.getRightChar(currentPosition).match(this.wordRegExp)) {
      currentWord += this.getRightChar(currentPosition)
      endOffset = currentPosition.offset + 1
      currentPosition.offset++
    }

    const currentRange: SlateRange = {
      anchor: {
        path: end.path,
        offset: startOffset,
      },
      focus: {
        path: end.path,
        offset: endOffset,
      },
    }

    return {
      currentWord,
      currentRange,
    }
  }

  private readonly getLocationToApplyMarks = (): BaseRange | undefined => {
    if (!this.isRangeSelected()) {
      const currentWord = this.getCurrentWord()
      if (currentWord?.currentWord) {
        return currentWord.currentRange
      }
    }
  }

  focusEditor = (): void => {
    ReactEditor.focus(this.editor)
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
    Transforms.insertNodes(this.editor, [{ type: 'table', children: [{ text: '' }], tableInfo }])
    this.insertParagraph()
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

  resetLinkInfo = (): void => {
    this.linkURL.set('')
    this.noFollowedLink.set(false)
    this.blankedLink.set(false)
    this.focusEditor()
  }

  setLinkInfo = ({ url, noFollow, openInNewTab }: RichTextEditorMakerNS.LinkInfo): void => {
    this.linkURL.set(url)
    this.noFollowedLink.set(!!noFollow)
    this.blankedLink.set(!!openInNewTab)
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
  }

  insertParagraph = (text = ''): void => {
    Transforms.insertNodes(this.editor, {
      type: 'paragraph',
      children: [{ text }],
    })
  }

  insertRule = (): void => {
    Transforms.insertNodes(this.editor, [{ type: 'rule', children: [{ text: '' }] }])
    this.insertParagraph()
  }

  insertImage = (imageInfo: RichTextEditorMakerNS.ImageInfo) => {
    this.insertParagraph()
    Transforms.insertNodes(this.editor, [{ type: 'image', children: [{ text: '' }], imageInfo }])
    this.insertParagraph()
  }

  insertVideo = (videoInfo: RichTextEditorMakerNS.VideoInfo) => {
    this.insertParagraph()
    Transforms.insertNodes(this.editor, [{ type: 'video', children: [{ text: '' }], videoInfo }])
    this.insertParagraph()
  }

  insertFile = (fileInfo: RichTextEditorMakerNS.FileInfo) => {
    this.insertParagraph()
    Transforms.insertNodes(this.editor, [{ type: 'file', children: [{ text: '' }], fileInfo }])
    this.insertParagraph()
  }
}
