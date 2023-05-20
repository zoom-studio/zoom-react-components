import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, UploaderDialog, UploaderDialogNS } from '../components'

export default {
  title: 'Data entry/Uploader dialog',
  component: UploaderDialog,
  args: {},
} as ComponentMeta<typeof UploaderDialog>

export const Playground: FC<UploaderDialogNS.Props> = props => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <UploaderDialog {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <Button onClick={() => setIsOpen(isOpen => !isOpen)}>Open dialog</Button>
    </>
  )
}
