import React, { FC } from 'react'

import { ContentState } from 'draft-js'

import { Emoji, EmojiNS } from '../..'

export namespace EmojiComponentNS {
  export interface Props {
    entityKey: string
    contentState: ContentState
    children: string
  }
}

export const EmojiComponent: FC<EmojiComponentNS.Props> = ({
  contentState,
  entityKey,
  children,
}) => {
  const emojiName = contentState.getEntity(entityKey).getData().name as EmojiNS.Emojis.Names

  return (
    <Emoji asSpan name={emojiName} className="zoomrc-rich-text-editor-emoji-container">
      {children}
    </Emoji>
  )
}
