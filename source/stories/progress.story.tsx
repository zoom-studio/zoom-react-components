import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Progress, ProgressNS } from '..'
import { StoryPlayground } from './components'

export default {
  title: 'Data display/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>

export const Playground: FC<ProgressNS.Props> = props => {
  return <StoryPlayground component={Progress} props={props} />
}
