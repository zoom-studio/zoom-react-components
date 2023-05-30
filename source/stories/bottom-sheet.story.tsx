import React, { type FC, useState } from 'react'

import { type Meta } from '@storybook/react'

import { BottomSheet, type BottomSheetNS, Button, type ButtonNS } from '../components'
import { CommonStory, type CommonStoryNS, StoryPlayground } from './components'
import { LoremPage, useCreateLoremSectionRefs } from '../fixtures'
import { type CommonSize } from '../types'
import { useI18n } from './hooks/use-i18n'

const Children = () => {
  const refs = useCreateLoremSectionRefs()
  return <LoremPage refs={refs} />
}

export default {
  title: 'Feedback/Bottom sheet',
  component: BottomSheet,
  args: {
    isOpen: true,
    closable: true,
    size: 'normal',
    title:
      'Some title for the bottom sheet component, Some title for the bottom sheet component, Some title for the bottom sheet component',
    cancelButton: 'Cancel',
    secondaryActions: [{ children: 'Secondary action' }],
    actions: [{ children: 'Custom action' }],
    children: <Children />,
  },
} as Meta<typeof BottomSheet>

export const Sizes = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogSize, setDialogSize] = useState<CommonSize>('normal')
  const { t } = useI18n('bottomSheet')

  const close = () => {
    setIsOpen(false)
  }
  const open = (size: CommonSize) => () => {
    setDialogSize(size)
    setIsOpen(true)
  }

  const actions: BottomSheetNS.Action[] = [
    {
      children: t('actions.addCategory'),
      prefixMaterialIcon: 'add',
      type: 'primary',
      variant: 'success',
      size: 'small',
    },
    {
      children: t('actions.prevLevel'),
      prefixMaterialIcon: 'chevron_right',
      type: 'primary',
      variant: 'info',
      size: 'small',
    },
  ]

  const secondaryActions: BottomSheetNS.Action[] = [
    {
      children: t('actions.close'),
      type: 'dashed',
      variant: 'error',
    },
  ]

  const dialogButtons: CommonStoryNS.Story<ButtonNS.Props>[] = [
    {
      group: [
        { props: { size: 'small', onClick: open('small'), children: t('openSizeOf.small') } },
        { props: { size: 'normal', onClick: open('normal'), children: t('openSizeOf.normal') } },
        { props: { size: 'large', onClick: open('large'), children: t('openSizeOf.large') } },
      ],
    },
  ]

  return (
    <div className="dialog-story">
      <CommonStory component={Button} stories={dialogButtons} />

      <BottomSheet
        size={dialogSize}
        cancelButton={t('actions.cancel')}
        className="my-dialog"
        isOpen={isOpen}
        onClose={close}
        closable
        backdropProps={{ className: 'my-backdrop' }}
        actions={actions}
        secondaryActions={secondaryActions}
        title={t('title')}
      >
        <Children />
      </BottomSheet>
    </div>
  )
}

export const Playground: FC<BottomSheetNS.Props> = props => {
  return <StoryPlayground component={BottomSheet} props={props} />
}
