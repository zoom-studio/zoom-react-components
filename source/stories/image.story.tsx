import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Image, ImageNS } from '../components'
import { StoryPlayground } from './components'

export default {
  title: 'Data display/Image',
  component: Image,
  args: {
    src: 'https://picsum.photos/200/300',
    alt: 'Sample image',
    lazy: true,
  },
} as ComponentMeta<typeof Image>

export const Playground: FC<ImageNS.Props> = props => {
  return <StoryPlayground component={Image} props={props} />
}
