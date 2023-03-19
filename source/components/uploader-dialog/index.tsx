import React, { FC } from 'react'

import { UploaderNS, DialogNS, Dialog, Uploader, ButtonNS } from '..'
import { useZoomComponent } from '../../hooks'

export namespace UploaderDialogNS {
  export const PickedDialogProps = [
    'isOpen',
    'onClose',
    'closable',
    'title',
    'cancelButton',
  ] as const
  export type PickedDialogProps = typeof PickedDialogProps[number]

  export const OmittedDialogProps = ['actions', 'secondaryActions', 'size'] as const
  export type OmittedDialogProps = typeof OmittedDialogProps[number]

  export interface Props extends UploaderNS.Props, Pick<DialogNS.Props, PickedDialogProps> {
    dialogProps?: Omit<DialogNS.Props, PickedDialogProps | OmittedDialogProps>
    minFiles?: number
    confirmButton?: string
    confirmButtonProps?: ButtonNS.Props
    isUploadingFiles?: boolean
  }
}

export const UploaderDialog: FC<UploaderDialogNS.Props> = ({
  cancelButton = 'Cancel',
  confirmButton = 'Confirm',
  minFiles = 1,
  confirmButtonProps,
  dialogProps,
  isOpen,
  closable,
  isUploadingFiles,
  onClose,
  title,
  disabled,
  loading,
  ...uploaderProps
}) => {
  const { createClassName } = useZoomComponent('uploader-dialog')

  const classes = createClassName(dialogProps?.className)

  const isConfirmable = !!uploaderProps.files && uploaderProps.files.length >= minFiles

  return (
    <Dialog
      {...dialogProps}
      className={classes}
      withFullscreenButton={false}
      size="small"
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
          disabled: disabled || isUploadingFiles || !isConfirmable,
          children: confirmButton,
          loading: confirmButtonProps?.loading || isUploadingFiles,
          onClick: onClose,
          ...confirmButtonProps,
        },
      ]}
    >
      <Uploader {...uploaderProps} loading={loading} disabled={disabled} />
    </Dialog>
  )
}
