import React, { FC, SyntheticEvent, ImgHTMLAttributes, MouseEvent } from 'react'
import { logs } from '../../constants'

import { useZoomComponent } from '../../hooks'

export namespace ImageNS {
  export interface Props
    extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'src' | 'alt'> {
    lazy?: boolean
    src: string
    alt: string
  }
}

export const Image: FC<ImageNS.Props> = ({ lazy = true, src, alt, ...rest }) => {
  const { createClassName, sendLog } = useZoomComponent('image')

  const classes = createClassName(rest?.className, '', {
    loading: true,
  })

  const handleOnLoad = (evt: SyntheticEvent<HTMLImageElement>) => {
    rest.onLoad?.(evt)
    evt.currentTarget.classList.add('loaded')
  }

  const handleOnError = (evt: SyntheticEvent<HTMLImageElement>) => {
    sendLog(logs.imageNotLoaded, `Image source: ${src}`)
    evt.currentTarget.classList.add('not-loaded')
    rest.onError?.(evt)
  }

  const handleOnClick = (evt: MouseEvent<HTMLImageElement>) => {
    rest.onClick?.(evt)
  }

  return (
    <img
      className={classes}
      loading={lazy ? 'lazy' : 'eager'}
      alt={alt}
      onLoad={handleOnLoad}
      onError={handleOnError}
      onClick={handleOnClick}
      src={src}
    />
  )
}
