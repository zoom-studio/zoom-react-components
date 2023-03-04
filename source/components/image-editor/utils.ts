import { RawAspectRatio } from 'react-advanced-cropper'

import { ImageEditorNS } from '.'

export const getHandlers = (
  isOnCropMode: boolean,
  aspectRatio?: RawAspectRatio,
): ImageEditorNS.Handlers => {
  if (!isOnCropMode) {
    return false
  }

  if (
    aspectRatio &&
    (typeof aspectRatio === 'number' || aspectRatio.maximum === aspectRatio.minimum)
  ) {
    return {
      east: false,
      west: false,
      south: false,
      north: false,
      eastNorth: true,
      eastSouth: true,
      westNorth: true,
      westSouth: true,
    }
  } else {
    return {
      east: true,
      west: true,
      south: true,
      north: true,
      eastNorth: true,
      eastSouth: true,
      westNorth: true,
      westSouth: true,
    }
  }
}

export const requireDefaultAdjustments = (
  defaultAdjustments: Partial<ImageEditorNS.Adjustments>,
): ImageEditorNS.Adjustments => ({
  brightness: defaultAdjustments.brightness ?? 0,
  contrast: defaultAdjustments.contrast ?? 0,
  hue: defaultAdjustments.hue ?? 0,
  saturation: defaultAdjustments.saturation ?? 0,
})
