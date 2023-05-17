import { Editor, Element, Point, Range } from 'slate'
import { RichTextEditorMakerNS } from '../types'

export const withTables = (editor: RichTextEditorMakerNS.Editor) => {
  const { deleteBackward, deleteForward, insertBreak } = editor

  editor.deleteBackward = unit => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: node =>
          !Editor.isEditor(node) && Element.isElement(node) && node.type === 'table-cell',
      })

      if (cell) {
        const [, cellPath] = cell
        const start = Editor.start(editor, cellPath)

        if (Point.equals(selection.anchor, start)) {
          return
        }
      }
    }

    deleteBackward(unit)
  }

  editor.deleteForward = unit => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: node =>
          !Editor.isEditor(node) && Element.isElement(node) && node.type === 'table-cell',
      })

      if (cell) {
        const [, cellPath] = cell
        const end = Editor.end(editor, cellPath)

        if (Point.equals(selection.anchor, end)) {
          return
        }
      }
    }

    deleteForward(unit)
  }

  editor.insertBreak = () => {
    const { selection } = editor

    if (selection) {
      const [table] = Editor.nodes(editor, {
        match: node => !Editor.isEditor(node) && Element.isElement(node) && node.type === 'table',
      })

      if (table) {
        return
      }
    }

    insertBreak()
  }

  return editor
}
