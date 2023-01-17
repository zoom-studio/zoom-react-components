import React, { CSSProperties, FC } from 'react'

import { useComponentSize, useZoomComponent } from '../../../hooks'

import { SkeletonNS } from '..'
import { ButtonNS } from '../..'
import { useSkeleton } from '../use-skeleton'
import { CommonSize } from '../../../types'

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

export const FormSkeleton: FC<FormSkeletonNS.Props> = ({
  size: providedSize,
  shape = 'default',
  className,
  customSize,
  ...baseProps
}) => {
  const { animatedClasses } = useSkeleton(baseProps)
  const { createClassName } = useZoomComponent('skeleton')
  const size = useComponentSize(providedSize)

  const classes = createClassName(className, 'form', {
    [createClassName('', `form-${size}`)]: true,
    [createClassName('', `form-shape-${shape}`)]: true,
  })

  const getSkeletonStyles = (): CSSProperties => {
    const styles: CSSProperties = { ...customSize }
    return styles
  }

  return (
    <div {...baseProps} className={classes} style={getSkeletonStyles()}>
      <span className={animatedClasses} />
    </div>
  )
}
