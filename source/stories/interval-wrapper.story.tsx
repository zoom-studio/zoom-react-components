import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { IntervalWrapper, IntervalWrapperNS, Spin, Title } from '../components'
import { StoryPlayground } from './components'
import { color } from '../utils'

export default {
  title: 'Utility/Interval wrapper',
  component: IntervalWrapper,
  args: {
    interval: 1000,
    immediateReloadDelay: 100,
    children: (
      <Title h1 style={{ color: color({ source: 'text' }) }}>
        This content showed after the interval passed
      </Title>
    ),
    loader: <Spin />,
    strategy: 'toggle',
  },
} as ComponentMeta<typeof IntervalWrapper>

export const Playground: FC<IntervalWrapperNS.Props> = props => {
  return <StoryPlayground component={IntervalWrapper} props={props} />
}
