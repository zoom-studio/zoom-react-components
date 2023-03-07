import React, { FC, MouseEvent, useRef, useState } from 'react'

import { ButtonNS, Dialog, DialogNS, ImageEditor, ImageEditorNS } from '..'
import { useZoomComponent } from '../../hooks'

export namespace ImageEditorDialogNS {
  export const PickedDialogProps = [
    'isOpen',
    'onClose',
    'closable',
    'title',
    'cancelButton',
  ] as const
  export type PickedDialogProps = typeof PickedDialogProps[number]

  export const OmittedDialogProps = ['actions', 'secondaryActions'] as const
  export type OmittedDialogProps = typeof OmittedDialogProps[number]

  export interface Props extends ImageEditorNS.Props, Pick<DialogNS.Props, PickedDialogProps> {
    dialogProps?: Omit<DialogNS.Props, PickedDialogProps | OmittedDialogProps>
    saveButton?: string
    saveButtonProps?: ButtonNS.Props
    onSave?: (result: ImageEditorNS.ResultType) => Promise<void>
  }
}

export const ImageEditorDialog: FC<ImageEditorDialogNS.Props> = ({
  getResultRef: providedGetResultRef,
  saveButton = 'Save changes',
  cancelButton = 'Cancel',
  dialogProps,
  isOpen,
  closable,
  onClose,
  title,
  disabled,
  saveButtonProps,
  loading,
  onSave,
  ...imageEditorProps
}) => {
  const { createClassName } = useZoomComponent('image-editor-dialog')
  const getResultRef = providedGetResultRef ?? useRef<ImageEditorNS.GetResult>(null)

  const [isGettingResult, setIsGettingResult] = useState(false)

  const classes = createClassName(dialogProps?.className)

  const handleOnSave = async (evt: MouseEvent<HTMLButtonElement>) => {
    saveButtonProps?.onClick?.(evt)
    const result = await getResultRef.current?.()
    return result
  }

  const handleOnGettingResultStart = () => {
    imageEditorProps.onGettingResultStart?.()
    setIsGettingResult(true)
  }

  const handleOnGettingResultEnd = () => {
    imageEditorProps.onGettingResultEnd?.()
    setIsGettingResult(false)
  }

  return (
    <Dialog
      {...dialogProps}
      className={classes}
      withFullscreenButton={false}
      size="large"
      isOpen={isOpen}
      closable={closable}
      onClose={onClose}
      title={title}
      cancelButton={cancelButton}
      cancelButtonProps={{
        disabled,
        ...dialogProps?.cancelButtonProps,
      }}
      actions={[
        {
          disabled,
          children: saveButton,
          loading: saveButtonProps?.loading || isGettingResult,
          onClick: handleOnSave,
          ...saveButtonProps,
        },
      ]}
    >
      <ImageEditor
        {...imageEditorProps}
        getResultRef={getResultRef}
        onGettingResultStart={handleOnGettingResultStart}
        onGettingResultEnd={handleOnGettingResultEnd}
      />
    </Dialog>
  )
}
