import { ListType, withLists as createWithLists, withListsReact } from '@prezly/slate-lists'
import { Element } from 'slate'

import { RichTextEditorMakerNS } from '../types'

const withListsPlugin = createWithLists({
  isConvertibleToListTextNode: node => Element.isElementType(node, 'paragraph'),
  isDefaultTextNode: node => Element.isElementType(node, 'paragraph'),
  createListItemNode: (props = {}) => ({ children: [{ text: '' }], ...props, type: 'list-item' }),
  isListItemNode: node => Element.isElementType(node, 'list-item'),
  isListItemTextNode: node => Element.isElementType(node, 'list-item-text'),
  isListNode(node, type) {
    if (type) {
      return Element.isElementType(node, type)
    }
    return (
      Element.isElementType(node, 'ordered-list') || Element.isElementType(node, 'unordered-list')
    )
  },
  createDefaultTextNode: (props = {}) => ({
    children: [{ text: '' }],
    ...props,
    type: 'paragraph',
  }),
  createListNode: (type = ListType.UNORDERED, props = {}) => ({
    children: [{ text: '' }],
    ...props,
    type: type === ListType.ORDERED ? 'ordered-list' : 'unordered-list',
  }),
  createListItemTextNode: (props = {}) => ({
    children: [{ text: '' }],
    ...props,
    type: 'list-item-text',
  }),
})

export const withLists = (editor: RichTextEditorMakerNS.Editor) => {
  return withListsReact(withListsPlugin(editor))
}
