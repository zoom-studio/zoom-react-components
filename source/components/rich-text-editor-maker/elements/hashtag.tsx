import React, { type FC, type ReactNode } from 'react'

import { type RenderElementProps, useFocused, useSelected } from 'slate-react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'
import { useEditorContext } from '../utils'

export namespace HashtagElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const HashtagElement: FC<HashtagElementNS.Props> = ({ attributes, children, element }) => {
  const { readonly } = useEditorContext()
  const selected = useSelected()
  const focused = useFocused()

  const { hashtagInfo } = element

  const classes = classNames('editor-hashtag', {
    focused: selected && focused && !readonly,
  })

  return (
    <span className={classes} {...attributes} contentEditable={false}>
      {hashtagInfo?.displayName?.[0] === '#' ? '' : '#'}
      {hashtagInfo?.displayName}
      {children}
    </span>
  )
}
