import React, { forwardRef } from 'react'
import { getBackgroundStyle } from 'react-advanced-cropper'

import { AdjustableImage } from './adjustable-image'
import { AdjustablePreviewBackgroundNS } from './adjustable-preview-bg'

export namespace AdjustableCropperBackgroundNS {
  export interface Props {
    className?: string
    cropper: AdjustablePreviewBackgroundNS.DesiredCropperRef
    crossOrigin?: 'anonymous' | 'use-credentials'
    brightness?: number
    saturation?: number
    hue?: number
    contrast?: number
  }
}

export const AdjustableCropperBackground = forwardRef<
  HTMLCanvasElement,
  AdjustableCropperBackgroundNS.Props
>(
  (
    {
      contrast = 0,
      brightness = 0,
      saturation = 0,
      hue = 0,
      crossOrigin = 'anonymous',
      className,
      cropper,
    },
    ref,
  ) => {
    const state = cropper.getState()
    const transitions = cropper.getTransitions()
    const image = cropper.getImage()

    const style = image && state ? getBackgroundStyle(image, state, transitions) : {}

    return (
      <AdjustableImage
        src={image?.src}
        crossOrigin={crossOrigin}
        brightness={brightness}
        saturation={saturation}
        hue={hue}
        contrast={contrast}
        ref={ref}
        className={className}
        style={style}
      />
    )
  },
)
