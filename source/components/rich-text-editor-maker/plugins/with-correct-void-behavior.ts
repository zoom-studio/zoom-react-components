import { Editor, Element, Node, Path, Range, Transforms } from 'slate'

import { RichTextEditorMakerNS } from '../types'

export const withCorrectVoidBehavior = (editor: RichTextEditorMakerNS.Editor) => {
  const { deleteBackward, insertBreak } = editor

  editor.insertBreak = () => {
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return insertBreak()
    }
    const selectedNodePath = Path.parent(editor.selection.anchor.path)
    const selectedNode = Node.get(editor, selectedNodePath)
    if (Editor.isVoid(editor, <Element>selectedNode)) {
      Editor.insertNode(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
      })
      return
    }
    insertBreak()
  }

  editor.deleteBackward = unit => {
    if (
      !editor.selection ||
      !Range.isCollapsed(editor.selection) ||
      editor.selection.anchor.offset !== 0
    ) {
      return deleteBackward(unit)
    }
    const parentPath = Path.parent(editor.selection.anchor.path)
    const parentNode = Node.get(editor, parentPath)
    const parentIsEmpty = Node.string(parentNode).length === 0
    if (parentIsEmpty && Path.hasPrevious(parentPath)) {
      const prevNodePath = Path.previous(parentPath)
      const prevNode = Node.get(editor, prevNodePath)
      if (Editor.isVoid(editor, <Element>prevNode)) {
        return Transforms.removeNodes(editor)
      }
    }
    deleteBackward(unit)
  }

  return editor
}
