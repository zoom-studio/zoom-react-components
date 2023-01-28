import React, { FC } from 'react'

import { useZoomComponent } from '../../../hooks'

import { SkeletonNS } from '..'
import { useSkeleton } from '../use-skeleton'
import { Range } from '../../../types'

export namespace TitleSkeletonNS {
  export interface Props extends SkeletonNS.BaseProps {
    tagLevel?: Range<1, 7>
    width?: string | number
  }
}

export const TitleSkeleton: FC<TitleSkeletonNS.Props> = ({
  tagLevel = 4,
  width = '80%',
  className,
  containerProps,
  reference,
  ...baseProps
}) => {
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
}
