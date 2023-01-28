import React, { FC, useEffect, useRef } from 'react'

import { InitializationTarget } from 'overlayscrollbars'
import { useOverlayScrollbars } from 'overlayscrollbars-react'

import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace ScrollViewNS {
  export interface Props extends BaseComponent {
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
  containerProps,
  reference,
  style,
  ...rest
}) => {
  const scrollViewRef = reference ?? useRef<HTMLDivElement | null>(null)

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
      {...containerProps}
      ref={scrollViewRef}
      className={classes}
      style={{ ...style, maxWidth, maxHeight }}
    />
  )
}
