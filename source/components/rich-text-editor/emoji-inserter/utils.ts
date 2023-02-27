import { Dispatch, SetStateAction } from 'react'

import { DraftDecorator, EditorState, Modifier } from 'draft-js'

import { EmojiNS } from '../..'

export const findEmojiEntities: DraftDecorator['strategy'] = (
  contentBlock,
  callback,
  contentState,
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'EMOJI'
  }, callback)
}

export const createEmoji = (
  editorState: EditorState,
  setEditorState: Dispatch<SetStateAction<EditorState>>,
  emojiName: EmojiNS.Emojis.Names,
  focusEditor: () => void,
) => {
  const contentState = editorState
    .getCurrentContent()
    .createEntity('EMOJI', 'IMMUTABLE', { name: emojiName })
  const selection = editorState.getSelection()
  const entityKey = contentState.getLastCreatedEntityKey()
  const newContentState = Modifier.insertText(contentState, selection, ' ', undefined, entityKey)
  setEditorState(EditorState.push(editorState, newContentState, 'apply-entity'))
  focusEditor()
}
