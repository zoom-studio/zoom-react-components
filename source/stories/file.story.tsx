import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { File, FileNS } from '../components'
import { StoryPlayground } from './components'

export default {
  title: 'Data display/File',
  component: File,
  args: {},
} as ComponentMeta<typeof File>

export const Playground: FC<FileNS.Props> = props => {
  return <StoryPlayground component={File} props={props} />
}
