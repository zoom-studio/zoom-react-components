import React, { type FC, useState } from 'react'

import { type Meta } from '@storybook/react'
import { randomImage } from '@zoom-studio/js-ts-utils'

import { ImageEditorDialog, type ImageEditorDialogNS } from '../components'
import { StoryPlayground, WithButtonsStory } from './components'

export default {
  title: 'Data entry/Image editor dialog',
  component: ImageEditorDialog,
  args: {
    src: randomImage(undefined, undefined, 'cats'),
    allowScaleOut: false,
  },
} as Meta<typeof ImageEditorDialog>

export const Playground: FC<ImageEditorDialogNS.Props> = props => {
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
        component={ImageEditorDialog}
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
