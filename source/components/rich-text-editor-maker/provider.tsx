import React, { FC, ReactNode, useMemo } from 'react'

import { Descendant, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, withReact } from 'slate-react'

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
  const providerEditor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={providerEditor} value={defaultValue}>
      {children({ providerEditor })}
    </Slate>
  )
}
