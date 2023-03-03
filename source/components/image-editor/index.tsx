import React, { ComponentProps, FC, useRef, useState } from 'react'

import {
  CircleStencil,
  Cropper,
  CropperPreview,
  CropperPreviewRef,
  CropperRef,
  CropperState,
  RawAspectRatio,
  RectangleStencil,
  SimpleHandler,
} from 'react-advanced-cropper'

import { useObjectedState, useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'
import { RangeSlider } from '../range-slider'
import { AdjustableCropperBackground } from './adjustable-cropper-bg'
import { AdjustablePreviewBackground } from './adjustable-preview-bg'
import { EditorActions } from './editor-actions'
import { ResetChanges } from './reset-changes'
import { useImageEditorI18n, UseImageEditorI18nNS } from './use-i18n'
import { getHandlers } from './utils'

export namespace ImageEditorNS {
  export const EditorMode = ['crop', 'saturation', 'brightness', 'contrast', 'hue'] as const
  export type EditorMode = typeof EditorMode[number]

  export const Flip = ['flipVertically', 'flipHorizontally'] as const
  export type Flip = typeof Flip[number]

  export const Rotate = ['rotateRight', 'rotateLeft'] as const
  export type Rotate = typeof Rotate[number]

  export type I18n = UseImageEditorI18nNS.I18n

  export type Filter = Exclude<EditorMode, 'crop'>

  export type Handlers = ComponentProps<typeof CircleStencil>['handlers'] | boolean

  export type Adjustments = {
    [key in Filter]: number
  }

  export const DEFAULT_ADJUSTMENTS: Adjustments = {
    brightness: 0,
    hue: 0,
    saturation: 0,
    contrast: 0,
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    src: string
    circleStencil?: boolean
    aspectRatio?: RawAspectRatio
    grid?: boolean
  }
}

export const ImageEditor: FC<ImageEditorNS.Props> = ({
  grid = true,
  className,
  containerProps,
  reference,
  src,
  circleStencil,
  aspectRatio,
  ...rest
}) => {
  const cropperRef = useRef<CropperRef>(null)
  const previewRef = useRef<CropperPreviewRef>(null)

  const { createClassName, globalI18ns, sendLog } = useZoomComponent('image-editor')

  const i18n = useImageEditorI18n(globalI18ns)

  const cropperState = useObjectedState<CropperState>()
  const mode = useObjectedState<ImageEditorNS.EditorMode>('crop')
  const [adjustments, setAdjustments] = useState(ImageEditorNS.DEFAULT_ADJUSTMENTS)

  const getAdjustments = (): ImageEditorNS.Adjustments => {
    return {
      brightness: adjustments.brightness / 100,
      contrast: adjustments.contrast / 100,
      hue: adjustments.hue / 100,
      saturation: adjustments.saturation / 100,
    }
  }

  const isOnCropMode = mode.val === 'crop'
  const isAnyFilterApplied = Object.values(adjustments).some(value => Math.floor(value * 100))
  const transforms = cropperState.val?.transforms
  const isChanged =
    transforms?.flip.horizontal ||
    transforms?.flip.vertical ||
    (transforms?.rotate ?? 0) % 360 !== 0

  const classes = createClassName(className)
  const overlayClassName = classNames('cropper-overlay', {
    faded: !isOnCropMode,
  })
  const previewClasses = classNames('editor-preview', {
    circular: circleStencil,
  })

  const handleOnUpdate = () => {
    previewRef.current?.refresh()

    if (cropperRef.current) {
      cropperState.set(cropperRef.current.getState()!)
    }
  }

  const handleOnRangeControlWrite = (value: number) => {
    setAdjustments(currentAdjustments => ({
      ...currentAdjustments,
      [mode.val as ImageEditorNS.Filter]: value,
    }))
  }

  return (
    <div {...rest} {...containerProps} ref={reference} className={classes}>
      <div className="canvas-container">
        <Cropper
          src={src}
          ref={cropperRef}
          stencilComponent={circleStencil ? CircleStencil : RectangleStencil}
          backgroundComponent={AdjustableCropperBackground}
          onUpdate={handleOnUpdate}
          backgroundProps={getAdjustments()}
          stencilProps={{
            grid,
            aspectRatio,
            overlayClassName,
            movable: isOnCropMode,
            resizable: isOnCropMode,
            lines: isOnCropMode,
            handlerComponent: SimpleHandler,
            handlers: getHandlers(isOnCropMode, aspectRatio),
          }}
          backgroundWrapperProps={{
            scaleImage: isOnCropMode,
            moveImage: isOnCropMode,
          }}
        />

        {mode.val !== 'crop' && (
          <div className="range-control">
            <RangeSlider
              size="small"
              min={-100}
              max={100}
              key={mode.val}
              step={1}
              value={adjustments[mode.val!]}
              onWrite={handleOnRangeControlWrite}
              masks={{ 0: '0', [-100]: '-100', 100: '100' }}
            />
          </div>
        )}

        {(isChanged || isAnyFilterApplied) && (
          <ResetChanges
            cropperRef={cropperRef}
            i18n={i18n}
            sendLog={sendLog}
            setAdjustments={setAdjustments}
          />
        )}
      </div>

      <CropperPreview
        className={previewClasses}
        ref={previewRef}
        cropper={cropperRef}
        backgroundComponent={AdjustablePreviewBackground}
        backgroundProps={getAdjustments()}
      />

      <EditorActions i18n={i18n} mode={mode} cropperRef={cropperRef} sendLog={sendLog} />
    </div>
  )
}
