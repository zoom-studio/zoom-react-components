import React, { forwardRef, type MouseEvent, useRef, useState } from 'react'

import { type ButtonNS, Dialog, type DialogNS, AvatarEditor, type AvatarEditorNS } from '..'
import { useZoomComponent } from '../../hooks'

export namespace AvatarEditorDialogNS {
  export const PickedDialogProps = [
    'isOpen',
    'onClose',
    'closable',
    'title',
    'cancelButton',
  ] as const
  export type PickedDialogProps = (typeof PickedDialogProps)[number]

  export const OmittedDialogProps = ['actions', 'secondaryActions', 'size'] as const
  export type OmittedDialogProps = (typeof OmittedDialogProps)[number]

  export interface Props extends AvatarEditorNS.Props, Pick<DialogNS.Props, PickedDialogProps> {
    dialogProps?: Omit<DialogNS.Props, PickedDialogProps | OmittedDialogProps>
    saveButton?: string
    saveButtonProps?: ButtonNS.Props
    onSave?: (result: AvatarEditorNS.ResultType | undefined) => void
  }
}

export const AvatarEditorDialog = forwardRef<HTMLDivElement, AvatarEditorDialogNS.Props>(
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
      saveButtonProps,
      loading,
      onSave,
      ...avatarEditorProps
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('avatar-editor-dialog')
    const getResultRef = providedGetResultRef ?? useRef<AvatarEditorNS.GetResult>(null)

    const [isGettingResult, setIsGettingResult] = useState(false)

    const classes = createClassName(dialogProps?.className)

    const handleOnSave = async (evt: MouseEvent<HTMLButtonElement>) => {
      saveButtonProps?.onClick?.(evt)
      const result = await getResultRef.current?.()
      onSave?.(result ?? undefined)
      return result
    }

    const handleOnGettingResultStart = () => {
      avatarEditorProps.onGettingResultStart?.()
      setIsGettingResult(true)
    }

    const handleOnGettingResultEnd = () => {
      avatarEditorProps.onGettingResultEnd?.()
      setIsGettingResult(false)
    }

    return (
      <Dialog
        {...dialogProps}
        className={classes}
        withFullscreenButton={false}
        ref={reference}
        size="small"
        isOpen={isOpen}
        closable={closable}
        onClose={onClose}
        title={title}
        cancelButton={cancelButton}
        cancelButtonProps={{
          disabled: loading,
          ...dialogProps?.cancelButtonProps,
        }}
        actions={[
          {
            disabled: loading,
            children: saveButton,
            loading: saveButtonProps?.loading || isGettingResult,
            onClick: handleOnSave,
            ...saveButtonProps,
          },
        ]}
      >
        <AvatarEditor
          {...avatarEditorProps}
          getResultRef={getResultRef}
          onGettingResultStart={handleOnGettingResultStart}
          onGettingResultEnd={handleOnGettingResultEnd}
          loading={loading}
        />
      </Dialog>
    )
  },
)
