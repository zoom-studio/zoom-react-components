import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Avatar, AvatarNS } from '../components'
import { StoryPlayground } from './components'

export default {
  title: 'Data display/Image',
  component: Avatar,
  args: {},
} as ComponentMeta<typeof Avatar>

export const Playground: FC<AvatarNS.Props> = props => {
  return <StoryPlayground component={Avatar} props={props} />
}
