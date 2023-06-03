import React, { type FC, type ReactNode } from 'react'

import { type RenderElementProps, useFocused, useSelected } from 'slate-react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'
import { useEditorContext } from '../utils'

export namespace MentionElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const MentionElement: FC<MentionElementNS.Props> = ({ attributes, children, element }) => {
  const { readonly } = useEditorContext()
  const selected = useSelected()
  const focused = useFocused()

  const { mentionInfo } = element

  const classes = classNames('editor-mention', {
    focused: selected && focused && !readonly,
  })

  return (
    <span className={classes} {...attributes} contentEditable={false}>
      @{mentionInfo?.displayName}
      {children}
    </span>
  )
}
