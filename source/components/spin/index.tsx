import React, { FC, HTMLAttributes } from 'react'

import { useComponentSize, useZoomComponent } from '../../hooks'
import { Text, TypographyNS } from '..'

import { Color } from '../../types/color'
import { colorFnToColor, color as generateColor } from '../../utils/color'
import { CommonSize } from '../../types'

export namespace SpinNS {
  export interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
    size?: CommonSize
    speed?: string
    tip?: string
    tipProps?: TypographyNS.TextNS.Props
    color?: Color
  }
}

export const Spin: FC<SpinNS.Props> = ({
  size: providedSize,
  speed = '0.5s',
  tip,
  tipProps,
  color = generateColor({ source: 'text', tone: 2 }),
  className,
  children,
  ...rest
}) => {
  const size = useComponentSize(providedSize)
  const { createClassName } = useZoomComponent('spin')
  const classes = createClassName(className, '', {
    [createClassName('', size)]: true,
  })
  color = colorFnToColor(color)

  return (
    <span {...rest} className={classes}>
      <span className="spinner" style={{ animationDuration: speed, borderColor: color }} />
      {children ??
        (tip && (
          <Text
            {...tipProps}
            small={size === 'small'}
            normal={size === 'normal'}
            large={size === 'large'}
          >
            {tip}
          </Text>
        ))}
    </span>
  )
}
