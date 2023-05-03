import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'
import { randomImage } from '@zoom-studio/zoom-js-ts-utils'

import { File, FileNS } from '../components'
import { StoryPlayground } from './components'

export default {
  title: 'Data display/File',
  component: File,
  args: {
    url: randomImage(undefined, undefined, 'cats'),
    fileName: 'some_file_name_which_goes_here_to_show_to_the_user',
    fileSize: 8000,
    fileType: 'avi',
  },
} as ComponentMeta<typeof File>

export const Playground: FC<FileNS.Props> = props => {
  return <StoryPlayground component={File} props={props} />
}
