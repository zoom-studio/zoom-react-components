import React, { type CSSProperties, forwardRef } from 'react'

import { useComponentSize, useZoomComponent } from '../../../hooks'

import { type SkeletonNS } from '..'
import { Icon, type IconNS, SVGIcon } from '../..'
import { type CommonSize } from '../../../types'
import { useSkeleton } from '../use-skeleton'

export namespace ImageSkeletonNS {
  export interface Size {
    width?: string | number
    height?: string | number
  }

  export interface Props extends SkeletonNS.BaseProps {
    size?: CommonSize
    customSize?: Size
    icon?: IconNS.Names
    iconSize?: string
  }
}

export const ImageSkeleton = forwardRef<HTMLDivElement, ImageSkeletonNS.Props>(
  (
    {
      size: providedSize,
      iconSize = '80px',
      icon,
      className,
      customSize,
      containerProps,
      style,
      ...baseProps
    },
    reference,
  ) => {
    const { animatedClasses } = useSkeleton(baseProps)
    const { createClassName } = useZoomComponent('skeleton')
    const size = useComponentSize(providedSize)

    const classes = createClassName(className, 'image', {
      [createClassName('', `image-${size}`)]: true,
      'auto-height': !customSize?.height,
    })

    const getSkeletonStyles = (): CSSProperties => {
      const styles: CSSProperties = { ...style, ...customSize }
      return styles
    }

    return (
      <div
        {...baseProps}
        {...containerProps}
        className={classes}
        style={getSkeletonStyles()}
        ref={reference}
      >
        <span className={animatedClasses} />

        {icon ? (
          <Icon name={icon} className="skeleton-icon" style={{ fontSize: iconSize }} />
        ) : (
          <SVGIcon
            color={color => color({ source: 'placeholder' })}
            name="image"
            className="image-icon"
            size="60%"
          />
        )}
      </div>
    )
  },
)
