import React, { type CSSProperties, forwardRef, useLayoutEffect, useRef } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'
import { CropperSource, mergeRefs } from 'react-advanced-cropper'

export namespace AdjustableImageNS {
  export interface Props {
    src?: string
    className?: string
    crossOrigin?: 'anonymous' | 'use-credentials'
    brightness?: number
    saturation?: number
    hue?: number
    contrast?: number
    style?: CSSProperties
  }
}

export const AdjustableImage = forwardRef<HTMLCanvasElement, AdjustableImageNS.Props>(
  (
    {
      crossOrigin = 'anonymous',
      brightness = 0,
      saturation = 0,
      contrast = 0,
      hue = 0,
      src,
      className,
      style,
    },
    ref,
  ) => {
    const imageRef = useRef<HTMLImageElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const drawImage = () => {
      const image = imageRef.current
      const canvas = canvasRef.current

      if (canvas && image && image.complete) {
        const ctx = canvas.getContext('2d')
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight

        if (ctx) {
          ctx.filter = [
            `brightness(${100 + brightness * 100}%)`,
            `contrast(${100 + contrast * 100}%)`,
            `saturate(${100 + saturation * 100}%)`,
            `hue-rotate(${hue * 360}deg)`,
          ].join(' ')

          ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)
        }
      }
    }

    useLayoutEffect(() => {
      drawImage()
    }, [src, brightness, saturation, hue, contrast])

    const canvasClasses = classNames('adjustable-image-element', { [className || '']: true })

    return (
      <>
        <canvas
          key={`${src}-canvas`}
          ref={mergeRefs([ref, canvasRef])}
          className={canvasClasses}
          style={style}
        />
        <CropperSource
          key={`${src}-img`}
          ref={imageRef}
          className={'adjustable-image-source'}
          src={src}
          crossOrigin={crossOrigin}
          onLoad={drawImage}
        />
      </>
    )
  },
)
