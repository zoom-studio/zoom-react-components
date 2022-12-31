import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { SVGIcon, SVGIconNS } from '..'
import { ListStory, StoryPlayground } from './components'

export default {
  title: 'Icon/SVG icon',
  component: SVGIcon,
  args: {
    name: 'empty-box',
  },
} as ComponentMeta<typeof SVGIcon>

export const Playground: FC<SVGIconNS.Props> = props => {
  return <StoryPlayground component={SVGIcon} props={props} />
}

export const AllSVGIcons: FC = () => {
  return (
    <ListStory
      component={SVGIcon}
      nameProp="name"
      props={SVGIconNS.SVGIconNames.map(name => ({ name }))}
      maximinRenderedItems={200}
    />
  )
}
