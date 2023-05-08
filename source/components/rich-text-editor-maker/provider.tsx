import React, { FC, KeyboardEvent, ReactNode, createContext, useMemo } from 'react'

import { Descendant, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, withReact } from 'slate-react'

import { useMention, withCorrectVoidBehavior, withInlineNodes } from './plugins'
import { RichTextEditorMakerNS } from './types'

export namespace RichTextEditorMakerProviderNS {
  export interface ChildrenCallbackParams {
    providerEditor: RichTextEditorMakerNS.Editor
    mention: Omit<ReturnType<typeof useMention>, 'manageMentionOnChange'>
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

  export interface Props {
    defaultValue?: Descendant[]
    children: (params: ChildrenCallbackParams) => ReactNode
    enableMention?: MentionSettings
  }

  export interface ProviderValue extends Pick<Props, 'enableMention'> {
    mention?: ReturnType<typeof useMention>
  }
}

export const EditorContext = createContext<RichTextEditorMakerProviderNS.ProviderValue>({})

export const RichTextEditorMakerProvider: FC<RichTextEditorMakerProviderNS.Props> = ({
  children,
  defaultValue = [{ type: 'paragraph', children: [{ text: 'A line of text in a paragraph.' }] }],
  enableMention,
}) => {
  const providerEditor = useMemo(
    () => withHistory(withCorrectVoidBehavior(withInlineNodes(withReact(createEditor())))),
    [],
  )

  const mention = useMention({ editor: providerEditor, enableMention })

  const handleOnChange = (value: Descendant[]) => {
    mention.manageMentionOnChange()
    localStorage.setItem('editor-value', JSON.stringify(value))
  }

  const getValue = (): Descendant[] => {
    const storedValue = localStorage.getItem('editor-value')
    return storedValue ? JSON.parse(storedValue) : defaultValue
  }

  return (
    <Slate editor={providerEditor} value={getValue()} onChange={handleOnChange}>
      <EditorContext.Provider value={{ mention, enableMention }}>
        {children({ providerEditor, mention })}
      </EditorContext.Provider>
    </Slate>
  )
}
