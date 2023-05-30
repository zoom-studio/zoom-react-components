import React, { forwardRef, type MouseEvent, useRef, useState } from 'react'

import { type ButtonNS, Dialog, type DialogNS, ImageEditor, type ImageEditorNS } from '..'
import { useZoomComponent } from '../../hooks'

export namespace ImageEditorDialogNS {
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

  export interface Props extends ImageEditorNS.Props, Pick<DialogNS.Props, PickedDialogProps> {
    dialogProps?: Omit<DialogNS.Props, PickedDialogProps | OmittedDialogProps>
    saveButton?: string
    saveButtonProps?: ButtonNS.Props
    onSave?: (result: ImageEditorNS.ResultType | undefined) => void
  }
}

export const ImageEditorDialog = forwardRef<HTMLDivElement, ImageEditorDialogNS.Props>(
  (
    {
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
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('image-editor-dialog')
    const getResultRef = providedGetResultRef ?? useRef<ImageEditorNS.GetResult>(null)

    const [isGettingResult, setIsGettingResult] = useState(false)

    const classes = createClassName(dialogProps?.className)

    const handleOnSave = async (evt: MouseEvent<HTMLButtonElement>) => {
      saveButtonProps?.onClick?.(evt)
      const result = await getResultRef.current?.()
      onSave?.(result)
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
        ref={reference}
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
          loading={loading}
          disabled={disabled}
        />
      </Dialog>
    )
  },
)
