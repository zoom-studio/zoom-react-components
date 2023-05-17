import React, {
  Dispatch,
  FC,
  KeyboardEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react'

import { onKeyDown } from '@prezly/slate-lists'
import { useFutureEffect } from '@zoom-studio/zoom-js-ts-utils'
import { Descendant, createEditor } from 'slate'
import { withHistory, HistoryEditor } from 'slate-history'
import { Slate, withReact } from 'slate-react'

import {
  withCorrectVoidBehavior,
  withInlineNodes,
  withLists,
  withPasteURL,
  withSoftBreak,
} from './plugins'
import { RichTextEditorMakerNS } from './types'
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
  }
}

export const EditorContext = createContext<RichTextEditorMakerProviderNS.ProviderValue>({})

export const RichTextEditorMakerProvider: FC<RichTextEditorMakerProviderNS.Props> = ({
  defaultValue = [{ type: 'paragraph', children: [{ text: 'A line of text in a paragraph.' }] }],
  children,
  enableMention,
  enableHashtag,
}) => {
  const [editorValue, setEditorValue] = useState<Descendant[]>(defaultValue ?? [])
  const providerEditor = useMemo(
    () =>
      // prettier-ignore
      withHistory(
        withLists(
          // withTables(
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
          // ),
        ),
      ),
    [],
  )

  const mention = useMention({ editor: providerEditor, enableMention })
  const hashtag = useHashtag({ editor: providerEditor, enableHashtag })

  const storeEditorValue = (value: Descendant[]) => {
    localStorage.setItem('editor-value', JSON.stringify(value))
  }

  const handleOnChange = (value: Descendant[]) => {
    setEditorValue(value)
    mention.manageMentionOnChange()
    hashtag.manageHashtagOnChange()
    storeEditorValue(value)
  }

  const getValue = (): Descendant[] => {
    const storedValue = localStorage.getItem('editor-value')
    return storedValue ? JSON.parse(storedValue) : editorValue
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
    storeEditorValue(editorValue)
  }, [editorValue])

  return (
    <Slate editor={providerEditor} value={getValue()} onChange={handleOnChange}>
      <EditorContext.Provider
        value={{
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
