import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { EmojiPicker, EmojiPickerNs } from '../components'
import { StoryPlayground } from './components'

export default {
  title: 'Emoji/Emoji picker',
  component: EmojiPicker,
  args: {
    containerProps: {},
  },
} as ComponentMeta<typeof EmojiPicker>

export const Playground: FC<EmojiPickerNs.Props> = props => {
  return <StoryPlayground component={EmojiPicker} props={props} />
}
