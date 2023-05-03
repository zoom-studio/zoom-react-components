import React, { FC, RefObject, useEffect } from 'react'

import { CropperRef } from 'react-advanced-cropper'
import { classNames, UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils'

import { Divider, IconNS, ImageEditorNS, Stack, ZoomLogProviderNS } from '..'
import { logs } from '../../constants'

import { EditorActionButton } from './action-button'

export namespace EditorActionsNS {
  export interface Action {
    icon: IconNS.Names
    mode: ImageEditorNS.EditorMode | ImageEditorNS.Flip | ImageEditorNS.Rotate
  }

  export interface Props extends Pick<ImageEditorNS.Props, 'defaultFlips' | 'defaultRotation'> {
    i18n: Required<ImageEditorNS.I18n>
    mode: UseObjectedStateNS.ReturnType<ImageEditorNS.EditorMode>
    cropperRef: RefObject<CropperRef>
    sendLog: ZoomLogProviderNS.Log
    disabled: boolean
    loading: boolean
  }
}

export const EditorActions: FC<EditorActionsNS.Props> = ({
  i18n,
  mode,
  cropperRef,
  sendLog,
  defaultFlips,
  defaultRotation,
  disabled,
  loading,
}) => {
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

  const handleRotate = (rotation: ImageEditorNS.Rotate | number) => () => {
    const { current: cropper } = cropperRef
    if (!cropper) {
      return sendLog(logs.imageEditorNotFoundCropperRef, 'handleRotate fn')
    }

    cropper.rotateImage(
      typeof rotation === 'number' ? rotation : rotation === 'rotateLeft' ? -90 : 90,
    )
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

  const classes = classNames('editor-actions', {
    loading: disabled,
  })

  useEffect(() => {
    if (!loading) {
      if (defaultRotation) {
        handleRotate(defaultRotation)()
      }

      if (defaultFlips) {
        if (defaultFlips.flipHorizontally) {
          handleFlip('flipHorizontally')()
        }
        if (defaultFlips.flipVertically) {
          handleFlip('flipVertically')()
        }
      }
    }
  }, [loading])

  return (
    <div className={classes}>
      <Stack dividers={<Divider vertical />} spacing={0}>
        <>
          {ROTATES.map((rotate, index) => (
            <EditorActionButton
              key={index}
              icon={rotate.icon}
              title={i18n[rotate.mode]}
              onClick={handleRotate(rotate.mode as ImageEditorNS.Rotate)}
              disabled={disabled}
            />
          ))}

          {FLIPS.map((flip, index) => (
            <EditorActionButton
              key={index}
              icon={flip.icon}
              title={i18n[flip.mode]}
              onClick={handleFlip(flip.mode as ImageEditorNS.Flip)}
              className={flip.mode === 'flipVertically' ? 'vertical' : 'horizontal'}
              disabled={disabled}
            />
          ))}
        </>

        <EditorActionButton
          icon="crop"
          title={i18n.crop}
          isActive={mode.val === 'crop'}
          onClick={handleOnActionButtonClick('crop')}
          disabled={disabled}
        />

        <>
          {FILTERS.map((filter, index) => (
            <EditorActionButton
              key={index}
              icon={filter.icon}
              title={i18n[filter.mode]}
              isActive={mode.val === filter.mode}
              onClick={handleOnActionButtonClick(filter.mode as ImageEditorNS.EditorMode)}
              disabled={disabled}
            />
          ))}
        </>
      </Stack>
    </div>
  )
}
