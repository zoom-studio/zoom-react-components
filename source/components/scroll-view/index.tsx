import React, { FC, HTMLAttributes, useEffect, useRef } from 'react'

import { InitializationTarget } from 'overlayscrollbars'
import { useOverlayScrollbars } from 'overlayscrollbars-react'

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
  className,
  onScroll,
  maxWidth,
  maxHeight,
  ...rest
}) => {
  const scrollViewRef = useRef<HTMLDivElement | null>(null)

  const [initialize] = useOverlayScrollbars({
    defer: true,
    events: {
      scroll: (_, evt) => onScroll?.(evt),
    },
    options: {
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
    },
  })

  const { createClassName } = useZoomComponent('scroll-view')
  const classes = createClassName(className)

  useEffect(() => {
    initialize(scrollViewRef.current as InitializationTarget)
  }, [initialize])

  return (
    <div
      {...rest}
      ref={scrollViewRef}
      className={classes}
      style={{ ...rest.style, maxWidth, maxHeight }}
    />
  )
}
