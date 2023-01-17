import React, { CSSProperties, FC } from 'react'

import { useZoomComponent } from '../../../hooks'

import { SkeletonNS } from '..'
import { useSkeleton } from '../use-skeleton'
import { Icon, IconNS } from '../../icon'

export namespace PaperSkeletonNS {
  export interface Size {
    width: string | number
    height: string | number
  }

  export interface Props extends SkeletonNS.BaseProps {
    size: Size
    icon?: IconNS.Names
    iconSize?: string
    circular?: boolean
  }
}

export const PaperSkeleton: FC<PaperSkeletonNS.Props> = ({
  iconSize = '80px',
  circular,
  className,
  size,
  icon,
  ...baseProps
}) => {
  const { animatedClasses } = useSkeleton(baseProps)
  const { createClassName } = useZoomComponent('skeleton')

  const classes = createClassName(className, 'paper', {
    [createClassName('', 'paper-circular')]: !!circular,
  })

  const getSkeletonStyles = (): CSSProperties => {
    const styles: CSSProperties = { ...size }
    return styles
  }

  return (
    <div {...baseProps} className={classes} style={getSkeletonStyles()}>
      <span className={animatedClasses} />

      {icon && <Icon name={icon} className="skeleton-icon" style={{ fontSize: iconSize }} />}
    </div>
  )
}
