import React, { type CSSProperties, forwardRef } from 'react'

import { type MaybeArray } from '@zoom-studio/zoom-js-ts-utils'

import { Popover, type PopoverNS } from '..'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent, type Color as ColorType } from '../../types'
import { CircularProgress } from './circular'
import { ProgressInfo } from './info'
import { generateProgressColor, normalizePercentage } from './utils'

export namespace ProgressNS {
  export const Types = ['horizontal', 'vertical', 'circular'] as const
  export type Types = (typeof Types)[number]
  export type Color = [ColorType, Record<number | string, ColorType>?]
  export type Size = string | number

  export interface Step {
    percentage?: number
    color?: Color | string
    withWave?: boolean
    title?: string
    popoverProps?: PopoverNS.Props
  }

  export interface CircularProps {
    circularSize?: number
    circularStroke?: number
    circularPercentageFontSize?: Size
    circularIconFontSize?: Size
  }

  export interface VerticalProps {
    verticalHeight?: Size
    verticalWidth?: Size
  }

  export interface HorizontalProps {
    horizontalWidth?: Size
    horizontalHeight?: Size
  }

  export interface Props
    extends Omit<BaseComponent, 'children'>,
      CircularProps,
      VerticalProps,
      HorizontalProps {
    type?: Types
    steps: MaybeArray<Step>
    info?:
      | 'percentage'
      | 'status'
      | {
          name: 'seconds-left'
          duration: number
        }
    failed?: boolean
    dynamicColors?: boolean
    dynamicInfo?: boolean
    showInfo?: boolean
    transition?: string
  }
}

export const Progress = forwardRef<HTMLDivElement, ProgressNS.Props>(
  ({ transition = 'all 500ms cubic-bezier(0.68, 0.16, 0.2, 0.91)', ...props }, reference) => {
    if (props.type === 'circular') {
      return <CircularProgress {...props} ref={reference} transition={transition} />
    }

    const {
      type = 'horizontal',
      verticalHeight = '200px',
      verticalWidth = '16px',
      horizontalHeight = '16px',
      horizontalWidth = '100%',
      info = 'percentage',
      showInfo,
      containerProps,
      className,
      failed,
      dynamicColors,
      dynamicInfo,
      style,
    } = props
    let steps = props.steps

    if (!('length' in steps)) {
      steps = [steps]
    }

    const isVertical = type === 'vertical'
    const defaultPercentage = 0
    const { createClassName } = useZoomComponent('progress')

    const waveClasses = createClassName('', 'wave')
    const classes = createClassName(className, '', { [type]: true })
    const stepClasses = createClassName('', 'step', {
      [steps.length === 1 ? 'single-step' : 'multi-step']: true,
    })

    const getTotalPercentage = (steps: ProgressNS.Step[]): number => {
      let totalPercents = 0
      steps.forEach(step => (totalPercents += step.percentage ?? defaultPercentage))
      return normalizePercentage(totalPercents, defaultPercentage)
    }

    const getSizes = (): CSSProperties => ({
      width: type === 'horizontal' ? horizontalWidth : verticalWidth,
      height: type === 'horizontal' ? horizontalHeight : verticalHeight,
    })

    return (
      <div
        {...containerProps}
        {...props}
        className={classes}
        ref={reference}
        style={isVertical ? { ...style, height: verticalHeight } : { ...style }}
      >
        <div className="progresses" style={getSizes()}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={stepClasses}
              style={{
                transition,
                background: generateProgressColor(
                  step,
                  defaultPercentage,
                  !!failed,
                  !!dynamicColors,
                ),
                [isVertical ? 'height' : 'width']: `${normalizePercentage(
                  step.percentage,
                  defaultPercentage,
                )}%`,
              }}
            >
              <Popover
                description={step.title}
                trigger="hover"
                placement={isVertical ? 'right' : 'top'}
                {...step.popoverProps}
              />
              {step.withWave && <span className={waveClasses} />}
            </div>
          ))}
        </div>

        {showInfo && (
          <ProgressInfo
            percentage={getTotalPercentage(steps)}
            iconsFontsize={16}
            percentageFontSize={10}
            failed={failed}
            info={info}
            dynamicColors={dynamicColors}
            dynamicInfo={dynamicInfo}
          />
        )}
      </div>
    )
  },
)
