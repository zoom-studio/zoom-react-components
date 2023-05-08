import React, { FC, ReactNode } from 'react'

import { RenderElementProps, useFocused, useSelected } from 'slate-react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

export namespace MentionElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const MentionElement: FC<MentionElementNS.Props> = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()

  const { mentionInfo } = element

  const classes = classNames('editor-mention', {
    focused: selected && focused,
  })

  return (
    <span className={classes} {...attributes} contentEditable={false}>
      @{mentionInfo?.displayName}
      {children}
    </span>
  )
}
