import React, { FC } from 'react'

import { useZoomComponent } from '../../../hooks'

import { SkeletonNS } from '..'
import { useSkeleton } from '../use-skeleton'

export namespace ParagraphSkeletonNS {
  export interface Props extends SkeletonNS.BaseProps {
    lines?: number
  }
}

export const ParagraphSkeleton: FC<ParagraphSkeletonNS.Props> = ({
  lines = 4,
  className,
  containerProps,
  reference,
  ...baseProps
}) => {
  const { animatedClasses } = useSkeleton(baseProps)
  const { createClassName } = useZoomComponent('skeleton')

  const classes = createClassName(className, 'paragraph')

  const getLineLength = (): string => {
    return `${(10 - Math.floor(Math.random() * 3 + 1)) * 10}%`
  }

  return (
    <div {...baseProps} {...containerProps} className={classes} ref={reference}>
      {Array.from(Array(lines)).map((_, index) => (
        <span key={index} className={animatedClasses} style={{ width: getLineLength() }} />
      ))}
    </div>
  )
}
