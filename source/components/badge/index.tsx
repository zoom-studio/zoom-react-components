import React, { type CSSProperties, forwardRef, type ReactNode } from 'react'

import { Emoji, type EmojiNS, Icon, type IconNS, Text } from '..'
import { useZoomComponent, useZoomContext } from '../../hooks'
import { type BaseComponent, type Color, type CommonSize } from '../../types'
import { colorFnToColor } from '../../utils'

export namespace BadgeNS {
  export const Direction = ['row', 'row-reverse', 'column', 'column-reverse'] as const
  export type Direction = (typeof Direction)[number]

  export interface Props extends BaseComponent {
    direction?: Direction
    showZero?: boolean
    count?: number | undefined | null
    emoji?: EmojiNS.Emojis.Names
    icon?: IconNS.Names
    overflowCount?: number
    offset?: [number, number] | number
    background?: Color
    color?: Color
    dot?: boolean
    size?: CommonSize
    text?: string
    children?: ReactNode
    childrenContainerProps?: Omit<BaseComponent, 'children'>
  }
}

export const Badge = forwardRef<HTMLDivElement, BadgeNS.Props>(
  (
    {
      count: providedCount = 0,
      offset = -30,
      overflowCount = 999,
      direction = 'row',
      color = 'white',
      background = color => color({ source: 'error' }),
      size = 'normal',
      showZero,
      children,
      dot,
      emoji,
      icon,
      onClick,
      text,
      containerProps,
      childrenContainerProps,
      className,
      style,
      ...rest
    },
    reference,
  ) => {
    const { isRTL } = useZoomContext()
    const { createClassName } = useZoomComponent('badge')

    const childrenClasses = createClassName(childrenContainerProps?.className, 'content')
    const badgeCountClasses = createClassName('', 'info')

    const isTextMode = typeof text === 'string'
    const isCountProvided = typeof providedCount === 'number'

    const classes = createClassName(className, '', {
      [createClassName('', direction)]: true,
      [createClassName('', size)]: true,
      [createClassName('', 'dot-style')]: !!dot,
      [createClassName('', 'clickable')]: !!onClick,
      [createClassName('', 'text-mode')]: isTextMode,
    })

    const shouldInfoBeRendered: boolean =
      !!dot || !!emoji || !!icon || !!(isCountProvided && (providedCount > 0 || showZero))

    const renderInfo = (): ReactNode => {
      if (dot) {
        return (
          <span className="badge-dot" style={{ backgroundColor: colorFnToColor(background) }} />
        )
      }
      if (emoji) {
        return <Emoji name={emoji} className="badge-emoji" />
      }
      if (icon) {
        return (
          <Icon
            name={icon}
            className="badge-icon"
            style={{ backgroundColor: colorFnToColor(background) }}
          />
        )
      }
      if (isCountProvided) {
        let count = providedCount.toString()
        if (providedCount > overflowCount) {
          count = `+${overflowCount}`
        }
        return (
          <span className="badge-count" style={{ backgroundColor: colorFnToColor(background) }}>
            {count}
          </span>
        )
      }
      return <></>
    }

    const getBadgeStyles = (): CSSProperties => {
      const styles: CSSProperties = {
        color: colorFnToColor(color),
      }

      if (isTextMode) {
        return styles
      }

      offset = typeof offset === 'number' ? [offset, offset] : offset

      if (
        isRTL
          ? direction === 'row' || direction === 'column'
          : direction === 'row-reverse' || direction === 'column-reverse'
      ) {
        offset[0] = offset[0] * -1
      }

      if (direction === 'column' || direction === 'column-reverse') {
        offset[1] = offset[1] * -1
      }

      styles.transform = `translate(${offset[0]}%, ${offset[1]}%)`

      return styles
    }

    const containerStyles: CSSProperties = isTextMode
      ? { ...style }
      : {
          ...style,
          flexDirection: direction,
          alignItems: direction === 'column-reverse' ? 'flex-end' : 'flex-start',
          justifyContent: direction === 'column' ? 'flex-end' : 'flex-start',
        }

    return (
      <div
        {...containerProps}
        {...rest}
        ref={reference}
        className={classes}
        style={containerStyles}
      >
        {shouldInfoBeRendered && (
          <span className={badgeCountClasses} onClick={onClick} style={getBadgeStyles()}>
            {renderInfo()}
          </span>
        )}

        {text ? (
          <Text
            className={childrenClasses}
            small={size === 'small'}
            normal={size === 'normal'}
            large={size === 'large'}
          >
            {text}
          </Text>
        ) : (
          <div {...childrenContainerProps} className={childrenClasses}>
            {children}
          </div>
        )}
      </div>
    )
  },
)
