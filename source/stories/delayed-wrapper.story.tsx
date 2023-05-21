import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { DelayedWrapper, DelayedWrapperNS, Spin, Title } from '../components'
import { color } from '../utils'
import { StoryPlayground } from './components'

export default {
  title: 'Utility/Delayed wrapper',
  component: DelayedWrapper,
  args: {
    timeout: 2000,
    children: (
      <Title h1 style={{ color: color({ source: 'text' }) }}>
        This content showed after the delay
      </Title>
    ),
    loader: <Spin />,
  },
} as ComponentMeta<typeof DelayedWrapper>

export const Playground: FC<DelayedWrapperNS.Props> = props => {
  return <StoryPlayground component={DelayedWrapper} props={props} />
}
