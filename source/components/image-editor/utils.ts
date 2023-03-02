import { RawAspectRatio } from 'react-advanced-cropper'

import { ImageEditorNS } from '.'

export const getHandlers = (aspectRatio?: RawAspectRatio): ImageEditorNS.Handlers => {
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
