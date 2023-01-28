import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Alert, AlertNS, ReactionRate } from '../components'
import { StoryPlayground } from './components'
import { lorem } from '../fixtures'

const children = <ReactionRate type="quintuple" size="large" />

export default {
  title: 'Feedback/Alert',
  component: Alert,
  args: {
    variant: 'neutral',
    banner: false,
    title: lorem(1),
    description: lorem(6),
    closable: true,
    disableDocument: false,
    fluidContent: true,
    icon: undefined,
    emoji: undefined,
    identifier: 1,
    noIconAndEmoji: false,
    onWillClose: () => alert('closed'),
    isOpen: true,
    actions: [{ children: 'First action' }, { children: 'Second action' }],
    className: 'my-alert',
    containerProps: {},
    id: undefined,
    reference: undefined,
    onClick: undefined,
    style: {},
    children,
  },
} as ComponentMeta<typeof Alert>

export const Playground: FC<AlertNS.Props> = props => {
  return <StoryPlayground component={Alert} props={props} />
}
