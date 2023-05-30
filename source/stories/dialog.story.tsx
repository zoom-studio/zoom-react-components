import React, { type FC, useRef, useState } from 'react'

import { type Meta } from '@storybook/react'

import { Dialog, Button, type DialogNS, type ButtonNS } from '..'
import { StoryPlayground, CommonStory, type CommonStoryNS, WithButtonsStory } from './components'
import { lorem } from '../fixtures'
import { useI18n } from './hooks/use-i18n'
import { type CommonSize } from '../types'

export default {
  title: 'Feedback/Dialog',
  component: Dialog,
} as Meta<typeof Dialog>

export const Sizes = () => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [dialogSize, setDialogSize] = useState<CommonSize>('normal')
  const { t } = useI18n('dialog')

  const close = () => {
    setIsOpen(false)
  }
  const open = (size: CommonSize) => () => {
    setDialogSize(size)
    setIsOpen(true)
  }

  const actions: DialogNS.Action[] = [
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

  const secondaryActions: DialogNS.Action[] = [
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

      <Dialog
        size={dialogSize}
        cancelButton={t('actions.cancel')}
        withFullscreenButton
        className="my-dialog"
        isOpen={isOpen}
        onClose={close}
        closable
        backdropProps={{ className: 'my-backdrop' }}
        actions={actions}
        secondaryActions={secondaryActions}
        title={t('title')}
        cancelButtonProps={{ className: 'my-cancel-button' }}
        onCancelButtonClick={undefined}
        onWillCancelButtonClick={_evt => {}}
        fullScreen={false}
        fullScreenButtonProps={{ className: 'my-fullscreen-button' }}
        closeButtonProps={{ className: 'my-close-button' }}
        headerProps={{ className: 'my-dialog-header' }}
        bodyProps={{ className: 'my-dialog-body' }}
        footerProps={{ className: 'my-dialog-footer' }}
        ref={dialogRef}
        backdropRef={undefined}
      >
        {lorem(10)}
      </Dialog>
    </div>
  )
}

export const MultipleDialogs: FC = () => {
  const [isDialogsOpen, setIsDialogsOpen] = useState(false)
  const { t } = useI18n('dialog')

  return (
    <WithButtonsStory
      buttons={[
        {
          children: t('open'),
          onClick: () => {
            setIsDialogsOpen(true)
          },
        },
      ]}
    >
      <Dialog
        isOpen={isDialogsOpen}
        onClose={() => {
          setIsDialogsOpen(false)
        }}
        size="small"
      >
        {lorem(10)}
      </Dialog>
      <Dialog
        isOpen={isDialogsOpen}
        onClose={() => {
          setIsDialogsOpen(false)
        }}
        size="normal"
      >
        {lorem(10)}
      </Dialog>
      <Dialog
        isOpen={isDialogsOpen}
        onClose={() => {
          setIsDialogsOpen(false)
        }}
        size="large"
      >
        {lorem(10)}
      </Dialog>
    </WithButtonsStory>
  )
}

export const Playground: FC<DialogNS.Props> = props => {
  const [isOpen, setIsOpen] = useState(!!props.isOpen)
  const open = () => {
    setIsOpen(true)
  }
  const close = () => {
    setIsOpen(false)
  }
  const { t } = useI18n('dialog')

  return (
    <StoryPlayground<DialogNS.Props>
      component={Dialog}
      props={{ ...props, isOpen, onClose: close }}
    >
      <Button onClick={open}>{t('open')}</Button>
    </StoryPlayground>
  )
}
