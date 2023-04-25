import { Dispatch, KeyboardEvent, SetStateAction, useCallback } from 'react'

import { EditorState, getDefaultKeyBinding, RichUtils } from 'draft-js'

export namespace UseEditorKeysNS {
  export interface Params {
    editorState: EditorState
    setEditorState: Dispatch<SetStateAction<EditorState>>
  }
}

export const useEditorKeys = ({ editorState, setEditorState }: UseEditorKeysNS.Params) => {
  const handleKeyCommand = useCallback(
    (command: string, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command)
      if (newState) {
        setEditorState(newState)
        return 'handled'
      }
      return 'not-handled'
    },
    [editorState, setEditorState],
  )

  const mapKeyToEditorCommand = useCallback(
    (evt: KeyboardEvent) => {
      switch (evt.key) {
        case 'Tab': {
          const newEditorState = RichUtils.onTab(evt, editorState, 4)
          if (newEditorState !== editorState) {
            setEditorState(newEditorState)
          }
          return null
        }
      }
      return getDefaultKeyBinding(evt)
    },
    [editorState, setEditorState],
  )

  return { handleKeyCommand, mapKeyToEditorCommand }
}
