import React, {
  type Dispatch,
  type FC,
  type KeyboardEvent,
  type ReactNode,
  type SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react'

import { onKeyDown } from '@prezly/slate-lists'
import { useFutureEffect } from '@zoom-studio/zoom-js-ts-utils'
import { type Descendant, createEditor } from 'slate'
import { HistoryEditor, withHistory } from 'slate-history'
import { Slate, withReact } from 'slate-react'

import {
  withCorrectVoidBehavior,
  withInlineNodes,
  withLists,
  withPasteURL,
  withSoftBreak,
  withTables,
} from './plugins'
import { type RichTextEditorMakerNS } from './types'
import { useHashtag, useMention } from './utils'

export namespace RichTextEditorMakerProviderNS {
  export interface ChildrenCallbackParams {
    providerEditor: RichTextEditorMakerNS.Editor
    mention: Omit<ReturnType<typeof useMention>, 'manageMentionOnChange'>
    hashtag: Omit<ReturnType<typeof useHashtag>, 'manageHashtagOnChange'>
  }

  export interface MentionKeyboardEvent {
    mention: ReturnType<typeof useMention>
    evt: KeyboardEvent<HTMLDivElement>
    handlers: RichTextEditorMakerNS.ChildrenCallback
  }

  export interface MentionSettings {
    usernames: string[]
    restrictResult?: number
    usernameRegex?: RegExp
    onArrowDown?: (evt: MentionKeyboardEvent) => void
    onArrowUp?: (evt: MentionKeyboardEvent) => void
    onTab?: (evt: MentionKeyboardEvent) => void
    onEnter?: (evt: MentionKeyboardEvent) => void
    onEscape?: (evt: MentionKeyboardEvent) => void
  }

  export interface HashtagKeyboardEvent {
    hashtag: ReturnType<typeof useHashtag>
    evt: KeyboardEvent<HTMLDivElement>
    handlers: RichTextEditorMakerNS.ChildrenCallback
  }

  export interface HashtagSettings {
    hashtags: string[]
    restrictResult?: number
    hashtagRegex?: RegExp
    onArrowDown?: (evt: HashtagKeyboardEvent) => void
    onArrowUp?: (evt: HashtagKeyboardEvent) => void
    onTab?: (evt: HashtagKeyboardEvent) => void
    onEnter?: (evt: HashtagKeyboardEvent) => void
    onEscape?: (evt: HashtagKeyboardEvent) => void
  }

  export interface Props {
    defaultValue?: Descendant[]
    children: (params: ChildrenCallbackParams) => ReactNode
    enableMention?: MentionSettings
    enableHashtag?: HashtagSettings
    saveDraft?: boolean
    id: string
  }

  export interface ProviderValue extends Pick<Props, 'enableMention' | 'enableHashtag'> {
    mention?: ReturnType<typeof useMention>
    hashtag?: ReturnType<typeof useHashtag>
    editorValue?: Descendant[]
    setEditorValue?: Dispatch<SetStateAction<Descendant[]>>
    handleListsOnKeyDown?: (evt: KeyboardEvent<HTMLDivElement>) => void
    undo?: () => void
    redo?: () => void
    editor?: RichTextEditorMakerNS.Editor
    id?: string
  }
}

export const EditorContext = createContext<RichTextEditorMakerProviderNS.ProviderValue>({})

export const RichTextEditorMakerProvider: FC<RichTextEditorMakerProviderNS.Props> = ({
  saveDraft = true,
  id,
  defaultValue,
  children,
  enableMention,
  enableHashtag,
}) => {
  const [editorValue, setEditorValue] = useState<Descendant[]>(
    defaultValue ?? [{ type: 'paragraph', children: [{ text: '' }] }],
  )
  const providerEditor = useMemo(
    () =>
      // prettier-ignore
      withHistory(
        withLists(
          withTables(
            withPasteURL(
              withCorrectVoidBehavior(
                withInlineNodes(
                  withSoftBreak(
                    withReact(
                      createEditor()
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    [],
  )

  const mention = useMention({ editor: providerEditor, enableMention })
  const hashtag = useHashtag({ editor: providerEditor, enableHashtag })

  const localStorageKey = `zoomrc-rich-editor-@-${id}`

  const storeEditorValue = (value: Descendant[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }

  const handleOnChange = (value: Descendant[]) => {
    setEditorValue(value)
    mention.manageMentionOnChange()
    hashtag.manageHashtagOnChange()

    if (saveDraft) {
      storeEditorValue(value)
    }
  }

  const getValue = (): Descendant[] => {
    const storedValue = localStorage.getItem(localStorageKey)

    if (defaultValue || !storedValue || storedValue.length === 0 || !saveDraft) {
      return editorValue
    }

    return JSON.parse(storedValue)
  }

  const handleListsOnKeyDown = (evt: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown(providerEditor, evt)
  }

  const undo = () => {
    HistoryEditor.undo(providerEditor)
  }

  const redo = () => {
    HistoryEditor.redo(providerEditor)
  }

  useFutureEffect(() => {
    if (saveDraft) {
      storeEditorValue(editorValue)
    }
  }, [editorValue])

  return (
    <Slate editor={providerEditor} value={getValue()} onChange={handleOnChange}>
      <EditorContext.Provider
        value={{
          id,
          mention,
          enableMention,
          enableHashtag,
          hashtag,
          editorValue,
          setEditorValue,
          handleListsOnKeyDown,
          redo,
          undo,
          editor: providerEditor,
        }}
      >
        {children({ providerEditor, mention, hashtag })}
      </EditorContext.Provider>
    </Slate>
  )
}
