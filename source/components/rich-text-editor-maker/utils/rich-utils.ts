import { Range, randomString } from '@zoom-studio/zoom-js-ts-utils'
import {
  BaseRange,
  Descendant,
  Editor,
  Element,
  Node,
  NodeMatch,
  Path,
  Range as SlateRange,
  Text,
  Transforms,
} from 'slate'
import { ReactEditor } from 'slate-react'

import { EmojiNS, RichTextEditorMakerNS } from '../..'

import { EditorCurrentWord } from '.'
import { TableElementNS } from '../elements/table/types'
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

  export interface CreateTableRowParams {
    rowIndex: number
    tableInfo: RichTextEditorMakerNS.TableInfo
    tableID: string
  }

  export interface NodeInfo {
    path: Path
    node: Node
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

  private readonly deepFindNode = (match: NodeMatch<Node>): RichUtilsNS.NodeInfo | undefined => {
    const [node] = Array.from(
      Editor.nodes(this.editor, {
        at: {
          anchor: { offset: 0, path: [0, 0] },
          focus: { offset: 0, path: [Number.MAX_SAFE_INTEGER, 0] },
        },
        match,
      }),
    )

    if (node) {
      return {
        node: node[0],
        path: node[1],
      }
    }
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

  private readonly insertNodes = (
    nodes: Parameters<typeof Transforms.insertNodes>[1],
    options?: Parameters<typeof Transforms.insertNodes>[2],
  ): void => {
    const { selection } = this.editor
    const node = selection ? Node.get(this.editor, Path.parent(selection.anchor.path)) : null

    Transforms.insertNodes(this.editor, nodes, {
      ...options,
      at:
        node && selection && Element.isElement(node) && node.type === 'table-cell'
          ? selection.focus.path
          : undefined,
    })

    this.focusEditor()
  }

  private readonly createTableRow = (params: RichUtilsNS.CreateTableRowParams): Descendant => {
    const { rowIndex, tableInfo, tableID } = params

    const cols = tableInfo.cols

    return {
      tableInfo,
      type: 'table-row',
      tableRowIndex: rowIndex,
      id: tableID,
      children: Array.from(Array(cols)).map((_, colIndex) => ({
        tableInfo,
        children: [{ text: '' }],
        type: 'table-cell',
        tableColIndex: colIndex,
        tableRowIndex: rowIndex,
        id: tableID,
      })),
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
    const tableID = 'rich-text-editor-table-'.concat(randomString(30))

    this.insertNodes({
      id: tableID,
      type: 'table',
      children: Array.from(Array(tableInfo.rows)).map((_, rowIndex) =>
        this.createTableRow({
          rowIndex,
          tableID,
          tableInfo,
        }),
      ),
      tableInfo,
    })
  }

  insertTableRow = (
    rowIndexToAppend: number,
    side: TableElementNS.VerticalSide,
    id: string,
  ): void => {
    const table = this.deepFindNode(
      node => Element.isElement(node) && node.type === 'table' && node.id === id,
    )

    if (table) {
      const currentTableInfo = (<Element>table.node).tableInfo!
      const newTableInfo = { ...currentTableInfo, rows: currentTableInfo.rows + 1 }

      const row = this.deepFindNode(
        node =>
          Element.isElement(node) &&
          node.type === 'table-row' &&
          node.tableRowIndex === rowIndexToAppend &&
          node.id === id,
      )

      if (row && Element.isElement(row.node)) {
        const { tableInfo, tableRowIndex, id } = row.node
        const rowsCount = tableInfo!.rows
        const nextRows: RichUtilsNS.NodeInfo[] = []
        const nextRowsCols: RichUtilsNS.NodeInfo[] = []
        const prevRows: RichUtilsNS.NodeInfo[] = []
        const prevRowsCols: RichUtilsNS.NodeInfo[] = []
        const rowCols: RichUtilsNS.NodeInfo[] = []
        const colsCount = tableInfo!.cols

        Array.from(Array(rowsCount)).forEach((_, rowIndex) => {
          const tableRow = this.deepFindNode(
            node =>
              Element.isElement(node) &&
              node.type === 'table-row' &&
              node.tableRowIndex === rowIndex &&
              node.id === id,
          )

          if (tableRow) {
            if (rowIndex > rowIndexToAppend) {
              nextRows.push(tableRow)
            } else if (rowIndex !== rowIndexToAppend) {
              prevRows.push(tableRow)
            }
          }

          Array.from(Array(colsCount)).forEach((_, colIndex) => {
            const rowCol = this.deepFindNode(
              node =>
                Element.isElement(node) &&
                node.type === 'table-cell' &&
                node.tableRowIndex === rowIndex &&
                node.tableColIndex === colIndex &&
                node.id === id,
            )

            if (rowCol) {
              if (rowIndex > rowIndexToAppend) {
                nextRowsCols.push(rowCol)
              } else if (rowIndex !== rowIndexToAppend) {
                prevRowsCols.push(rowCol)
              }
            }
          })
        })

        Array.from(Array(colsCount)).forEach((_, colIndex) => {
          const rowCol = this.deepFindNode(
            node =>
              Element.isElement(node) &&
              node.type === 'table-cell' &&
              node.tableRowIndex === rowIndexToAppend &&
              node.tableColIndex === colIndex &&
              node.id === id,
          )

          if (rowCol) {
            rowCols.push(rowCol)
          }
        })

        prevRows.forEach(prevRow => {
          Transforms.setNodes(this.editor, { tableInfo: newTableInfo }, { at: prevRow.path })
        })

        prevRowsCols.forEach(prevRowCol => {
          Transforms.setNodes(this.editor, { tableInfo: newTableInfo }, { at: prevRowCol.path })
        })

        nextRows.forEach((nextRow, nextRowIndex) => {
          Transforms.setNodes(
            this.editor,
            { tableInfo: newTableInfo, tableRowIndex: nextRowIndex + tableRowIndex! + 2 },
            { at: nextRow.path },
          )
        })

        nextRowsCols.forEach(nextRowCol => {
          Transforms.setNodes(
            this.editor,
            {
              tableInfo: newTableInfo,
              tableRowIndex: (<Element>nextRowCol.node).tableRowIndex! + 1,
            },
            { at: nextRowCol.path },
          )
        })

        rowCols.forEach(rowCol => {
          Transforms.setNodes(
            this.editor,
            {
              tableInfo: newTableInfo,
              tableRowIndex: (<Element>rowCol.node).tableRowIndex! + (side === 'top' ? 1 : 0),
            },
            { at: rowCol.path },
          )
        })

        Transforms.setNodes(
          this.editor,
          {
            tableInfo: newTableInfo,
            tableRowIndex: row.node.tableRowIndex! + (side === 'top' ? 1 : 0),
          },
          { at: row.path },
        )

        Transforms.insertNodes(
          this.editor,
          this.createTableRow({
            rowIndex: side === 'bottom' ? tableRowIndex! + 1 : tableRowIndex!,
            tableID: id!,
            tableInfo: newTableInfo,
          }),
          {
            at: side === 'bottom' ? Path.next(row.path) : row.path,
          },
        )

        Transforms.setNodes(this.editor, { tableInfo: newTableInfo }, { at: table.path })
      }
    }
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
    this.insertNodes({
      type: 'paragraph',
      children: [{ text }],
    })
  }

  insertRule = (): void => {
    this.insertNodes({ type: 'rule', children: [{ text: '' }] })
    this.insertParagraph()
  }

  insertImage = (imageInfo: RichTextEditorMakerNS.ImageInfo) => {
    this.insertParagraph()
    this.insertNodes({ type: 'image', children: [{ text: '' }], imageInfo })
    this.insertParagraph()
  }

  insertVideo = (videoInfo: RichTextEditorMakerNS.VideoInfo) => {
    this.insertParagraph()
    this.insertNodes({ type: 'video', children: [{ text: '' }], videoInfo })
    this.insertParagraph()
  }

  insertFile = (fileInfo: RichTextEditorMakerNS.FileInfo) => {
    this.insertParagraph()
    this.insertNodes({ type: 'file', children: [{ text: '' }], fileInfo })
    this.insertParagraph()
  }

  insertEmoji = (emojiName: EmojiNS.Emojis.Names) => {
    this.insertNodes({ type: 'emoji', children: [{ text: '' }], emojiName })
  }

  insertMention = (mentionInfo: RichTextEditorMakerNS.MentionInfo) => {
    const { context } = this

    if (context?.mention) {
      const { mentionTarget } = context.mention

      if (mentionTarget) {
        Transforms.select(this.editor, mentionTarget)
      }
    }

    this.insertNodes({ type: 'mention', children: [{ text: '' }], mentionInfo })

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

    this.insertNodes({ type: 'hashtag', children: [{ text: '' }], hashtagInfo })

    if (context?.hashtag) {
      const { hashtagTarget, setHashtagTarget } = context.hashtag

      if (hashtagTarget) {
        Transforms.move(this.editor)
        setHashtagTarget?.(undefined)
      }
    }
  }
}
