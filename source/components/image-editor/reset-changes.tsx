import React, { Dispatch, FC, RefObject, SetStateAction } from 'react'

import { CropperRef } from 'react-advanced-cropper'

import { PopConfirm } from '..'
import { logs } from '../../constants'
import { ZoomLogProviderNS } from '../zoom-log-provider'

import { ImageEditorNS } from '.'

export namespace ResetChangesNS {
  export interface Props {
    cropperRef: RefObject<CropperRef>
    sendLog: ZoomLogProviderNS.Log
    i18n: Required<ImageEditorNS.I18n>
    setAdjustments: Dispatch<SetStateAction<ImageEditorNS.Adjustments>>
  }
}

export const ResetChanges: FC<ResetChangesNS.Props> = ({
  cropperRef,
  i18n,
  sendLog,
  setAdjustments,
}) => {
  const handleResetChanges = (closePopover: () => void) => () => {
    const { current: cropper } = cropperRef
    if (!cropper) {
      return sendLog(logs.imageEditorNotFoundCropperRef, 'handleResetChanges fn')
    }

    cropper.reset()
    setAdjustments(ImageEditorNS.DEFAULT_ADJUSTMENTS)
    closePopover()
  }

  return (
    <div className="reset-all">
      <PopConfirm
        placement="left-start"
        title={i18n.reset}
        description={i18n.resetMessage}
        confirm={({ closePopover }) => ({
          children: i18n.confirmReset,
          onClick: handleResetChanges(closePopover),
        })}
        cancel={({ closePopover }) => ({ children: i18n.cancelReset, onClick: closePopover })}
        buttonProps={{
          prefixMaterialIcon: 'restart_alt',
          shape: 'circle',
          type: 'secondary',
          size: 'large',
          className: 'reset-all-button',
        }}
      />
    </div>
  )
}
