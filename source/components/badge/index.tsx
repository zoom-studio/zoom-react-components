import React, { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'
import { useZoomComponent, useZoomContext } from '../../hooks'
import { Color, CommonSize } from '../../types'
import { colorFnToColor } from '../../utils'
import { Emoji, EmojiNS } from '../emoji'
import { Icon, IconNS } from '../icon'
import { Text } from '../typography'

export namespace BadgeNS {
  export const Direction = ['row', 'row-reverse', 'column', 'column-reverse'] as const
  export type Direction = typeof Direction[number]

  export interface Props {
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
    onClick?: () => void
    size?: CommonSize
    text?: string
    children?: ReactNode
    containerProps?: HTMLAttributes<HTMLSpanElement>
  }
}

export const Badge: FC<BadgeNS.Props> = ({
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
}) => {
  const { isRTL } = useZoomContext()
  const { createClassName } = useZoomComponent('badge')

  const childrenClasses = createClassName('', 'content')
  const badgeCountClasses = createClassName('', 'info')

  const isTextMode = typeof text === 'string'
  const isCountProvided = typeof providedCount === 'number'

  const classes = createClassName(containerProps?.className, '', {
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
      return <span className="badge-dot" style={{ backgroundColor: colorFnToColor(background) }} />
    }
    if (emoji) {
      return <Emoji name={emoji} className="badge-emoji" />
    }
    if (icon) {
      return <Icon name={icon} className="badge-icon" />
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

  const getContainerStyles: CSSProperties = isTextMode
    ? {}
    : {
        flexDirection: direction,
        alignItems: direction === 'column-reverse' ? 'flex-end' : 'flex-start',
        justifyContent: direction === 'column' ? 'flex-end' : 'flex-start',
      }

  return (
    <div className={classes} style={getContainerStyles}>
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
        <div className={childrenClasses}>{children}</div>
      )}
    </div>
  )
}
