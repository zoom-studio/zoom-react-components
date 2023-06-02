import React, { type FC, useState } from 'react'

import { type Meta } from '@storybook/react'

import { Button, ExplorerDialog, type ExplorerDialogNS } from '../components'
import { explorerRandomFile } from '../fixtures'

export default {
  title: 'Data display/ExplorerDialog',
  component: ExplorerDialog,
  args: {
    files: Array.from(Array(20)).map(explorerRandomFile),
  },
} as Meta<typeof ExplorerDialog>

export const Playground: FC<ExplorerDialogNS.Props> = props => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <ExplorerDialog
        {...props}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      />

      <Button
        onClick={() => {
          setIsOpen(isOpen => !isOpen)
        }}
      >
        Open dialog
      </Button>
    </>
  )
}
