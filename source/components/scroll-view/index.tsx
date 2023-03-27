import React, { forwardRef } from 'react'

import {
  OverlayScrollbarsComponent,
  OverlayScrollbarsComponentRef,
  UseOverlayScrollbarsParams,
} from 'overlayscrollbars-react'

import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace ScrollViewNS {
  export type ContainerNode = OverlayScrollbarsComponentRef

  export interface Props extends Omit<BaseComponent, 'reference'> {
    onScroll?: (evt: Event) => void
    autoHide?: boolean
    maxWidth?: string | number
    maxHeight: string | number
    minHeight?: string | number
    minWidth?: string | number
    scrollbarSettings?: UseOverlayScrollbarsParams
  }
}

export const ScrollView = forwardRef<ScrollViewNS.ContainerNode, ScrollViewNS.Props>(
  (
    {
      scrollbarSettings,
      autoHide,
      className,
      onScroll,
      maxWidth,
      maxHeight,
      minHeight,
      minWidth,
      containerProps,
      style,
      ...rest
    },
    reference,
  ) => {
    const scrollbarOptions =
      typeof scrollbarSettings?.options === 'object' ? scrollbarSettings?.options : {}

    const { createClassName } = useZoomComponent('scroll-view')
    const classes = createClassName(className)

    return (
      <OverlayScrollbarsComponent
        {...containerProps}
        {...scrollbarSettings}
        {...rest}
        className={classes}
        ref={reference}
        style={{ ...style, maxHeight, maxWidth, minHeight, minWidth }}
        defer={scrollbarSettings?.defer ?? true}
        events={{ scroll: (_, evt) => onScroll?.(evt), ...scrollbarSettings?.events }}
        options={{
          scrollbars: {
            autoHide: autoHide ? 'leave' : 'never',
            autoHideDelay: 100,
            clickScroll: true,
            dragScroll: true,
            pointers: ['mouse', 'touch', 'pen'],
            ...scrollbarOptions?.scrollbars,
          },
          overflow: {
            x: 'scroll',
            y: 'scroll',
            ...scrollbarOptions?.overflow,
          },
          paddingAbsolute: scrollbarOptions?.paddingAbsolute ?? false,
          showNativeOverlaidScrollbars: scrollbarOptions?.showNativeOverlaidScrollbars ?? false,
        }}
      />
    )
  },
)
