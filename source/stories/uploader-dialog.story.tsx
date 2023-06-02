import React, { type FC, useState } from 'react'

import { type Meta } from '@storybook/react'

import { Button, UploaderDialog, type UploaderDialogNS } from '../components'

export default {
  title: 'Data entry/Uploader dialog',
  component: UploaderDialog,
  args: {},
} as Meta<typeof UploaderDialog>

export const Playground: FC<UploaderDialogNS.Props> = props => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <UploaderDialog
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
