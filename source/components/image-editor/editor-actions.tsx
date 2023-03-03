import React, { FC, RefObject } from 'react'

import { CropperRef } from 'react-advanced-cropper'

import { Divider, IconNS, ImageEditorNS, Stack, ZoomLogProviderNS } from '..'
import { logs } from '../../constants'
import { UseObjectedStateNS } from '../../hooks'

import { EditorActionButton } from './action-button'

export namespace EditorActionsNS {
  export interface Action {
    icon: IconNS.Names
    mode: ImageEditorNS.EditorMode | ImageEditorNS.Flip | ImageEditorNS.Rotate
  }

  export interface Props {
    i18n: Required<ImageEditorNS.I18n>
    mode: UseObjectedStateNS.ReturnType<ImageEditorNS.EditorMode>
    cropperRef: RefObject<CropperRef>
    sendLog: ZoomLogProviderNS.Log
  }
}

export const EditorActions: FC<EditorActionsNS.Props> = ({ i18n, mode, cropperRef, sendLog }) => {
  const handleOnActionButtonClick = (targetMode: ImageEditorNS.EditorMode) => () => {
    mode.set(currentMode => {
      if (currentMode === targetMode) {
        return 'crop'
      }
      return targetMode
    })
  }

  const handleFlip = (flipType: ImageEditorNS.Flip) => () => {
    const { current: cropper } = cropperRef
    if (!cropper) {
      return sendLog(logs.imageEditorNotFoundCropperRef, 'handleFlip fn')
    }

    cropper.flipImage(flipType === 'flipVertically', flipType === 'flipHorizontally')
  }

  const handleRotate = (rotateType: ImageEditorNS.Rotate) => () => {
    const { current: cropper } = cropperRef
    if (!cropper) {
      return sendLog(logs.imageEditorNotFoundCropperRef, 'handleRotate fn')
    }

    cropper.rotateImage(rotateType === 'rotateLeft' ? -90 : 90)
  }

  const FILTERS: EditorActionsNS.Action[] = [
    { icon: 'invert_colors', mode: 'saturation' },
    { icon: 'light_mode', mode: 'brightness' },
    { icon: 'contrast', mode: 'contrast' },
    { icon: 'colorize', mode: 'hue' },
  ]

  const FLIPS: EditorActionsNS.Action[] = [
    { icon: 'flip', mode: 'flipVertically' },
    { icon: 'flip', mode: 'flipHorizontally' },
  ]

  const ROTATES: EditorActionsNS.Action[] = [
    { icon: 'rotate_right', mode: 'rotateRight' },
    { icon: 'rotate_left', mode: 'rotateLeft' },
  ]

  return (
    <div className="editor-actions">
      <Stack dividers={<Divider vertical />} spacing={0}>
        <>
          {ROTATES.map((rotate, index) => (
            <EditorActionButton
              key={index}
              icon={rotate.icon}
              title={i18n[rotate.mode]}
              onClick={handleRotate(rotate.mode as ImageEditorNS.Rotate)}
            />
          ))}

          {FLIPS.map((flip, index) => (
            <EditorActionButton
              key={index}
              icon={flip.icon}
              title={i18n[flip.mode]}
              onClick={handleFlip(flip.mode as ImageEditorNS.Flip)}
              className={flip.mode === 'flipVertically' ? 'vertical' : 'horizontal'}
            />
          ))}
        </>

        <EditorActionButton
          icon="crop"
          title={i18n.crop}
          isActive={mode.val === 'crop'}
          onClick={handleOnActionButtonClick('crop')}
        />

        <>
          {FILTERS.map((filter, index) => (
            <EditorActionButton
              key={index}
              icon={filter.icon}
              title={i18n[filter.mode]}
              isActive={mode.val === filter.mode}
              onClick={handleOnActionButtonClick(filter.mode as ImageEditorNS.EditorMode)}
            />
          ))}
        </>
      </Stack>
    </div>
  )
}
