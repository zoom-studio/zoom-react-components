import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { ImageEditor, ImageEditorNS } from '../components'
import { StoryPlayground } from './components'
import { image } from '../fixtures'

export default {
  title: 'Data entry/Image editor',
  component: ImageEditor,
  args: {
    src: image(),
  },
} as ComponentMeta<typeof ImageEditor>

export const Playground: FC<ImageEditorNS.Props> = props => {
  return <StoryPlayground component={ImageEditor} props={props} />
}
