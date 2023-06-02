import { Editor, Element, Path, Point, Range } from 'slate'

import { type RichTextEditorMakerNS } from '../types'

export const withTables = (editor: RichTextEditorMakerNS.Editor) => {
  const { deleteBackward, deleteForward } = editor

  editor.deleteBackward = unit => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      let previousPath: Path | undefined

      try {
        previousPath = Path.previous(Path.parent(selection.anchor.path))
      } catch (error) {}

      if (previousPath) {
        const [prevNode] = Editor.nodes(editor, {
          match: node => Element.isElement(node) && node.type === 'table',
          at: previousPath,
        })

        if (prevNode && Element.isElement(prevNode?.[0]) && prevNode?.[0].type === 'table') {
          return
        }
      }

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
      let nextPath: Path | undefined

      try {
        nextPath = Path.next(Path.parent(selection.anchor.path))
      } catch (error) {}

      if (nextPath) {
        const [nextNode] = Editor.nodes(editor, {
          match: node => Element.isElement(node) && node.type === 'table',
          at: nextPath,
        })

        if (nextNode && Element.isElement(nextNode?.[0]) && nextNode?.[0].type === 'table') {
          return
        }
      }

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

  return editor
}
