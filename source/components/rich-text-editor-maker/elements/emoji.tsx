import React, { type FC, type ReactNode } from 'react'

import { type RenderElementProps, useFocused, useSelected } from 'slate-react'

import { Emoji } from '../..'
import { classNames } from '@zoom-studio/zoom-js-ts-utils'
import { useEditorContext } from '../utils'

export namespace EmojiElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const EmojiElement: FC<EmojiElementNS.Props> = ({ attributes, children, element }) => {
  const { readonly } = useEditorContext()
  const selected = useSelected()
  const focused = useFocused()

  const { emojiName } = element

  const classes = classNames('editor-emoji', {
    focused: selected && focused && !readonly,
  })

  return (
    <span className={classes} {...attributes} contentEditable={false}>
      {emojiName && <Emoji name={emojiName} />}
      {children}
    </span>
  )
}
