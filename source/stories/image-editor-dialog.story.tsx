import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'
import { randomImage } from '@zoom-studio/zoom-js-ts-utils'

import { ImageEditorDialog, ImageEditorDialogNS } from '../components'
import { StoryPlayground, WithButtonsStory } from './components'

export default {
  title: 'Data entry/Image editor dialog',
  component: ImageEditorDialog,
  args: {
    src: randomImage(undefined, undefined, 'cats'),
    allowScaleOut: false,
  },
} as ComponentMeta<typeof ImageEditorDialog>

export const Playground: FC<ImageEditorDialogNS.Props> = props => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <WithButtonsStory
      buttons={[{ children: 'Open avatar editor dialog', onClick: () => setIsOpen(true) }]}
    >
      <StoryPlayground
        component={ImageEditorDialog}
        props={{ ...props, isOpen, onClose: () => setIsOpen(false) }}
      />
    </WithButtonsStory>
  )
}
