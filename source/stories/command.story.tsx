import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Button, Command, type CommandNS } from '../components'
import { COMMAND_ITEMS } from '../fixtures'

export default {
  title: 'Call to action/Command',
  component: Command,
  args: {
    items: COMMAND_ITEMS,
    placeholder: 'What are you looking for?',
    defaultIsOpen: true,
    children: undefined,
    onWillOpen: undefined,
    onWillClose: undefined,
    className: 'my-command',
    id: 'my-command',
    backdropProps: {},
    backdropRef: undefined,
    containerProps: {},
    onClick: undefined,
    style: {},
  },
} as Meta<typeof Command>

export const Playground: FC<CommandNS.Props> = props => {
  return (
    <Command {...props}>
      {({ open }) => (
        <div
          style={{
            width: '100%',
            padding: '100px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button onClick={open}>Click on me or press ctrl+k to open the command runner</Button>
        </div>
      )}
    </Command>
  )
}
