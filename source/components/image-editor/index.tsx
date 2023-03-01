import React, { FC } from 'react'
import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace ImageEditorNS {
  export interface Props extends Omit<BaseComponent, 'children'> {}
}

export const ImageEditor: FC<ImageEditorNS.Props> = ({
  className,
  containerProps,
  reference,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('image-editor')

  const classes = createClassName(className)

  return <div {...rest} {...containerProps} ref={reference} className={classes}></div>
}
