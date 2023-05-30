import React, { forwardRef } from 'react'

import { type ButtonNS, Dialog, type DialogNS, Explorer, type ExplorerNS } from '..'
import { useZoomComponent } from '../../hooks'

export namespace ExplorerDialogNS {
  export const PickedDialogProps = [
    'isOpen',
    'onClose',
    'closable',
    'title',
    'cancelButton',
  ] as const
  export type PickedDialogProps = (typeof PickedDialogProps)[number]

  export const OmittedDialogProps = ['actions', 'secondaryActions'] as const
  export type OmittedDialogProps = (typeof OmittedDialogProps)[number]

  export interface Props extends ExplorerNS.Props, Pick<DialogNS.Props, PickedDialogProps> {
    dialogProps?: Omit<DialogNS.Props, PickedDialogProps | OmittedDialogProps>
    selectButton?: string
    selectButtonProps?: ButtonNS.Props
  }
}

export const ExplorerDialog = forwardRef<HTMLDivElement, ExplorerDialogNS.Props>(
  (
    {
      selectButton = 'Select files',
      cancelButton = 'Cancel',
      dialogProps,
      isOpen,
      closable,
      onClose,
      title,
      disabled,
      selectButtonProps,
      loading,
      ...explorerProps
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('explorer-dialog')

    const classes = createClassName(dialogProps?.className)

    return (
      <Dialog
        {...dialogProps}
        ref={reference}
        className={classes}
        withFullscreenButton={false}
        size="large"
        isOpen={isOpen}
        closable={closable}
        onClose={onClose}
        title={title}
        cancelButton={cancelButton}
        cancelButtonProps={{
          disabled: disabled || loading,
          ...dialogProps?.cancelButtonProps,
        }}
        actions={[
          {
            disabled: disabled || loading,
            children: selectButton,
            loading: selectButtonProps?.loading,
            ...selectButtonProps,
          },
        ]}
      >
        <Explorer {...explorerProps} loading={loading} disabled={disabled} />
      </Dialog>
    )
  },
)
