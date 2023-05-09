import React, { FC, ReactNode } from 'react'

import { RenderElementProps, useFocused, useSelected } from 'slate-react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

export namespace HashtagElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const HashtagElement: FC<HashtagElementNS.Props> = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()

  const { hashtagInfo } = element

  const classes = classNames('editor-hashtag', {
    focused: selected && focused,
  })

  return (
    <span className={classes} {...attributes} contentEditable={false}>
      {hashtagInfo?.displayName?.[0] === '#' ? '' : '#'}
      {hashtagInfo?.displayName}
      {children}
    </span>
  )
}
