import React, { FC, ReactNode } from 'react'

import { Emoji, EmojiNS, Text } from '../../..'

export namespace BannerStoryNS {
  export interface Props {
    title?: ReactNode
    description?: ReactNode
    emoji?: EmojiNS.Emojis.Names
  }
}

export const BannerStory: FC<BannerStoryNS.Props> = ({ description, emoji, title }) => {
  return (
    <div className="banner-story">
      <Text common normal>
        {description}
      </Text>
      <Text bold large>
        {title}
      </Text>
      <Emoji name={emoji || 'smiling face with smiling eyes'} />
    </div>
  )
}
