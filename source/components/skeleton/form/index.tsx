import React, { type CSSProperties, forwardRef } from 'react'

import { useComponentSize, useZoomComponent } from '../../../hooks'

import { type SkeletonNS } from '..'
import { type ButtonNS } from '../..'
import { type CommonSize } from '../../../types'
import { useSkeleton } from '../use-skeleton'

export namespace FormSkeletonNS {
  export interface Size {
    width?: string | number
    height?: string | number
  }

  export interface Props extends SkeletonNS.BaseProps {
    size?: CommonSize
    customSize?: Size
    shape?: ButtonNS.Shapes
  }
}

export const FormSkeleton = forwardRef<HTMLDivElement, FormSkeletonNS.Props>(
  (
    {
      size: providedSize,
      shape = 'default',
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

    const classes = createClassName(className, 'form', {
      [createClassName('', `form-${size}`)]: true,
      [createClassName('', `form-shape-${shape}`)]: true,
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
        ref={reference}
        style={getSkeletonStyles()}
      >
        <span className={animatedClasses} />
      </div>
    )
  },
)
