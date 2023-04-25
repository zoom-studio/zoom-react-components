import { Dispatch, SetStateAction } from 'react'

import { DraftDecorator, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js'

export const findTableEntities: DraftDecorator['strategy'] = (
  contentBlock,
  callback,
  contentState,
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'TABLE'
  }, callback)
}

export const createTable = (
  editorState: EditorState,
  setEditorState: Dispatch<SetStateAction<EditorState>>,
  cols: number,
  rows: number,
  focusEditor: () => void,
) => {
  if (RichUtils.getCurrentBlockType(editorState) === 'TABLE') {
    return null
  }

  let contentState = editorState.getCurrentContent()
  contentState = editorState.getCurrentContent().createEntity('TABLE', 'IMMUTABLE', { cols, rows })
  const entityKey = contentState.getLastCreatedEntityKey()
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
  setEditorState(newEditorState)
  focusEditor()
}
