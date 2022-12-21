import React, { useRef, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Dialog, Button, DialogNS } from '../components'
import { lorem } from '../fixtures'
import { useAddDataAttrs } from './hooks'

import './styles/_dialog.scss'

export default {
  title: 'Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>

export const _Dialog = () => {
  const { layout, setLayout } = useAddDataAttrs('rtl')
  const dialogRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [dialogSize, setDialogSize] = useState<DialogNS.Size>('normal')

  const open = (size: DialogNS.Size) => () => {
    setDialogSize(size)
    setIsOpen(true)
  }

  const close = () => setIsOpen(false)

  const actions: DialogNS.Action[] = [
    {
      children: 'ثبت دسته‌بندی',
      prefixMaterialIcon: 'add',
      type: 'primary',
      variant: 'success',
      size: 'small',
    },
    {
      children: 'مرحله قبل',
      prefixMaterialIcon: 'chevron_right',
      type: 'primary',
      variant: 'info',
      size: 'small',
    },
  ]

  const secondaryActions: DialogNS.Action[] = [
    {
      children: 'بستن',
      type: 'dashed',
      variant: 'error',
    },
  ]

  return (
    <div className="dialog-story">
      <div className="buttons">
        <Button size="small" onClick={open('small')}>
          Open small dialog
        </Button>

        <Button size="normal" onClick={open('normal')}>
          Open normal dialog
        </Button>

        <Button size="large" onClick={open('large')}>
          Open large dialog
        </Button>
      </div>

      <Dialog
        size={dialogSize}
        cancelButton="منصرف شدم"
        withFullscreenButton
        className="my-dialog"
        isOpen={isOpen}
        onClose={close}
        closable
        backdropProps={{ className: 'my-backdrop' }}
        actions={actions}
        secondaryActions={secondaryActions}
        title="عنوان نمونه برای کامپوننت دیالوگ"
        cancelButtonProps={{ className: 'my-cancel-button' }}
        onCancelButtonClick={undefined}
        onWillCancelButtonClick={_evt => {}}
        fullScreen={false}
        fullScreenButtonProps={{ className: 'my-fullscreen-button' }}
        closeButtonProps={{ className: 'my-close-button' }}
        headerProps={{ className: 'my-dialog-header' }}
        bodyProps={{ className: 'my-dialog-body' }}
        footerProps={{ className: 'my-dialog-footer' }}
        dialogRef={dialogRef}
        backdropRef={undefined}
      >
        <Button
          size="small"
          type="dashed"
          variant="info"
          onClick={() =>
            setLayout(layout => (layout === 'ltr' ? 'rtl' : 'ltr'))
          }
        >
          Switch to {layout === 'ltr' ? 'RTL' : 'LTR'} layout
        </Button>

        {lorem(10)}
      </Dialog>
    </div>
  )
}
