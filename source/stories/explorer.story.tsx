import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Explorer, ExplorerNS } from '../components'
import { StoryPlayground } from './components'
import { generateExplorerFiles } from '../fixtures'

export default {
  title: 'Data display/Explorer',
  component: Explorer,
  args: {
    files: generateExplorerFiles(100),
    loading: true,
  },
} as ComponentMeta<typeof Explorer>

export const Playground: FC<ExplorerNS.Props> = props => {
  return <StoryPlayground component={Explorer} props={props} />
}
