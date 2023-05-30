import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { SVGIcon, SVGIconNS } from '..'
import { ListStory, StoryPlayground } from './components'

export default {
  title: 'Icon/SVG icon',
  component: SVGIcon,
  args: {
    name: 'empty-box',
  },
} as Meta<typeof SVGIcon>

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

export const Playground: FC<SVGIconNS.Props> = props => {
  return <StoryPlayground component={SVGIcon} props={props} />
}
