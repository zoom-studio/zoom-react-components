import React, { FC } from 'react'

import {
  CropperImage,
  CropperState,
  CropperTransitions,
  getPreviewStyle,
  Size,
} from 'react-advanced-cropper'

import { AdjustableImage } from './adjustable-image'

export namespace AdjustablePreviewBackgroundNS {
  export interface DesiredCropperRef {
    getState: () => CropperState
    getTransitions: () => CropperTransitions
    getImage: () => CropperImage
  }

  export interface Props {
    className?: string
    cropper: DesiredCropperRef
    crossOrigin?: 'anonymous' | 'use-credentials'
    brightness?: number
    saturation?: number
    hue?: number
    contrast?: number
    size?: Size | null
  }
}

export const AdjustablePreviewBackground: FC<AdjustablePreviewBackgroundNS.Props> = ({
  contrast = 0,
  brightness = 0,
  saturation = 0,
  hue = 0,
  crossOrigin = 'anonymous',
  className,
  cropper,
  size,
}) => {
  const state = cropper.getState()
  const transitions = cropper.getTransitions()
  const image = cropper.getImage()

  const style = image && state && size ? getPreviewStyle(image, state, size, transitions) : {}

  return (
    <AdjustableImage
      src={image?.src}
      crossOrigin={crossOrigin}
      brightness={brightness}
      saturation={saturation}
      hue={hue}
      contrast={contrast}
      className={className}
      style={style}
    />
  )
}
