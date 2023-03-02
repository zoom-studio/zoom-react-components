import React, { ComponentProps, FC } from 'react'

import {
  CircleStencil,
  Cropper,
  RawAspectRatio,
  RectangleStencil,
  SimpleHandler,
} from 'react-advanced-cropper'

import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'
import { getHandlers } from './utils'

export namespace ImageEditorNS {
  export type Handlers = ComponentProps<typeof CircleStencil>['handlers']

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
  // ...rest
}) => {
  const { createClassName } = useZoomComponent('image-editor')

  const classes = createClassName(className)

  return (
    <div {...containerProps} ref={reference} className={classes}>
      <Cropper
        stencilComponent={circleStencil ? CircleStencil : RectangleStencil}
        stencilProps={{
          grid,
          aspectRatio,
          handlerComponent: SimpleHandler,
          handlers: getHandlers(aspectRatio),
        }}
        src={src}
        onChange={() => {}}
        className={'cropper'}
      />
    </div>
  )
}
