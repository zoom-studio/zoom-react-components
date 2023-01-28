import React, { FC } from 'react'

import { Text, TypographyNS } from '..'
import { useComponentSize, useZoomComponent } from '../../hooks'

import { BaseComponent, CommonSize } from '../../types'
import { Color } from '../../types/color'
import { color as generateColor, colorFnToColor } from '../../utils/color'

export namespace SpinNS {
  export interface Props extends BaseComponent<HTMLSpanElement> {
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
  containerProps,
  reference,
  ...rest
}) => {
  const size = useComponentSize(providedSize)
  const { createClassName } = useZoomComponent('spin')
  const classes = createClassName(className, '', {
    [createClassName('', size)]: true,
  })
  color = colorFnToColor(color)

  return (
    <span {...rest} {...containerProps} ref={reference} className={classes}>
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
