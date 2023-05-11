import { Transforms } from 'slate'

import { RichTextEditorMakerNS } from '../types'

export const withSoftBreak = (editor: RichTextEditorMakerNS.Editor) => {
  editor.insertBreak = () => {
    Transforms.insertNodes(editor, { type: 'paragraph', children: [{ text: '' }] })
  }

  return editor
}
