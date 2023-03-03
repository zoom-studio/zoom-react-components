import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { ImageEditor, ImageEditorNS } from '../components'
import { image } from '../fixtures'
import { StoryPlayground } from './components'

export default {
  title: 'Data entry/Image editor',
  component: ImageEditor,
  args: {
    src: image(500, 800, 'cats'),
    // aspectRatio: 1,
  },
} as ComponentMeta<typeof ImageEditor>

export const Playground: FC<ImageEditorNS.Props> = props => {
  return <StoryPlayground component={ImageEditor} props={props} />
}
