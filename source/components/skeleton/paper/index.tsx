import React, { CSSProperties, forwardRef } from 'react'

import { useZoomComponent } from '../../../hooks'

import { SkeletonNS } from '..'
import { Icon, IconNS } from '../../icon'
import { useSkeleton } from '../use-skeleton'

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

export const PaperSkeleton = forwardRef<HTMLDivElement, PaperSkeletonNS.Props>(
  (
    { iconSize = '80px', circular, className, size, icon, containerProps, style, ...baseProps },
    reference,
  ) => {
    const { animatedClasses } = useSkeleton(baseProps)
    const { createClassName } = useZoomComponent('skeleton')

    const classes = createClassName(className, 'paper', {
      [createClassName('', 'paper-circular')]: !!circular,
    })

    const getSkeletonStyles = (): CSSProperties => {
      const styles: CSSProperties = { ...style, ...size }
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

        {icon && <Icon name={icon} className="skeleton-icon" style={{ fontSize: iconSize }} />}
      </div>
    )
  },
)
