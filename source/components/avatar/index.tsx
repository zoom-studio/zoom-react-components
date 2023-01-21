import React, { FC, HTMLAttributes } from 'react'

import { Image } from '..'
import { useComponentSize, useZoomComponent } from '../../hooks'
import { CommonSize } from '../../types'

export namespace AvatarNS {
  export interface Props {
    avatars: string[]
    size?: CommonSize
    containerProps?: HTMLAttributes<HTMLDivElement>
    withImageViewer?: boolean
  }
}

export const Avatar: FC<AvatarNS.Props> = ({
  size: providedSize,
  avatars,
  containerProps,
  withImageViewer,
}) => {
  const size = useComponentSize(providedSize)
  const { createClassName } = useZoomComponent('avatar')

  const classes = createClassName(containerProps?.className, '', {
    [createClassName('', size)]: true,
    [createClassName('', 'grouped')]: avatars.length > 1,
  })

  return (
    <div className={classes}>
      {avatars.map((avatar, index) => (
        <Image
          src={avatar}
          key={index}
          shape="circle"
          withImageViewer={withImageViewer}
          imageViewerOpenerIconSize={20}
        />
      ))}
    </div>
  )
}
