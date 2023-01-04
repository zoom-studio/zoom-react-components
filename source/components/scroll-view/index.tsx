import React, { FC, HTMLAttributes } from 'react'

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useZoomComponent } from '../../hooks'

export namespace ScrollViewNS {
  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'> {
    onScroll?: (evt: Event) => void
    autoHide?: boolean
    maxWidth?: string | number
    maxHeight?: string | number
  }
}

export const ScrollView: FC<ScrollViewNS.Props> = ({
  autoHide,
  children,
  className,
  onScroll,
  maxWidth,
  maxHeight,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('scroll-view')
  const classes = createClassName(className)

  return (
    <OverlayScrollbarsComponent
      defer
      element="div"
      children={children}
      className={classes}
      events={{ scroll: (_, evt) => onScroll?.(evt) }}
      style={{ maxWidth, maxHeight }}
      options={{
        scrollbars: {
          autoHide: autoHide ? 'leave' : 'never',
          autoHideDelay: 100,
          clickScroll: true,
          dragScroll: true,
          pointers: ['mouse', 'touch', 'pen'],
        },
        overflow: {
          x: 'scroll',
          y: 'scroll',
        },
        paddingAbsolute: false,
        showNativeOverlaidScrollbars: false,
      }}
      {...rest}
    />
  )
}
