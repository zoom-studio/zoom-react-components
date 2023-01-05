import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, Emoji, Popover, PopoverNS } from '..'
import { StoryPlayground } from './components'
import { lorem } from '../fixtures'

const CustomContent: FC = () => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
    <Emoji name="grinning face with smiling eyes" style={{ width: 30 }} />
    <Emoji name="beaming face with smiling eyes" style={{ width: 30 }} />
    <Emoji name="face with tears of joy" style={{ width: 30 }} />
    <Emoji name="rolling on the floor laughing" style={{ width: 30 }} />
  </div>
)

export default {
  title: 'Feedback/Popover',
  component: Popover,
  args: {
    title: 'Some title for the popover component',
    description: lorem(2),
    children: <Button>Trigger popover by me</Button>,
    trigger: 'click',
    content: <CustomContent />,
    placement: 'top',
    defaultIsOpen: true,
  },
} as ComponentMeta<typeof Popover>

export const Playground: FC<PopoverNS.Props> = props => {
  return (
    <StoryPlayground
      containerProps={{
        style: { minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' },
      }}
      component={Popover}
      props={props}
    />
  )
}
