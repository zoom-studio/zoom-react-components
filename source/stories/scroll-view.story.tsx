import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { ScrollView, ScrollViewNS } from '..'
import { CommonStory, StoryPlayground } from './components'
import { lorem } from '../fixtures'
import { color } from '../utils'

const Children = () => (
  <div style={{ minWidth: 1000, color: color({ source: 'text', tone: 3 }) }}>{lorem(500)}</div>
)

export default {
  title: 'Layout/Scroll view',
  component: ScrollView,
  args: {
    children: <Children />,
    maxHeight: '70vh',
  },
} as ComponentMeta<typeof ScrollView>

export const Playground: FC<ScrollViewNS.Props> = props => {
  return <StoryPlayground component={ScrollView} props={props} />
}

export const IndicatorVisibility: FC = () => {
  return (
    <CommonStory
      component={ScrollView}
      stories={[
        {
          group: [
            {
              name: 'Auto hide',
              props: { autoHide: true, children: <Children />, maxHeight: 200 },
            },
            {
              name: 'Always visible',
              props: { autoHide: false, children: <Children />, maxHeight: 200 },
            },
          ],
        },
      ]}
    />
  )
}
