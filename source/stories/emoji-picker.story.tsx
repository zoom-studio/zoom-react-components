import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { EmojiPicker, EmojiPickerNS } from '../components'
import { StoryPlayground } from './components'

export default {
  title: 'Emoji/Emoji picker',
  component: EmojiPicker,
  args: {},
} as ComponentMeta<typeof EmojiPicker>

export const Playground: FC<EmojiPickerNS.Props> = props => {
  return <StoryPlayground component={EmojiPicker} props={props} />
}
