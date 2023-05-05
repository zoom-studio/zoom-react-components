import React, { FC, ReactNode, useMemo } from 'react'

import { Descendant, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, withReact } from 'slate-react'

import { withCorrectVoidBehavior, withInlineNodes } from './plugins'
import { RichTextEditorMakerNS } from './types'

export namespace RichTextEditorMakerProviderNS {
  export interface ChildrenCallbackParams {
    providerEditor: RichTextEditorMakerNS.Editor
  }

  export interface Props {
    defaultValue?: Descendant[]
    children: (params: ChildrenCallbackParams) => ReactNode
  }
}

export const RichTextEditorMakerProvider: FC<RichTextEditorMakerProviderNS.Props> = ({
  children,
  defaultValue = [{ type: 'paragraph', children: [{ text: 'A line of text in a paragraph.' }] }],
}) => {
  const providerEditor = useMemo(
    () => withHistory(withCorrectVoidBehavior(withInlineNodes(withReact(createEditor())))),
    [],
  )

  const handleOnChange = (value: Descendant[]) => {
    localStorage.setItem('editor-value', JSON.stringify(value))
  }

  const getValue = (): Descendant[] => {
    const storedValue = localStorage.getItem('editor-value')
    return storedValue ? JSON.parse(storedValue) : defaultValue
  }

  return (
    <Slate editor={providerEditor} value={getValue()} onChange={handleOnChange}>
      {children({ providerEditor })}
    </Slate>
  )
}
