import React, { CSSProperties, FC } from 'react'

import { useComponentSize, useZoomComponent } from '../../../hooks'

import { SkeletonNS } from '..'
import { useSkeleton } from '../use-skeleton'
import { CommonSize } from '../../../types'
import { SVGIcon } from '../..'

export namespace ImageSkeletonNS {
  export interface Size {
    width?: string | number
    height?: string | number
  }

  export interface Props extends SkeletonNS.BaseProps {
    size?: CommonSize
    customSize?: Size
  }
}

export const ImageSkeleton: FC<ImageSkeletonNS.Props> = ({
  size: providedSize,
  className,
  customSize,
  ...baseProps
}) => {
  const { animatedClasses } = useSkeleton(baseProps)
  const { createClassName } = useZoomComponent('skeleton')
  const size = useComponentSize(providedSize)

  const classes = createClassName(className, 'image', {
    [createClassName('', `image-${size}`)]: true,
  })

  const getSkeletonStyles = (): CSSProperties => {
    const styles: CSSProperties = { ...customSize }
    return styles
  }

  return (
    <div {...baseProps} className={classes} style={getSkeletonStyles()}>
      <span className={animatedClasses} />
      <SVGIcon
        color={color => color({ source: 'placeholder' })}
        name="image"
        className="image-icon"
        size="60%"
      />
    </div>
  )
}
