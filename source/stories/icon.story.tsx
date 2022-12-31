import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Icon, IconNS } from '..'
import { ListStory, StoryPlayground } from './components'
import { color } from '../utils'
import { ICON_NAMES } from '../components/icon/constants/icon-names'

export default {
  title: 'Icon/Icon',
  component: Icon,
  args: {
    name: 'lunch_dining',
  },
} as ComponentMeta<typeof Icon>

export const Playground: FC<IconNS.Props> = props => {
  return (
    <StoryPlayground
      component={Icon}
      props={{ ...props, style: { color: color({ source: 'text' }), fontSize: 50 } }}
    />
  )
}

export const AllIcons: FC = () => {
  return (
    <ListStory
      component={Icon}
      nameProp="name"
      props={ICON_NAMES.map(name => ({ name }))}
      maximinRenderedItems={500}
    />
  )
}
