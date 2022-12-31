import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Emoji, EmojiNS } from '../components'
import { StoryPlayground, ListStory } from './components'
import { EMOJI_NAMES } from '../components/emoji/constants'

export default {
  title: 'Icon/Emoji',
  component: Emoji,
  args: {
    name: 'ZZZ',
  },
} as ComponentMeta<typeof Emoji>

export const Playground: FC<EmojiNS.Props> = props => {
  return <StoryPlayground component={Emoji} props={props} />
}

export const AllEmojis: FC = () => {
  return (
    <ListStory
      component={Emoji}
      nameProp="name"
      props={EMOJI_NAMES.map(name => ({ name }))}
      maximinRenderedItems={100}
    />
  )
}
