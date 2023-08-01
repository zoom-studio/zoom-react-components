import React, { forwardRef, type ReactNode } from 'react'

import {
  ScrollView,
  Title,
  type EmojiNS,
  type IconNS,
  type ScrollViewNS,
  type TypographyNS,
} from '..'
import { useZoomComponent } from '../../hooks'
import type { BaseComponent, DataEntriesState } from '../../types'

import { TimelineItem } from './timeline-item'

export namespace TimelineNS {
  export const Direction = ['column', 'row'] as const
  export type Direction = (typeof Direction)[number]

  export interface EmojiSign {
    emoji: EmojiNS.Emojis.Names
  }

  export interface IconSign {
    icon: IconNS.Names
  }

  export interface Item {
    sign?: EmojiSign | IconSign | 'auto' | 'number'
    loading?: boolean
    children?: ReactNode
    datetime?: ReactNode
    state?: DataEntriesState
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    items: Item[]
    continues?: boolean
    stateMessageProps?: TypographyNS.TextNS.Props
    reverse?: boolean
    title?: ReactNode
    direction?: Direction
    inProgressIndex?: number
    maxHeight?: string | number
    scrollViewProps?: Omit<ScrollViewNS.Props, 'maxHeight'>
    stickyTitle?: boolean
  }
}

export const Timeline = forwardRef<HTMLDivElement, TimelineNS.Props>(
  (
    {
      items = [],
      direction = 'column',
      maxHeight = 'unset',
      inProgressIndex,
      stickyTitle,
      className,
      containerProps,
      continues,
      stateMessageProps,
      reverse,
      title,
      scrollViewProps,
      ...rest
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('timeline')

    const classes = createClassName(className, '', {
      [createClassName('', 'reverse')]: !!reverse,
      [createClassName('', direction)]: true,
      [createClassName('', 'sticky-title')]:
        stickyTitle ?? (direction === 'column' && maxHeight === 'unset'),
    })

    return (
      <div {...containerProps} {...rest} ref={reference} className={classes}>
        {title && (
          <div className="header">
            {typeof title === 'string' ? (
              <Title h4 className="header-title">
                {title}
              </Title>
            ) : (
              title
            )}
          </div>
        )}

        <ScrollView maxHeight={maxHeight} {...scrollViewProps}>
          {items.map((item, index) => (
            <TimelineItem
              key={index}
              continues={continues}
              inProgressIndex={inProgressIndex}
              index={index}
              item={item}
              stateMessageProps={stateMessageProps}
            />
          ))}

          {continues && (
            <TimelineItem
              continues={continues}
              index={-1}
              item={{ sign: { icon: 'perm_phone_msg' } }}
            />
          )}
        </ScrollView>
      </div>
    )
  },
)
