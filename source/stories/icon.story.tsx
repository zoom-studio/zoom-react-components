import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Icon, type IconNS } from '..'
import { ListStory, StoryPlayground } from './components'
import { color } from '../utils'
import { ICON_NAMES } from '../components/icon/constants/icon-names'

export default {
  title: 'Icon/Material icons',
  component: Icon,
  args: {
    name: 'lunch_dining',
  },
} as Meta<typeof Icon>

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

export const Playground: FC<IconNS.Props> = props => {
  return (
    <StoryPlayground
      component={Icon}
      props={{ ...props, style: { color: color({ source: 'text' }), fontSize: 50 } }}
    />
  )
}
