import React, { type FC, useState } from 'react'

import { type Meta } from '@storybook/react'
import { randomImage } from '@zoom-studio/js-ts-utils'

import { AvatarEditorDialog, type AvatarEditorDialogNS } from '../components'
import { StoryPlayground, WithButtonsStory } from './components'

export default {
  title: 'Data entry/Avatar editor dialog',
  component: AvatarEditorDialog,
  args: {
    src: randomImage(undefined, undefined, 'cats'),
    allowScaleOut: false,
  },
} as Meta<typeof AvatarEditorDialog>

export const Playground: FC<AvatarEditorDialogNS.Props> = props => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <WithButtonsStory
      buttons={[
        {
          children: 'Open avatar editor dialog',
          onClick: () => {
            setIsOpen(true)
          },
        },
      ]}
    >
      <StoryPlayground
        component={AvatarEditorDialog}
        props={{
          ...props,
          isOpen,
          onClose: () => {
            setIsOpen(false)
          },
        }}
      />
    </WithButtonsStory>
  )
}
