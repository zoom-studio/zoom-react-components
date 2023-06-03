import React, { forwardRef } from 'react'

import { type Descendant } from 'slate'

import { type BaseComponent } from '../../types'
import { useZoomComponent } from '../../hooks'
import { RichTextEditorMaker } from '..'

export namespace RichTextViewerNS {
  export interface Props extends Omit<BaseComponent, 'children' | 'id'> {
    id: string
    parentId?: string
    value: Descendant[]
  }
}

export const RichTextViewer = forwardRef<HTMLDivElement, RichTextViewerNS.Props>(
  ({ className, containerProps, id, parentId, value }, reference) => {
    const { createClassName } = useZoomComponent('rich-text-viewer')

    const classes = createClassName(className)

    return (
      <div {...containerProps} id={parentId} ref={reference} className={classes}>
        <RichTextEditorMaker.provider readonly id={id} defaultValue={value} saveDraft={false}>
          {({ providerEditor }) => (
            <RichTextEditorMaker editor={providerEditor}>
              {({ renderEditor }) => <>{renderEditor()}</>}
            </RichTextEditorMaker>
          )}
        </RichTextEditorMaker.provider>
      </div>
    )
  },
)
