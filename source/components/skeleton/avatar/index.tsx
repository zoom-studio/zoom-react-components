import React, { CSSProperties, forwardRef } from 'react'

import { useComponentSize, useZoomComponent } from '../../../hooks'

import { SkeletonNS } from '..'
import { CommonSize } from '../../../types'
import { useSkeleton } from '../use-skeleton'

export namespace AvatarSkeletonNS {
  export interface Props extends SkeletonNS.BaseProps {
    type?: 'group' | 'single'
    groupLength?: number
    size?: CommonSize
    customSize?: number
  }
}

export const AvatarSkeleton = forwardRef<HTMLDivElement, AvatarSkeletonNS.Props>(
  (
    {
      size: providedSize,
      type = 'single',
      groupLength = 3,
      className,
      customSize,
      containerProps,
      ...baseProps
    },
    reference,
  ) => {
    const { animatedClasses } = useSkeleton(baseProps)
    const { createClassName } = useZoomComponent('skeleton')
    const size = useComponentSize(providedSize)

    const classes = createClassName(className, 'avatar', {
      [createClassName('', 'avatar-grouped')]: type === 'group',
      [createClassName('', `avatar-${size}`)]: true,
    })

    const getSkeletonStyles = (): CSSProperties => {
      const styles: CSSProperties = {}

      if (customSize) {
        styles.width = customSize
        styles.height = customSize
      }

      return styles
    }

    return (
      <div {...baseProps} {...containerProps} className={classes} ref={reference}>
        {Array.from(Array(type === 'group' ? groupLength : 1)).map((_, index) => (
          <span key={index} className={animatedClasses} style={getSkeletonStyles()}>
            <span className="avatar-icon" />
          </span>
        ))}
      </div>
    )
  },
)
