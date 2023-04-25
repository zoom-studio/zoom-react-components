import React, { forwardRef } from 'react'

import Editor from '@draft-js-plugins/editor'

import { RichTextEditorMakerNS } from './types'

type CB = RichTextEditorMakerNS.ChildrenCallback

export const RichTextEditorMaker = forwardRef<Editor, RichTextEditorMakerNS.Props>(
  ({ children, placeholder }, reference) => {
    const combineHandlers = (): CB => ({
      renderEditor,
    })

    const renderEditor: CB['renderEditor'] = () => {
      return <></>
    }

    return <>{typeof children === 'function' ? children(combineHandlers()) : children}</>
  },
)

export type { RichTextEditorMakerNS } from './types'
