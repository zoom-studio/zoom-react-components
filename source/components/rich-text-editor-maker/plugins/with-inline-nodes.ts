import { type RichTextEditorMakerNS } from '../types'

export const withInlineNodes = (editor: RichTextEditorMakerNS.Editor) => {
  const { isInline, isVoid, markableVoid } = editor
  const inlineNodes: RichTextEditorMakerNS.ElementTypes[] = ['emoji', 'mention', 'hashtag']

  editor.isInline = element => {
    return inlineNodes.includes(element.type) || isInline(element)
  }

  editor.isVoid = element => {
    return inlineNodes.includes(element.type) || isVoid(element)
  }

  editor.markableVoid = element => {
    return inlineNodes.includes(element.type) || markableVoid(element)
  }

  return editor
}
