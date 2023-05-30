import React, { forwardRef } from 'react'

import { type Range } from '@zoom-studio/zoom-js-ts-utils'

import { useZoomComponent } from '../../../hooks'

import { type SkeletonNS } from '..'
import { useSkeleton } from '../use-skeleton'

export namespace TitleSkeletonNS {
  export interface Props extends SkeletonNS.BaseProps {
    tagLevel?: Range<1, 7>
    width?: string | number
  }
}

export const TitleSkeleton = forwardRef<HTMLDivElement, TitleSkeletonNS.Props>(
  ({ tagLevel = 4, width = '80%', className, containerProps, ...baseProps }, reference) => {
    const { animatedClasses } = useSkeleton(baseProps)
    const { createClassName } = useZoomComponent('skeleton')

    const classes = createClassName(className, 'title', {
      [createClassName('', `title-tag-level-${tagLevel}`)]: true,
    })

    return (
      <div {...baseProps} {...containerProps} className={classes} ref={reference}>
        <span className={animatedClasses} style={{ width }} />
      </div>
    )
  },
)
