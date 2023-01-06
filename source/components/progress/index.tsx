import React, { FC } from 'react'

import { Popover, PopoverNS } from '..'
import { useZoomComponent } from '../../hooks'
import { BaseComponent, Color as ColorType, MaybeArray } from '../../types'
import { CircularProgress } from './circular'
import { generateProgressColor } from './utils'

export namespace ProgressNS {
  export const Types = ['horizontal', 'vertical', 'circular'] as const
  export type Types = typeof Types[number]
  export type Color = [ColorType, { [percentage: number]: ColorType }?]

  export interface Step {
    percentage?: number
    color?: Color | string
    withWave?: boolean
    title?: string
    popoverProps?: PopoverNS.Props
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    type?: Types
    steps: MaybeArray<Step>
    info?: 'percentage' | 'status'
    horizontalHeight?: string | number
    circularSize?: number
    circularStroke?: number
  }
}

export const Progress: FC<ProgressNS.Props> = props => {
  if (props.type === 'circular') {
    return <CircularProgress {...props} />
  }

  const { type = 'horizontal', horizontalHeight = '200px', containerProps } = props
  let steps = props.steps

  if (!('length' in steps)) {
    steps = [steps]
  }

  const isVertical = type === 'vertical'
  const defaultPercentage = 100 / steps.length
  const { createClassName } = useZoomComponent('progress')

  const waveClasses = createClassName('', 'wave')
  const classes = createClassName(containerProps?.className, '', {
    [type]: true,
  })
  const stepClasses = createClassName('', 'step', {
    [steps.length === 1 ? 'single-step' : 'multi-step']: true,
  })

  return (
    <div className={classes} style={isVertical ? { height: horizontalHeight } : undefined}>
      {steps.map(({ withWave = true, ...step }, index) => (
        <div
          key={index}
          className={stepClasses}
          style={{
            background: generateProgressColor(step, defaultPercentage),
            [isVertical ? 'height' : 'width']: `${step.percentage ?? defaultPercentage}%`,
          }}
        >
          <Popover
            description={step.title}
            trigger="hover"
            placement={isVertical ? 'right' : 'top'}
            {...step.popoverProps}
          />
          {withWave && <span className={waveClasses} />}
        </div>
      ))}
    </div>
  )
}
