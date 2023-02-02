import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { List, ListNS } from '../components'
import { StoryPlayground } from './components'

export default {
  title: 'Data display/List',
  component: List,
  args: {},
} as ComponentMeta<typeof List>

export const Playground: FC<ListNS.Props> = props => {
  return <StoryPlayground component={List} props={props} />
}
