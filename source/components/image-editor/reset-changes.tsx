import React, { type Dispatch, type FC, type RefObject, type SetStateAction } from 'react'

import { type CropperRef } from 'react-advanced-cropper'

import { Button, type ButtonNS, PopConfirm, Tooltip } from '..'
import { logs } from '../../constants'
import { type ZoomGlobalConfigProviderNS } from '../zoom-global-config-provider'

import { type ImageEditorNS } from '.'

export namespace ResetChangesNS {
  export interface Props {
    cropperRef: RefObject<CropperRef>
    sendLog: ZoomGlobalConfigProviderNS.Log
    i18n: Required<ImageEditorNS.I18n>
    setAdjustments: Dispatch<SetStateAction<ImageEditorNS.Adjustments>>
    confirmBeforeReset: boolean
    defaultAdjustments: ImageEditorNS.Adjustments
    disabled: boolean
  }
}

export const ResetChanges: FC<ResetChangesNS.Props> = ({
  cropperRef,
  i18n,
  sendLog,
  setAdjustments,
  confirmBeforeReset,
  defaultAdjustments,
  disabled,
}) => {
  const handleResetChanges = (closePopover?: () => void) => () => {
    const { current: cropper } = cropperRef
    if (!cropper) {
      sendLog(logs.imageEditorNotFoundCropperRef, 'handleResetChanges fn')
      return
    }

    cropper.reset()
    setAdjustments(defaultAdjustments)
    closePopover?.()
  }

  const resetButtonProps: ButtonNS.Props = {
    prefixMaterialIcon: 'restart_alt',
    shape: 'circle',
    type: 'secondary',
    size: 'large',
    className: 'reset-all-button',
  }

  return (
    <div className="reset-all">
      {confirmBeforeReset ? (
        <PopConfirm
          placement="left-start"
          title={i18n.reset}
          description={i18n.resetMessage}
          confirm={({ closePopover }) => ({
            children: i18n.confirmReset,
            onClick: handleResetChanges(closePopover),
          })}
          cancel={({ closePopover }) => ({ children: i18n.cancelReset, onClick: closePopover })}
          buttonProps={resetButtonProps}
        />
      ) : (
        <Tooltip title={i18n.reset} placement="left-start">
          <Button disabled={disabled} {...resetButtonProps} onClick={handleResetChanges()} />
        </Tooltip>
      )}
    </div>
  )
}
