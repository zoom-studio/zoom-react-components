import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Toast, ToastNS } from '../components/toast/toast'
import { StoryPlayground } from './components'
import { lorem } from '../fixtures'

export default {
  title: 'Feedback/Toast',
  component: Toast,
  args: {
    children: lorem(8),
    size: 'normal',
    variant: 'error',
    loading: false,
    icon: 'error',
    actions: [
      { children: 'Accepts', variant: 'success' },
      { children: 'Dismisses', variant: 'error' },
    ],
  },
} as ComponentMeta<typeof Toast>

export const Playground: FC<ToastNS.Props> = props => {
  return <StoryPlayground component={Toast} props={props} />
}
