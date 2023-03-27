import React, { forwardRef, SVGAttributes } from 'react'

import { ProgressNS } from '.'
import { useZoomComponent } from '../../hooks'
import { ProgressInfo } from './info'
import { generateProgressColor, normalizePercentage } from './utils'

export const CircularProgress = forwardRef<HTMLDivElement, ProgressNS.Props>(
  (
    {
      circularSize: size = 100,
      circularStroke: stroke = 12,
      info = 'percentage',
      circularIconFontSize = '30pt',
      circularPercentageFontSize = '16pt',
      transition: trans,
      steps,
      containerProps,
      failed,
      dynamicColors,
      dynamicInfo,
      showInfo,
      className,
      style,
      ...rest
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('progress')
    const classes = createClassName(className, 'circular')
    const backgroundClasses = createClassName('', 'background')
    const progressClasses = createClassName('', 'bar')
    const defaultPercentage = 78

    const transition = trans as string
    const step = 'length' in steps ? steps[0] : steps
    const percentage = normalizePercentage(step.percentage, defaultPercentage)
    const circleSize = size / 2
    const radius = (size - stroke) / 2
    const dashArray = radius * Math.PI * 2
    const dashOffset = dashArray - (dashArray * percentage) / 100

    const circlesProps: SVGAttributes<SVGCircleElement> = {
      cx: circleSize,
      cy: circleSize,
      r: radius,
      fill: 'none',
    }

    return (
      <div
        {...rest}
        {...containerProps}
        className={classes}
        ref={reference}
        style={{ ...style, width: size, height: size }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle {...circlesProps} strokeWidth={`${stroke}px`} className={backgroundClasses} />
          <circle
            {...circlesProps}
            strokeWidth={`${stroke - 4}px`}
            className={progressClasses}
            transform={`rotate(-90 ${circleSize} ${circleSize})`}
            stroke={generateProgressColor(step, defaultPercentage, !!failed, !!dynamicColors)}
            style={{
              transition,
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
            }}
          />
        </svg>

        {showInfo && (
          <ProgressInfo
            percentage={percentage}
            iconsFontsize={circularIconFontSize}
            percentageFontSize={circularPercentageFontSize}
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
