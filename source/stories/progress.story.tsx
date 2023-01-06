import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Progress, ProgressNS } from '..'
import { StoryPlayground } from './components'

export default {
  title: 'Data display/Progress',
  component: Progress,
  args: {
    steps: [
      {
        percentage: 25,
        title: 'Some title',
        color: [color => color({ source: 'accent' }), { 30: color => color({ source: 'error' }) }],
      },
      { percentage: 10, color: 'red' },
    ],
  },
} as ComponentMeta<typeof Progress>

export const Playground: FC<ProgressNS.Props> = props => {
  return <StoryPlayground component={Progress} props={props} />
}
