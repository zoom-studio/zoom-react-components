import React, { FC } from 'react'

import { Image, ImageNS } from '..'
import { useComponentSize, useZoomComponent } from '../../hooks'
import { BaseComponent, CommonSize } from '../../types'

export namespace AvatarNS {
  export interface Props extends BaseComponent {
    avatars: string[]
    size?: CommonSize
    withImageViewer?: boolean
    imageProps?: Omit<ImageNS.Props, 'src'>
  }
}

export const Avatar: FC<AvatarNS.Props> = ({
  size: providedSize,
  avatars,
  containerProps,
  withImageViewer,
  imageProps,
  className,
  reference,
  ...rest
}) => {
  const size = useComponentSize(providedSize)
  const { createClassName } = useZoomComponent('avatar')

  const classes = createClassName(className, '', {
    [createClassName('', size)]: true,
    [createClassName('', 'grouped')]: avatars.length > 1,
  })

  return (
    <div {...containerProps} {...rest} ref={reference} className={classes}>
      {avatars.map((avatar, index) => (
        <Image
          src={avatar}
          key={index}
          shape="circle"
          withImageViewer={withImageViewer}
          imageViewerOpenerIconSize={20}
          {...imageProps}
        />
      ))}
    </div>
  )
}
