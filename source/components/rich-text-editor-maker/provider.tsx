import React, { FC, KeyboardEvent, ReactNode, createContext, useMemo } from 'react'

import { Descendant, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, withReact } from 'slate-react'

import { useHashtag, useMention, withCorrectVoidBehavior, withInlineNodes } from './plugins'
import { RichTextEditorMakerNS } from './types'

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
    hashtagify?: boolean
    mentionify?: boolean
  }

  export interface ProviderValue
    extends Pick<Props, 'enableMention' | 'enableHashtag' | 'hashtagify' | 'mentionify'> {
    mention?: ReturnType<typeof useMention>
    hashtag?: ReturnType<typeof useHashtag>
  }
}

export const EditorContext = createContext<RichTextEditorMakerProviderNS.ProviderValue>({})

export const RichTextEditorMakerProvider: FC<RichTextEditorMakerProviderNS.Props> = ({
  defaultValue = [{ type: 'paragraph', children: [{ text: 'A line of text in a paragraph.' }] }],
  hashtagify = true,
  mentionify,
  children,
  enableMention,
  enableHashtag,
}) => {
  const providerEditor = useMemo(
    () =>
      // prettier-ignore
      withHistory(
        withCorrectVoidBehavior(
          withInlineNodes(
            withReact(
              createEditor()
            )
          )
        ),
      ),
    [],
  )

  const mention = useMention({ editor: providerEditor, enableMention })
  const hashtag = useHashtag({ editor: providerEditor, enableHashtag })

  const handleOnChange = (value: Descendant[]) => {
    mention.manageMentionOnChange()
    hashtag.manageHashtagOnChange()
    localStorage.setItem('editor-value', JSON.stringify(value))
  }

  const getValue = (): Descendant[] => {
    const storedValue = localStorage.getItem('editor-value')
    return storedValue ? JSON.parse(storedValue) : defaultValue
  }

  return (
    <Slate editor={providerEditor} value={getValue()} onChange={handleOnChange}>
      <EditorContext.Provider
        value={{ mention, enableMention, enableHashtag, hashtag, hashtagify, mentionify }}
      >
        {children({ providerEditor, mention, hashtag })}
      </EditorContext.Provider>
    </Slate>
  )
}
