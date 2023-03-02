import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Tab, TabNS } from '../components'
import { StoryPlayground } from './components'

export default {
  title: 'Navigation/Tab',
  component: Tab,
  args: {},
} as ComponentMeta<typeof Tab>

export const Playground: FC<TabNS.Props> = props => {
  return <StoryPlayground component={Tab} props={props} />
}
