import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { IntervalWrapper, type IntervalWrapperNS, Spin, Title } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { color } from '../utils'

const children = (
  <Title h1 style={{ color: color({ source: 'text' }) }}>
    This content showed after the interval passed
  </Title>
)

const loader = <Spin />

export default {
  title: 'Utility/Interval wrapper',
  component: IntervalWrapper,
  args: {
    interval: 1000,
    immediateReloadDelay: 100,
    children,
    loader,
    strategy: 'toggle',
  },
} as Meta<typeof IntervalWrapper>

export const Strategies = () => {
  return (
    <CommonStory
      component={IntervalWrapper}
      stories={[
        {
          group: [
            { name: 'Toggle strategy (Default)', props: { children, loader, interval: 1000 } },
            {
              name: 'Immediate reload strategy',
              props: {
                children,
                loader,
                interval: 700,
                strategy: 'immediate-reload',
                immediateReloadDelay: 200,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<IntervalWrapperNS.Props> = props => {
  return <StoryPlayground component={IntervalWrapper} props={props} />
}
